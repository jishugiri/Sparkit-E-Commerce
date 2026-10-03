const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Logitech Wireless Mouse",
    description: "Comfortable wireless mouse with smooth tracking and long battery life.",
    price: 799,
    category: "Mouse",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    stock: 25,
    rating: 4.5,
  },
  {
    name: "boAt Airdopes Atom 81",
    description: "Stylish wireless earbuds with deep bass and clear audio.",
    price: 1149,
    category: "Airpods",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1",
    stock: 30,
    rating: 4.2,
  },
  {
    name: "Sony Digital Camera",
    description: "High-quality digital camera for photography and video recording.",
    price: 24999,
    category: "Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    stock: 10,
    rating: 4.7,
  },
  {
    name: "JBL Wired Earphones",
    description: "Clear sound earphones with powerful bass and comfortable fit.",
    price: 699,
    category: "Earphones",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    stock: 40,
    rating: 4.3,
  },
  {
    name: "Samsung Galaxy Smartphone",
    description: "Modern smartphone with powerful performance and an immersive display.",
    price: 24999,
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    stock: 15,
    rating: 4.6,
  },
  {
    name: "HP Wireless Printer",
    description: "Compact wireless printer suitable for home and office printing.",
    price: 6999,
    category: "Printers",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6",
    stock: 12,
    rating: 4.1,
  },
  {
    name: "Intel Core i5 Processor",
    description: "Reliable processor designed for everyday computing and productivity.",
    price: 15999,
    category: "Processor",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e",
    stock: 20,
    rating: 4.8,
  },
  {
    name: "LG Double Door Refrigerator",
    description: "Energy-efficient refrigerator with spacious storage capacity.",
    price: 32999,
    category: "Refrigerator",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5",
    stock: 8,
    rating: 4.5,
  },
  {
    name: "JBL Bluetooth Speaker",
    description: "Portable Bluetooth speaker with powerful sound and deep bass.",
    price: 2999,
    category: "Speakers",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    stock: 25,
    rating: 4.4,
  },
  {
    name: "Samsung Smart LED TV",
    description: "Smart LED television with vivid picture quality and streaming support.",
    price: 38999,
    category: "Televisions",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
    stock: 7,
    rating: 4.6,
  },
  {
    name: "Philips Beard Trimmer",
    description: "Rechargeable beard trimmer with multiple length settings.",
    price: 1499,
    category: "Trimmers",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    stock: 35,
    rating: 4.3,
  },
  {
    name: "Casio Analog Watch",
    description: "Classic analog watch with a stylish design for everyday use.",
    price: 2499,
    category: "Watches",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    stock: 18,
    rating: 4.5,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log(`${products.length} products added successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedProducts();