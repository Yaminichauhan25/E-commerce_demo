import mongoose, { model } from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, required: true },
      },
    ],
  },
  { timestamps: true }
);
const wishlistModel = model("wishlistDetails", wishlistSchema);
export default wishlistModel;
