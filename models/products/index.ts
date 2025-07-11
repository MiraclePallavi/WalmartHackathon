import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ProductDocument extends Document {
  product_id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  price: number;
  currency: string;
  image_url: string;
  product_url: string;
  brand: string;
  material: string[];
  color_palette: string[];
  style_vibe: string;
  embedding: number[];
  created_at: Date;
}

const ProductSchema = new Schema<ProductDocument>({
  product_id:     { type: String, required: true, unique: true },
  name:           { type: String, required: true },
  description:    { type: String },
  category:       { type: String },
  subcategory:    { type: String },
  tags:           { type: [String], default: [] },
  price:          { type: Number, required: true },
  currency:       {type: String, default: "USD" },
  image_url:      { type: String },
  product_url:    { type: String },
  brand:          { type: String },
  material:       { type: [String], default: [] },
  color_palette:  { type: [String], default: [] },
  style_vibe:     { type: String },
  embedding:      { type: [Number], default: [] }, 
  created_at:     { type: Date, default: () => new Date() },
});
ProductSchema.index({ tags: 1 });
ProductSchema.index({ category: 1, subcategory: 1 });
ProductSchema.index({ name: "text", description: "text" });

export const Product =
  models.Product || model<ProductDocument>("Product", ProductSchema);
