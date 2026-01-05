import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-up">
              <span className="inline-block bg-accent text-accent-foreground text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                🎉 New Year Sale - Up to 40% Off
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Latest Electronics <br />
                <span className="text-accent">Best Prices</span>
              </h1>
              <p className="text-lg opacity-90 mb-8 max-w-lg">
                Discover premium mobiles, laptops, and accessories at unbeatable prices. 
                Genuine products with warranty. Free delivery across India!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button variant="hero" size="xl" className="bg-card text-primary hover:bg-card/90">
                    Shop Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/products?category=Mobiles">
                  <Button variant="outline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                    Browse Mobiles
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative animate-float">
                <img
                  src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&h=500&fit=crop"
                  alt="Featured Electronics"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -left-4 bg-card text-foreground p-4 rounded-xl shadow-card-hover">
                  <p className="text-sm font-medium">iPhone 15 Pro</p>
                  <p className="text-lg font-bold text-primary">₹1,59,900</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Free Delivery</h3>
                <p className="text-sm text-muted-foreground">On orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Genuine Products</h3>
                <p className="text-sm text-muted-foreground">100% authentic warranty</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Expert assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
