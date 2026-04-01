export const categories = ["All", "Men", "Women", "Kids", "Accessories", "Footwear"];

export const colorOptions = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
    { name: "Navy", hex: "#0a192f" },
    { name: "Red", hex: "#f00000" },
    { name: "Olive", hex: "#708238" },
    { name: "Beige", hex: "#f5f5dc" },
];

export const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

export const products = [
    {
        id: 1,
        name: "Premium Cotton Graphic T-Shirt",
        brand: "Urban Edge",
        price: 899,
        originalPrice: 1499,
        discount: 40,
        category: "Men",
        colors: ["Black", "White", "Navy"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.5,
        reviews: 128,
        isNew: true,
        image: "/images/prod-1.png",
        images: ["/images/prod-1.png"],
        description: "Elevate your casual wardrobe with our premium cotton graphic t-shirt. Modern fit and striking visual elements."
    },
    {
        id: 2,
        name: "Floral Print Maxi Dress",
        brand: "Aura Boutique",
        price: 2499,
        originalPrice: 3999,
        discount: 37,
        category: "Women",
        colors: ["Red", "Navy"],
        sizes: ["XS", "S", "M", "L"],
        rating: 4.8,
        reviews: 84,
        isNew: false,
        image: "/images/prod-2.png",
        images: ["/images/prod-2.png"],
        description: "Embrace elegance with this flowing floral maxi dress. Perfect for evening events or brunch dates."
    },
    {
        id: 3,
        name: "Classic Denim Jacket",
        brand: "Denim Co.",
        price: 1899,
        originalPrice: 2999,
        discount: 36,
        category: "Men",
        colors: ["Navy", "Black"],
        sizes: ["M", "L", "XL", "XXL"],
        rating: 4.6,
        reviews: 215,
        isNew: false,
        image: "/images/prod-3.png",
        images: ["/images/prod-3.png"],
        description: "A timeless classic denim jacket with traditional contrast stitching and utility pockets."
    },
    {
        id: 4,
        name: "Kids Comfort Sneakers",
        brand: "Tiny Steps",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        category: "Kids",
        colors: ["White", "Red"],
        sizes: ["S", "M", "L"],
        rating: 4.9,
        reviews: 56,
        isNew: true,
        image: "/images/prod-4.png",
        images: ["/images/prod-4.png"],
        description: "Lightweight sneakers designed for active kids. Velcro strap closure for easy wear."
    },
    {
        id: 5,
        name: "Minimalist Leather Tote",
        brand: "Luxe Carry",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        category: "Accessories",
        colors: ["Beige", "Black"],
        sizes: ["One Size"],
        rating: 4.7,
        reviews: 92,
        isNew: false,
        image: "/images/prod-5.png",
        images: ["/images/prod-5.png"],
        description: "Spacious genuine leather tote bag with secure zip compartment and base studs."
    },
    {
        id: 6,
        name: "Athletic Running Shoes",
        brand: "Velocity",
        price: 4599,
        originalPrice: 5999,
        discount: 23,
        category: "Footwear",
        colors: ["White", "Black", "Navy"],
        sizes: ["8", "9", "10", "11"],
        rating: 4.8,
        reviews: 310,
        isNew: true,
        image: "/images/prod-6.png",
        images: ["/images/prod-6.png"],
        description: "Engineered for speed with responsive cushioning and breathable mesh upper."
    },
    {
        id: 7,
        name: "Summer Linen Shirt",
        brand: "Breeze",
        price: 1199,
        originalPrice: 1899,
        discount: 36,
        category: "Men",
        colors: ["Olive", "White"],
        sizes: ["M", "L", "XL"],
        rating: 4.3,
        reviews: 75,
        isNew: false,
        image: "/images/prod-7.png",
        images: ["/images/prod-7.png"],
        description: "Stay cool in 100% linen. Relaxed fit, perfect for beach holidays."
    },
    {
        id: 8,
        name: "High-Waist Yoga Leggings",
        brand: "Flex Fit",
        price: 1599,
        originalPrice: 2499,
        discount: 36,
        category: "Women",
        colors: ["Black", "Olive"],
        sizes: ["XS", "S", "M", "L"],
        rating: 4.9,
        reviews: 420,
        isNew: false,
        image: "/images/prod-8.png",
        images: ["/images/prod-8.png"],
        description: "Squat-proof, buttery soft fabric with seamless wide waistband and hidden pocket."
    }
];

export const heroBanners = [
    {
        id: 1,
        title: "Summer Collection 2026",
        subtitle: "Experience luxury in every thread with our beach-ready linen collection.",
        image: "/images/hero-1.png",
        cta: "Shop Now",
        link: "/shop"
    },
    {
        id: 2,
        title: "Step Into Style",
        subtitle: "Discover our premium footwear lineup for the urban explorer.",
        image: "/images/hero-2.png",
        cta: "Explore Shoes",
        link: "/shop?category=Footwear"
    }
];
