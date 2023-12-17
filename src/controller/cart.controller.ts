import { Request, Response, NextFunction } from "express";
import cartModel from "../models/cart.model";

class CartController {
  async CreateAndAddToCart(req: Request, res: Response, next: NextFunction) {
    try {
      let newCart;
      const userId= req.body.userId
      const cartExist = await cartModel.findOne({ userId});
      if (cartExist) {
        const updatedCart = await cartModel.findOneAndUpdate(
          { "cartItems.productId": req.body.cartItems[0].productId },
          { $inc: { "cartItems.$.quantity": req.body.cartItems[0].quantity } },
          { new: true }
        )
        if (!updatedCart) {
          newCart = await cartModel.findOneAndUpdate(
            { userId: req.body.userId },
            { $push: { cartItems: req.body.cartItems } },
            { new: true }
          );
        }
        res.status(400).json({ message: "new product added", data: newCart });
      } else {
        const cart = await cartModel.create({
          userId: req.body.userId,
          cartItems: req.body.cartItems,
        });
        res
          .status(200)
          .json({ message: "successfully added to cart", data: cart });
      }
    } catch (err) {
      throw err;
    }
  }
  async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await cartModel.find();
      res.status(200).json({ data: data });
    } catch (err) {
      throw err;
    }
  }
  async removeProductFromCart(req: Request, res: Response, next: NextFunction) {
    try {
        const productId = req.params.id;
      const data = await cartModel.findOneAndUpdate(
        { userId: req.body.userId}, 
        { $pull: { cartItems: { productId: productId} } },
      
    );
    res.status(200).json({message:"removed successfully",data:data})
    } catch (err) {
      throw err;
    }
  }

  async removeCartById(req: Request, res: Response, next: NextFunction) {
    try {
      const _id = req.params.id;
      const data = await cartModel.deleteOne({ _id });
      res.status(200).json({ data: data });
    } catch (err) {
      throw err;
    }
  }

}
export const cartController= new CartController()