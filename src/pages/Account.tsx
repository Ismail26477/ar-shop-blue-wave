import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { User, MapPin, Package, Plus, Trash2, Edit2, LogOut } from 'lucide-react';
import { z } from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatPrice } from '@/data/products';

const addressSchema = z.object({
  full_name: z.string().trim().min(2, "Name is required").max(100),
  phone: z.string().trim().min(10, "Valid phone number required").max(15),
  address_line1: z.string().trim().min(5, "Address is required").max(200),
  address_line2: z.string().max(200).optional(),
  city: z.string().trim().min(2, "City is required").max(100),
  state: z.string().trim().min(2, "State is required").max(100),
  pincode: z.string().trim().min(6, "Valid pincode required").max(10),
});

interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  order_items: {
    product_name: string;
    quantity: number;
    price: number;
  }[];
}

const Account = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [addressForm, setAddressForm] = useState({
    full_name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchAddresses();
    fetchOrders();
  }, [user, navigate]);

  const fetchAddresses = async () => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .order('is_default', { ascending: false });
    
    if (!error && data) {
      setAddresses(data);
    }
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          product_name,
          quantity,
          price
        )
      `)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setOrders(data as Order[]);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = addressSchema.safeParse(addressForm);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      if (editingAddress) {
        const { error } = await supabase
          .from('addresses')
          .update(addressForm)
          .eq('id', editingAddress.id);

        if (error) throw error;
        toast.success('Address updated successfully');
      } else {
        const { error } = await supabase
          .from('addresses')
          .insert({
            ...addressForm,
            user_id: user!.id,
            is_default: addresses.length === 0
          });

        if (error) throw error;
        toast.success('Address added successfully');
      }

      setShowAddressForm(false);
      setEditingAddress(null);
      setAddressForm({
        full_name: '',
        phone: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        pincode: '',
      });
      fetchAddresses();
    } catch (error) {
      toast.error('Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id);

    if (!error) {
      toast.success('Address deleted');
      fetchAddresses();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast.success('Signed out successfully');
  };

  if (!user) return null;

  return (
    <>
      <Helmet>
        <title>My Account - AR Computers</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">{user.email}</p>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'profile' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'addresses' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <MapPin className="h-5 w-5" />
                    Addresses
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'orders' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <Package className="h-5 w-5" />
                    Orders
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <Input value={user.email || ''} disabled className="mt-1" />
                    </div>
                    <div>
                      <Label>Member Since</Label>
                      <Input
                        value={new Date(user.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        disabled
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Saved Addresses</h2>
                    {!showAddressForm && (
                      <Button onClick={() => setShowAddressForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Address
                      </Button>
                    )}
                  </div>

                  {showAddressForm && (
                    <div className="bg-card rounded-xl p-6 shadow-card">
                      <h3 className="font-semibold mb-4">
                        {editingAddress ? 'Edit Address' : 'Add New Address'}
                      </h3>
                      <form onSubmit={handleAddressSubmit} className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input
                            value={addressForm.full_name}
                            onChange={(e) => setAddressForm({ ...addressForm, full_name: e.target.value })}
                            className="mt-1"
                          />
                          {errors.full_name && <p className="text-destructive text-sm mt-1">{errors.full_name}</p>}
                        </div>
                        <div>
                          <Label>Phone Number</Label>
                          <Input
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                            className="mt-1"
                          />
                          {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                        </div>
                        <div className="md:col-span-2">
                          <Label>Address Line 1</Label>
                          <Input
                            value={addressForm.address_line1}
                            onChange={(e) => setAddressForm({ ...addressForm, address_line1: e.target.value })}
                            className="mt-1"
                          />
                          {errors.address_line1 && <p className="text-destructive text-sm mt-1">{errors.address_line1}</p>}
                        </div>
                        <div className="md:col-span-2">
                          <Label>Address Line 2 (Optional)</Label>
                          <Input
                            value={addressForm.address_line2}
                            onChange={(e) => setAddressForm({ ...addressForm, address_line2: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>City</Label>
                          <Input
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                            className="mt-1"
                          />
                          {errors.city && <p className="text-destructive text-sm mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <Label>State</Label>
                          <Input
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                            className="mt-1"
                          />
                          {errors.state && <p className="text-destructive text-sm mt-1">{errors.state}</p>}
                        </div>
                        <div>
                          <Label>Pincode</Label>
                          <Input
                            value={addressForm.pincode}
                            onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                            className="mt-1"
                          />
                          {errors.pincode && <p className="text-destructive text-sm mt-1">{errors.pincode}</p>}
                        </div>
                        <div className="md:col-span-2 flex gap-4 mt-4">
                          <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : editingAddress ? 'Update Address' : 'Save Address'}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setShowAddressForm(false);
                              setEditingAddress(null);
                              setAddressForm({
                                full_name: '',
                                phone: '',
                                address_line1: '',
                                address_line2: '',
                                city: '',
                                state: '',
                                pincode: '',
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {addresses.length === 0 && !showAddressForm ? (
                    <div className="bg-card rounded-xl p-8 shadow-card text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No saved addresses yet</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div key={address.id} className="bg-card rounded-xl p-4 shadow-card relative">
                          {address.is_default && (
                            <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                          <h4 className="font-semibold">{address.full_name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{address.phone}</p>
                          <p className="text-sm mt-2">
                            {address.address_line1}
                            {address.address_line2 && <>, {address.address_line2}</>}
                          </p>
                          <p className="text-sm">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingAddress(address);
                                setAddressForm({
                                  full_name: address.full_name,
                                  phone: address.phone,
                                  address_line1: address.address_line1,
                                  address_line2: address.address_line2 || '',
                                  city: address.city,
                                  state: address.state,
                                  pincode: address.pincode,
                                });
                                setShowAddressForm(true);
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Order History</h2>
                  {orders.length === 0 ? (
                    <div className="bg-card rounded-xl p-8 shadow-card text-center">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No orders yet</p>
                      <Button className="mt-4" onClick={() => navigate('/products')}>
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="bg-card rounded-xl p-6 shadow-card">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Order #{order.id.slice(0, 8).toUpperCase()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'shipped' ? 'bg-primary/10 text-primary' :
                              'bg-secondary text-secondary-foreground'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
                              'bg-accent/10 text-accent'
                            }`}>
                              {order.payment_status === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                        </div>
                        <div className="border-t pt-4 space-y-2">
                          {order.order_items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.product_name} × {item.quantity}</span>
                              <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                          <span>Total</span>
                          <span>{formatPrice(order.total_amount)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Account;
