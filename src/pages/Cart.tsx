import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/data/products';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryCharge = totalPrice >= 999 ? 0 : 99;
  const finalTotal = totalPrice + deliveryCharge;

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to proceed with checkout');
      navigate('/auth');
      return;
    }

    setIsProcessing(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setIsProcessing(false);
        return;
      }

      // Create Razorpay order
      const { data: orderResponse, error: orderError } = await supabase.functions.invoke('razorpay', {
        body: {
          action: 'create-order',
          amount: finalTotal,
          currency: 'INR',
        },
      });

      if (orderError || !orderResponse?.orderId) {
        console.error('Order creation error:', orderError);
        toast.error('Failed to create order. Please try again.');
        setIsProcessing(false);
        return;
      }

      // Configure Razorpay options
      const options = {
        key: orderResponse.keyId,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'AR Computers',
        description: `Order of ${items.length} item(s)`,
        order_id: orderResponse.orderId,
        handler: async (response: any) => {
          // Verify payment
          try {
            const { data: verifyResponse, error: verifyError } = await supabase.functions.invoke('razorpay', {
              body: {
                action: 'verify-payment',
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                orderData: {
                  totalAmount: finalTotal,
                  items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    quantity: item.quantity,
                    price: item.price,
                  })),
                },
              },
            });

            if (verifyError || !verifyResponse?.verified) {
              toast.error('Payment verification failed. Please contact support.');
              return;
            }

            toast.success('Payment successful! Your order has been placed.');
            clearCart();
            navigate('/account');
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          email: user.email || '',
        },
        theme: {
          color: '#F97316',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.info('Payment cancelled');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (response: any) => {
        console.error('Payment failed:', response.error);
        toast.error(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      razorpay.open();
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - AR Computers</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-16 text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products">
              <Button size="lg">
                Start Shopping
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Shopping Cart (${items.length} items) - AR Computers`}</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-xl p-4 shadow-card flex gap-4"
                >
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{item.brand}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-lg">{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          removeFromCart(item.id);
                          toast.success('Item removed from cart');
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={clearCart} className="w-full">
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-card sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Charges</span>
                    <span className={`font-medium ${deliveryCharge === 0 ? 'text-green-600' : ''}`}>
                      {deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}
                    </span>
                  </div>
                  {deliveryCharge > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add items worth {formatPrice(999 - totalPrice)} more for free delivery
                    </p>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full mt-6"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/200px-Razorpay_logo.svg.png"
                    alt="Razorpay"
                    className="h-5"
                  />
                  <span className="text-xs text-muted-foreground">Secure Payments</span>
                </div>

                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-sm font-medium mb-2">💳 Available Payment Options</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• UPI (GPay, PhonePe, Paytm)</li>
                    <li>• Credit/Debit Cards</li>
                    <li>• Net Banking</li>
                    <li>• Wallets</li>
                    <li>• EMI Options Available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
