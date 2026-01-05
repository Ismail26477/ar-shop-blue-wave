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
  // Mobiles
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

  // Laptops
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

  // Headphones
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
  },

  // Tablets
  {
    id: "13",
    name: "iPad Pro 12.9\" M2",
    category: "Tablets",
    price: 112900,
    originalPrice: 124900,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 1876,
    description: "The ultimate iPad experience with M2 chip and stunning Liquid Retina XDR display.",
    features: ["M2 Chip", "Liquid Retina XDR", "Apple Pencil 2 Support", "Face ID", "Thunderbolt"],
    inStock: true,
    brand: "Apple"
  },
  {
    id: "14",
    name: "Samsung Galaxy Tab S9 Ultra",
    category: "Tablets",
    price: 108999,
    originalPrice: 119999,
    image: "https://images.unsplash.com/photo-1632882765546-1ee75f53becb?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 987,
    description: "The biggest Galaxy Tab ever with Dynamic AMOLED 2X display and S Pen.",
    features: ["14.6\" Display", "Snapdragon 8 Gen 2", "S Pen Included", "IP68 Rated", "11200mAh Battery"],
    inStock: true,
    brand: "Samsung"
  },
  {
    id: "15",
    name: "OnePlus Pad 2",
    category: "Tablets",
    price: 39999,
    originalPrice: 44999,
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 543,
    description: "Premium Android tablet with stunning display and long battery life.",
    features: ["12.1\" 3K Display", "Snapdragon 8 Gen 3", "144Hz Refresh", "9510mAh Battery", "67W Charging"],
    inStock: true,
    brand: "OnePlus"
  },
  {
    id: "16",
    name: "Lenovo Tab P12 Pro",
    category: "Tablets",
    price: 49999,
    originalPrice: 59999,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 432,
    description: "Premium productivity tablet with AMOLED display and JBL speakers.",
    features: ["12.6\" AMOLED", "Snapdragon 870", "8GB RAM", "JBL Quad Speakers", "Precision Pen 3"],
    inStock: true,
    brand: "Lenovo"
  },

  // Smartwatches
  {
    id: "17",
    name: "Apple Watch Ultra 2",
    category: "Smartwatches",
    price: 89900,
    originalPrice: 99900,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 2341,
    description: "The most rugged and capable Apple Watch ever for extreme adventures.",
    features: ["Titanium Case", "3000 nits Display", "Double Tap", "Precision GPS", "100m Water Resistant"],
    inStock: true,
    brand: "Apple"
  },
  {
    id: "18",
    name: "Samsung Galaxy Watch 6 Classic",
    category: "Smartwatches",
    price: 35999,
    originalPrice: 39999,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 1234,
    description: "Classic design meets cutting-edge technology with rotating bezel.",
    features: ["Rotating Bezel", "BioActive Sensor", "Sapphire Crystal", "5ATM + IP68", "Wear OS"],
    inStock: true,
    brand: "Samsung"
  },
  {
    id: "19",
    name: "Garmin Fenix 7 Pro",
    category: "Smartwatches",
    price: 79999,
    originalPrice: 89999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 876,
    description: "Premium multisport GPS smartwatch with LED flashlight.",
    features: ["Solar Charging", "LED Flashlight", "Multiband GPS", "Topo Maps", "28-Day Battery"],
    inStock: true,
    brand: "Garmin"
  },
  {
    id: "20",
    name: "Amazfit GTR 4",
    category: "Smartwatches",
    price: 16999,
    originalPrice: 19999,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 2134,
    description: "Premium smartwatch with dual-band GPS and 150+ sports modes.",
    features: ["Dual-Band GPS", "AMOLED Display", "14-Day Battery", "Alexa Built-in", "150+ Sports"],
    inStock: true,
    brand: "Amazfit"
  },

  // Accessories
  {
    id: "21",
    name: "Apple Magic Keyboard",
    category: "Accessories",
    price: 34900,
    originalPrice: 39900,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 1543,
    description: "The best typing experience with Touch ID and backlit keys.",
    features: ["Touch ID", "Backlit Keys", "Wireless", "USB-C Charging", "Scissor Mechanism"],
    inStock: true,
    brand: "Apple"
  },
  {
    id: "22",
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: 10995,
    originalPrice: 12995,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 3421,
    description: "The most advanced wireless mouse with MagSpeed scroll and quiet clicks.",
    features: ["8K DPI", "Quiet Clicks", "MagSpeed Scroll", "USB-C", "Multi-Device"],
    inStock: true,
    brand: "Logitech"
  },
  {
    id: "23",
    name: "Samsung 65W Power Adapter",
    category: "Accessories",
    price: 3499,
    originalPrice: 4499,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 876,
    description: "Super fast charging adapter compatible with all USB-C devices.",
    features: ["65W Output", "USB-C PD", "Universal Compatible", "Compact Design", "GaN Technology"],
    inStock: true,
    brand: "Samsung"
  },
  {
    id: "24",
    name: "Anker PowerCore 26800",
    category: "Accessories",
    price: 5999,
    originalPrice: 7499,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 5432,
    description: "High-capacity power bank to keep all your devices charged.",
    features: ["26800mAh", "45W USB-C", "Triple Output", "PowerIQ 3.0", "Travel Pouch Included"],
    inStock: true,
    brand: "Anker"
  },

  // Gaming Consoles
  {
    id: "25",
    name: "PlayStation 5",
    category: "Gaming",
    price: 49990,
    originalPrice: 54990,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 8765,
    description: "Experience lightning-fast loading with ultra-high speed SSD and immersive gameplay.",
    features: ["4K 120Hz", "Ray Tracing", "DualSense Controller", "825GB SSD", "Haptic Feedback"],
    inStock: true,
    brand: "Sony"
  },
  {
    id: "26",
    name: "Xbox Series X",
    category: "Gaming",
    price: 49990,
    originalPrice: 54990,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 6543,
    description: "The most powerful Xbox ever with true 4K gaming and quick resume.",
    features: ["12 TF GPU", "4K 120fps", "1TB SSD", "Quick Resume", "Game Pass Ready"],
    inStock: true,
    brand: "Microsoft"
  },
  {
    id: "27",
    name: "Nintendo Switch OLED",
    category: "Gaming",
    price: 34999,
    originalPrice: 37999,
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 4321,
    description: "Vivid 7-inch OLED screen with wide adjustable stand and enhanced audio.",
    features: ["7\" OLED Display", "64GB Storage", "Enhanced Audio", "Wide Stand", "Wired LAN Port"],
    inStock: true,
    brand: "Nintendo"
  },
  {
    id: "28",
    name: "Steam Deck OLED",
    category: "Gaming",
    price: 59999,
    originalPrice: 64999,
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 2134,
    description: "The most powerful handheld gaming PC with stunning OLED display.",
    features: ["7.4\" OLED HDR", "AMD APU", "512GB NVMe", "Wi-Fi 6E", "12+ Hour Battery"],
    inStock: true,
    brand: "Valve"
  }
];

export const categories = [
  { name: "Mobiles", icon: "📱", count: 4 },
  { name: "Laptops", icon: "💻", count: 4 },
  { name: "Headphones", icon: "🎧", count: 4 },
  { name: "Tablets", icon: "📟", count: 4 },
  { name: "Smartwatches", icon: "⌚", count: 4 },
  { name: "Accessories", icon: "🔌", count: 4 },
  { name: "Gaming", icon: "🎮", count: 4 },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
