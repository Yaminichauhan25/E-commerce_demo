import { Request, Response, NextFunction } from "express";
import cartModel from "../models/cart.model";
import { constants } from "../constants/constant";

//CREATE_CART
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
        res.status(400).json({ message:constants.message.productAdded, data: newCart });
      } else {
        const cart = await cartModel.create({
          userId: req.body.userId,
          cartItems: req.body.cartItems,
        });
        res
          .status(200)
          .json({ message: constants.message.addedToCart, data: cart });
      }
    } catch (err) {
      throw err;
    }
  }

  //GET_ITEMS_OF_CART
  async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await cartModel.find();
      res.status(200).json({ data: data });
    } catch (err) {
      throw err;
    }
  }

  //REMOVE_PRODUCT_FROM_CART
  async removeProductFromCart(req: Request, res: Response, next: NextFunction) {
    try {
        const productId = req.params.id;
      const data = await cartModel.findOneAndUpdate(
        { userId: req.body.userId}, 
        { $pull: { cartItems: { productId: productId} } },
      
    );
    res.status(200).json({message:constants.message.removeFromcart,data:data})
    } catch (err) {
      throw err;
    }
  }

 //REMOVE_PRODUCT_FROM_CART_BY_ID
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