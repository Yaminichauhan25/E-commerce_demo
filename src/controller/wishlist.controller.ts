import { Request, Response } from "express";
import wishlistModel from "../models/wishlist.module"; // Import your Wishlist model

class WishlistController {
  async addProductToWishlist(req: Request, res: Response) {
    try {
      const userId = req.body.userId;
      const products = req.body.products;
     
    // Check if wishlist exists for the user
    const wishlistExist = await wishlistModel.findOne({ userId });
     if (wishlistExist) {
    const productIds:any=wishlistExist?.products.map((product)=>product.productId.toString());
    const product = products.find((element:any) => element.productId);      
    const productId = product ? product.productId : undefined;
    const isUserInArray = productIds.some((objId:any) => objId === productId);
    if (isUserInArray) {
    return res.json({ message: "Product already exist" });
     }
    await wishlistModel.findOneAndUpdate(
    { userId },
    { $push: { products: products } }
    );
    return res.json({ message: "Product added to existing wishlist" });
    } else {
        // Wishlist doesn't exist, create a new wishlist
         await wishlistModel.create({
          userId,
          products,
        });
        return res.json({ message: "New wishlist created and product added" });
      }
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getWishlist() {
    try {
      const getWishlist = await wishlistModel.find();
      return getWishlist
    //  return  res.status(200).json({ data: getWishlist });
    } catch (err) {
      throw err;
    }
  }
  async removeProductFromWishlist(req: Request, res: Response) {
    try {
      console.log(req.params.id);
      const productId = req.params.id;
      const getWishlist = await wishlistModel.findOneAndUpdate(
        { userId: req.body.userId },
        { $pull: { products: { productId: productId } } },
        { new: true }
      );
      res.status(200).json({ data: getWishlist });
    } catch (err) {
      throw err;
    }
  }
  async removeWishlist(req: Request, res: Response) {
    try {
      const _id = req.params.id;
      const getWishlist = await wishlistModel.deleteOne({ _id });
      res.status(200).json({ data: getWishlist });
    } catch (err) {
      throw err;
    }
  }
}
const wishlistController = new WishlistController();
export default wishlistController;
