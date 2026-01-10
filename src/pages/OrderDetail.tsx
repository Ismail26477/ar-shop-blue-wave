import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderTracking from '@/components/OrderTracking';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatPrice } from '@/data/products';

interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
}

interface Address {
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  payment_id: string | null;
  created_at: string;
  address_id: string | null;
  order_items: OrderItem[];
  addresses: Address | null;
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (id) {
      fetchOrder();
    }
  }, [user, id, navigate]);

  const fetchOrder = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*),
        addresses (*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching order:', error);
      navigate('/account');
      return;
    }

    if (!data) {
      navigate('/account');
      return;
    }

    setOrder(data as Order);
    setLoading(false);
  };

  if (!user) return null;

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Order Details - AR Computers</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/4"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Helmet>
          <title>Order Not Found - AR Computers</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-16 text-center">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
            <p className="text-muted-foreground mb-6">This order doesn't exist or you don't have access to it.</p>
            <Button onClick={() => navigate('/account')}>Go to My Account</Button>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Order #${order.id.slice(0, 8).toUpperCase()} - AR Computers`}</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => navigate('/account')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
              <p className="text-sm text-muted-foreground">
                Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Tracking */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h2 className="text-lg font-bold mb-6">Order Tracking</h2>
                <OrderTracking status={order.status} createdAt={order.created_at} />
              </div>

              {/* Order Items */}
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h2 className="text-lg font-bold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <Link to={`/product/${item.product_id}`} className="shrink-0">
                        <img
                          src={item.product_image || '/placeholder.svg'}
                          alt={item.product_name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item.product_id}`}>
                          <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">
                            {item.product_name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</p>
                        <p className="font-medium mt-1">{formatPrice(item.price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              {/* Delivery Address */}
              {order.addresses && (
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{order.addresses.full_name}</p>
                    <p className="text-muted-foreground">
                      {order.addresses.address_line1}
                      {order.addresses.address_line2 && `, ${order.addresses.address_line2}`}
                    </p>
                    <p className="text-muted-foreground">
                      {order.addresses.city}, {order.addresses.state} - {order.addresses.pincode}
                    </p>
                    <p className="text-muted-foreground">Phone: {order.addresses.phone}</p>
                  </div>
                </div>
              )}

              {/* Payment Info */}
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h2 className="text-lg font-bold mb-4">Payment Details</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Status</span>
                    <span className={`font-medium ${
                      order.payment_status === 'paid' ? 'text-green-600' : 'text-amber-600'
                    }`}>
                      {order.payment_status === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                  {order.payment_id && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment ID</span>
                      <span className="font-mono text-xs">{order.payment_id}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between text-base font-bold">
                    <span>Total Amount</span>
                    <span>{formatPrice(order.total_amount)}</span>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-secondary rounded-xl p-6">
                <h3 className="font-medium mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Contact our support team for any issues with your order.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default OrderDetail;
