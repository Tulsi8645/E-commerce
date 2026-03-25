require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";

const dummyProducts = [
  {
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Classic White T-Shirt",
    description: "A comfortable and stylish classic white t-shirt suitable for any casual occasion.",
    category: "men",
    brand: "levi",
    price: 35,
    salePrice: 25,
    totalStock: 100,
    averageReview: 4.5,
  },
  {
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Running Sneakers",
    description: "Lightweight and breathable sneakers perfect for your morning runs.",
    category: "footwear",
    brand: "nike",
    price: 120,
    salePrice: 90,
    totalStock: 50,
    averageReview: 4.8,
  },
  {
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Summer Dress",
    description: "A beautiful floral summer dress for warm sunny days.",
    category: "women",
    brand: "zara",
    price: 75,
    salePrice: 60,
    totalStock: 30,
    averageReview: 4.2,
  },
  {
    image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Kids Denim Jacket",
    description: "Durable and trendy denim jacket for kids.",
    category: "kids",
    brand: "h&m",
    price: 45,
    salePrice: 35,
    totalStock: 40,
    averageReview: 4.0,
  },
  {
    image: "https://images.unsplash.com/photo-1508656919613-02fce2762a15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Pro Sport Watch",
    description: "Water-resistant sports watch with heartbeat monitor.",
    category: "accessories",
    brand: "puma",
    price: 150,
    salePrice: 120,
    totalStock: 20,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Original Trainers",
    description: "Classic retro style trainers.",
    category: "footwear",
    brand: "adidas",
    price: 95,
    salePrice: 0,
    totalStock: 60,
    averageReview: 4.3,
  },
  {
    image: "https://images.unsplash.com/photo-1489987707023-af0825dad1b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Minimalist Leather Jacket",
    description: "Premium leather jacket for men with a minimalist design.",
    category: "men",
    brand: "zara",
    price: 250,
    salePrice: 200,
    totalStock: 15,
    averageReview: 4.7,
  },
  {
    image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Elegant Evening Gown",
    description: "Stunning evening gown for formal events.",
    category: "women",
    brand: "h&m",
    price: 180,
    salePrice: 150,
    totalStock: 10,
    averageReview: 4.6,
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");
    
    // Optional: Clear existing products
    // await Product.deleteMany({});
    // console.log("Cleared existing products.");

    await Product.insertMany(dummyProducts);
    console.log("Successfully seeded", dummyProducts.length, "products!");
    
    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Error seeding the database:");
    console.error(err);
    mongoose.connection.close();
    process.exit(1);
  }
}

seedDB();
