import mongoose, { model } from "mongoose";
import { ProductInterface } from "../interface/product.interface";

const productSchema = new mongoose.Schema<ProductInterface>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    size: {
      type: String,
      required:true
    },
    categories: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required:true
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const productModel = model<ProductInterface>("productDetails", productSchema);
export default productModel;
