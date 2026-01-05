import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Award, Users, Truck, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - AR Computers | Your Trusted Electronics Partner in India</title>
        <meta name="description" content="Learn about AR Computers - India's trusted electronics retailer since 2015. Genuine products, best prices, and exceptional customer service." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About AR Computers</h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                Your trusted partner for premium electronics since 2015. We bring you the latest technology at the best prices with exceptional service.
              </p>
            </div>
          </section>

          {/* Story Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    AR Computers was founded in 2015 with a simple mission: to make premium electronics accessible to everyone in India. What started as a small shop in Mumbai has now grown into a trusted online destination for thousands of customers.
                  </p>
                  <p>
                    We believe that everyone deserves access to genuine, high-quality electronics at fair prices. That's why we work directly with authorized distributors and manufacturers to bring you authentic products with full warranty.
                  </p>
                  <p>
                    Our team of tech enthusiasts is passionate about helping you find the perfect device that fits your needs and budget. Whether you're looking for the latest smartphone, a powerful laptop, or premium audio gear – we've got you covered.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground">9+</h3>
                  <p className="text-muted-foreground">Years of Trust</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground">50K+</h3>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground">500+</h3>
                  <p className="text-muted-foreground">Cities Served</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground">100%</h3>
                  <p className="text-muted-foreground">Genuine Products</p>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="bg-secondary py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose AR Computers?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">100% Genuine Products</h3>
                  <p className="text-muted-foreground">
                    Every product we sell comes directly from authorized distributors with official warranty. No refurbished or grey market products.
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Fast & Free Delivery</h3>
                  <p className="text-muted-foreground">
                    Enjoy free delivery on orders above ₹999. We deliver to 500+ cities across India with express shipping options available.
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
                  <p className="text-muted-foreground">
                    Our tech experts are available 24/7 to help you make the right choice. Get personalized recommendations and after-sales support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Visit Us</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card rounded-xl p-8 shadow-card">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Store Address</p>
                      <p className="text-muted-foreground">
                        123, Tech Street, Electronics Market,<br />
                        Mumbai - 400001, Maharashtra, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                      <p className="text-muted-foreground">+91 22 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">support@arcomputers.in</p>
                      <p className="text-muted-foreground">sales@arcomputers.in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Store Hours</p>
                      <p className="text-muted-foreground">Monday - Saturday: 10:00 AM - 9:00 PM</p>
                      <p className="text-muted-foreground">Sunday: 11:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl overflow-hidden shadow-card">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.856428!2d72.8311!3d18.9432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU2JzM1LjUiTiA3MsKwNDknNTIuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '300px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AR Computers Location"
                ></iframe>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
