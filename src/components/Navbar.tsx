import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card shadow-card">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+91 98765 43210</span>
          </div>
          <p className="hidden md:block">Free Delivery on Orders Above ₹999 | COD Available</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:underline">About Us</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">AR</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl text-foreground">AR Computers</h1>
              <p className="text-xs text-muted-foreground">Your Tech Partner</p>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search mobiles, laptops, headphones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 h-11 rounded-lg border-2 border-muted focus:border-primary"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 h-10 rounded-lg"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Category navigation */}
        <div className="hidden md:flex items-center gap-6 mt-4 border-t pt-4">
          <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            All Products
          </Link>
          <Link to="/products?category=Mobiles" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            📱 Mobiles
          </Link>
          <Link to="/products?category=Laptops" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            💻 Laptops
          </Link>
          <Link to="/products?category=Headphones" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            🎧 Headphones
          </Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            About Us
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t animate-fade-up">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link to="/products" className="block py-2 font-medium" onClick={() => setIsMenuOpen(false)}>
              All Products
            </Link>
            <Link to="/products?category=Mobiles" className="block py-2" onClick={() => setIsMenuOpen(false)}>
              📱 Mobiles
            </Link>
            <Link to="/products?category=Laptops" className="block py-2" onClick={() => setIsMenuOpen(false)}>
              💻 Laptops
            </Link>
            <Link to="/products?category=Headphones" className="block py-2" onClick={() => setIsMenuOpen(false)}>
              🎧 Headphones
            </Link>
            <Link to="/about" className="block py-2" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
