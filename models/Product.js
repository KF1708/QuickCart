import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "user" }, // Or "User" if you renamed it
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  image: { type: [String], required: true }, // Better practice
  category: { type: String, required: true },
  date: { type: Number, required: true },
});

const Product =
  mongoose.models.product || mongoose.model("product", productSchema);

export default Product;
