import { Request, Response } from "express";
import productModel from "../models/product.model";
import { client } from "../services/database/redis";
import wishlistController from "./wishlist.controller";

class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const { title, description, size, categories, color, price } = req.body;
      const imagePath = req.file?.path;
      const product = await productModel.create({
        title: title,
        description: description,
        size: size,
        categories: categories,
        price: price,
        color: color,
        image: imagePath,
      });
      res
        .status(200)
        .json({ message: "product added successfuly", data: product });
    } catch (error) {
      res.status(400).json({ data: error });
    }
  }
  // async getProducts(req: Request, res: Response) {
  //   try {
  //     const cacheKey = "cached_data";
  //     const cachedData = await client.get(cacheKey);
  //      const wishlistData = await wishlistController.getWishlist();
  //     console.log("_------------", wishlistData, "-------");
  
  //     // if (cachedData) {
  //     //   // Serve cached data
  //     //   // console.log(JSON.parse(cachedData), "------get cache");
  //     //   res.status(200).json({ data: JSON.parse(cachedData) });
  //     // } else {
  //       // Fetch data from the database
  //       const newData = await productModel.find();
  //       console.log(newData)
  //       // const productIds = [];

  //       const productIds = wishlistData
  //     .flatMap(wishlist => wishlist.products.map(product => product.productId.toString()));

  //   console.log(productIds);
  //   const productsWithWishlistStatus = newData.map(product => {
  //     const isWishlisted = productIds.includes(product._id.toString());
  //     console.log(product._id.toString() === productIds.toString());
  //     return { ...product.toObject(), isWishlisted };
  //   });

  //  // Check if each product is wishlisted
  //       // Cache the data for future use
  //       // client.setex(cacheKey, 3600, JSON.stringify(newData)); // Cache for 1 hour
  
  //       // Send the response only in the else block
  //       res.status(200).json({ data: productsWithWishlistStatus });
  //     // }
  //   } catch (error) {
  //     // Handle errors appropriately, don't just throw them
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }
  async getProducts(req: Request, res: Response) {
    try {
      const wishlistData = await wishlistController.getWishlist();
      console.log("_------------", wishlistData, "-------");
      const newData = await productModel.find();
      console.log(newData)
       const productIds = wishlistData
      .flatMap(wishlist => wishlist.products.map(product => product.productId.toString()));

    console.log(productIds);
    const productsWithWishlistStatus = newData.map(product => {
      const isWishlisted = productIds.includes(product._id.toString());
      console.log(product._id.toString() === productIds.toString());
      return { ...product.toObject(), isWishlisted };
    });
    res.status(200).json({ data: productsWithWishlistStatus });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  async getProductById(req: Request, res: Response) {
    try {
      const id = req.query.id;
      const product = await productModel.findById(id);
      res.status(200).json({ data: product });
    } catch (error) {
      throw error;
    }
  }
  async removeProductById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const product = await productModel.deleteOne({ id });
      res.status(200).json({ data: product });
    } catch (error) {
      throw error;
    }
  }
}
export const productController = new ProductController();
