import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import BrandSection from '@/components/BrandSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>AR Computers - Best Electronics Store in India | Mobiles, Laptops, Headphones</title>
        <meta name="description" content="Shop the latest mobiles, laptops, and headphones at AR Computers. Best prices, genuine products, and free delivery across India. Your trusted tech partner since 2015." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <CategorySection />
          <FeaturedProducts />
          <BrandSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
