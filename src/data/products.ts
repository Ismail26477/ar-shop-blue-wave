export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  brand: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    category: "Mobiles",
    price: 159900,
    originalPrice: 179900,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 2547,
    description: "The most powerful iPhone ever with A17 Pro chip, titanium design, and advanced camera system.",
    features: ["A17 Pro Chip", "Titanium Design", "48MP Camera", "USB-C", "Action Button"],
    inStock: true,
    brand: "Apple"
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    category: "Mobiles",
    price: 134999,
    originalPrice: 149999,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 1823,
    description: "Galaxy AI is here. The ultimate smartphone with S Pen and AI-powered features.",
    features: ["Galaxy AI", "S Pen Included", "200MP Camera", "Snapdragon 8 Gen 3", "5000mAh Battery"],
    inStock: true,
    brand: "Samsung"
  },
  {
    id: "3",
    name: "MacBook Pro 14\" M3 Pro",
    category: "Laptops",
    price: 199900,
    originalPrice: 219900,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 1256,
    description: "Supercharged by M3 Pro chip for exceptional performance and all-day battery life.",
    features: ["M3 Pro Chip", "18GB RAM", "512GB SSD", "Liquid Retina XDR", "18hr Battery"],
    inStock: true,
    brand: "Apple"
  },
  {
    id: "4",
    name: "Dell XPS 15",
    category: "Laptops",
    price: 149999,
    originalPrice: 169999,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 892,
    description: "Premium laptop with stunning OLED display and Intel Core i9 processor.",
    features: ["Intel Core i9", "32GB RAM", "1TB SSD", "OLED Display", "NVIDIA RTX 4060"],
    inStock: true,
    brand: "Dell"
  },
  {
    id: "5",
    name: "Sony WH-1000XM5",
    category: "Headphones",
    price: 29990,
    originalPrice: 34990,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 3421,
    description: "Industry-leading noise cancellation with exceptional sound quality.",
    features: ["Best-in-class ANC", "30hr Battery", "Multipoint Connection", "Speak-to-Chat", "Premium Comfort"],
    inStock: true,
    brand: "Sony"
  },
  {
    id: "6",
    name: "Apple AirPods Pro 2",
    category: "Headphones",
    price: 24900,
    originalPrice: 26900,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 5632,
    description: "Rebuilt from the ground up with H2 chip for smarter noise cancellation.",
    features: ["H2 Chip", "Active Noise Cancellation", "Adaptive Audio", "USB-C", "6hr Battery"],
    inStock: true,
    brand: "Apple"
  },
  {
    id: "7",
    name: "OnePlus 12",
    category: "Mobiles",
    price: 64999,
    originalPrice: 69999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 1567,
    description: "Flagship killer with Hasselblad camera and 100W SUPERVOOC charging.",
    features: ["Snapdragon 8 Gen 3", "Hasselblad Camera", "100W Charging", "5400mAh Battery", "2K Display"],
    inStock: true,
    brand: "OnePlus"
  },
  {
    id: "8",
    name: "HP Pavilion Gaming Laptop",
    category: "Laptops",
    price: 84999,
    originalPrice: 94999,
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 743,
    description: "Powerful gaming laptop with RTX graphics for immersive gaming experience.",
    features: ["Intel Core i7", "16GB RAM", "512GB SSD", "RTX 4050", "144Hz Display"],
    inStock: true,
    brand: "HP"
  },
  {
    id: "9",
    name: "JBL Tune 770NC",
    category: "Headphones",
    price: 7999,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 2156,
    description: "Wireless headphones with Adaptive Noise Cancelling and Pure Bass sound.",
    features: ["Adaptive ANC", "70hr Battery", "Multipoint", "JBL Pure Bass", "Foldable Design"],
    inStock: true,
    brand: "JBL"
  },
  {
    id: "10",
    name: "Realme GT 5 Pro",
    category: "Mobiles",
    price: 44999,
    originalPrice: 49999,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 876,
    description: "Flagship performance at mid-range price with 100W charging.",
    features: ["Snapdragon 8 Gen 3", "Sony IMX890", "100W Charging", "5400mAh", "144Hz AMOLED"],
    inStock: true,
    brand: "Realme"
  },
  {
    id: "11",
    name: "ASUS ROG Zephyrus G14",
    category: "Laptops",
    price: 159999,
    originalPrice: 179999,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 654,
    description: "Ultra-slim gaming laptop with AMD Ryzen 9 and ROG Nebula Display.",
    features: ["AMD Ryzen 9", "RTX 4070", "32GB RAM", "ROG Nebula Display", "AniMe Matrix"],
    inStock: true,
    brand: "ASUS"
  },
  {
    id: "12",
    name: "Bose QuietComfort Ultra",
    category: "Headphones",
    price: 34900,
    originalPrice: 39900,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 1234,
    description: "World-class noise cancellation with Immersive Audio.",
    features: ["CustomTune ANC", "Immersive Audio", "24hr Battery", "Aware Mode", "Premium Materials"],
    inStock: true,
    brand: "Bose"
  }
];

export const categories = [
  { name: "Mobiles", icon: "📱", count: 4 },
  { name: "Laptops", icon: "💻", count: 4 },
  { name: "Headphones", icon: "🎧", count: 4 },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
