import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategorySection = () => {
  const categoryImages = {
    Mobiles: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
    Laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
    Headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
        <p className="text-muted-foreground">Explore our wide range of electronics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/products?category=${category.name}`}
            className="group relative overflow-hidden rounded-2xl aspect-[3/2] shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            <img
              src={categoryImages[category.name as keyof typeof categoryImages]}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-card">
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <h3 className="text-2xl font-bold">{category.name}</h3>
              <p className="text-sm opacity-80">{category.count}+ Products</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
