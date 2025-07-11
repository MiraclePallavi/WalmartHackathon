import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";
import path from "path";
import { connect } from "../dbConfig";
import { Product } from "../models/products";

async function seed() {
  try {
    const filePath = path.join(process.cwd(), "data", "walmart_products.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(rawData);

    await connect();
    console.log("DB connected");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(products);
    console.log(` Inserted ${products.length} products`);
    process.exit(0);
  } catch (err) {
    console.error(" Seeding error:", err);
    process.exit(1);
  }
}

seed();
