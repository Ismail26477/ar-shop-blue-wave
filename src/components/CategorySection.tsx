import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategorySection = () => {
  const categoryImages: Record<string, string> = {
    Mobiles: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
    Laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
    Headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
    Tablets: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop",
    Smartwatches: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
    Accessories: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=200&fit=crop",
    Gaming: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=200&fit=crop",
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
        <p className="text-muted-foreground">Explore our wide range of electronics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/products?category=${category.name}`}
            className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            <img
              src={categoryImages[category.name]}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-card">
              <span className="text-2xl md:text-4xl mb-1 md:mb-2 block">{category.icon}</span>
              <h3 className="text-lg md:text-2xl font-bold">{category.name}</h3>
              <p className="text-xs md:text-sm opacity-80">{category.count}+ Products</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
