import { Request, Response } from "express";
import wishlistModel from "../models/wishlist.module"; // Import your Wishlist model
import { constants } from "../constants/constant";

//ADD_TO_WISHLIST
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
    return res.json({ message:constants.message.productExist});
     }
    await wishlistModel.findOneAndUpdate(
    { userId },
    { $push: { products: products } }
    );
    return res.json({ message:constants.message.productAddedToExistingWishlist});
    } else {
        // Wishlist doesn't exist, create a new wishlist
         await wishlistModel.create({
          userId,
          products,
        });
        return res.json({ message:constants.message.wishlistCreated  });
      }
    } catch (err) {
      return res.status(500).json({ error: constants.message.error });
    }
  }

  //GET_WISHLIST
  async getWishlistData(req:Request,res:Response) {
    try {
      const getWishlist = await wishlistModel.find();
      // return getWishlist
      res.status(200).json({ data: getWishlist });
    } catch (err) {
      throw err;
    }
  }
  async getWishlist() {
    try {
      const getWishlist = await wishlistModel.find();
      return getWishlist
      // return res.status(200).json({ data: getWishlist });
    } catch (err) {
      throw err
      // Handle the error appropriately, for example, send an error response
      console.error(err);
      // return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  //REMOVE_PRODUCT_FROM_WISHLIST
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

  //REMOVE_WISHLIST
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
