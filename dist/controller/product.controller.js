"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const wishlist_controller_1 = __importDefault(require("./wishlist.controller"));
const constant_1 = require("../constants/constant");
//CREATE_PRODUCT
class ProductController {
    createProduct(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, size, categories, color, price } = req.body;
                const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                const product = yield product_model_1.default.create({
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
                    .json({ message: constant_1.constants.message.productAdded, data: product });
            }
            catch (error) {
                res.status(400).json({ data: error });
            }
        });
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
    //GET_PRODUCTS
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const wishlistData = yield wishlist_controller_1.default.getWishlist();
                const newData = yield product_model_1.default.find();
                const productIds = wishlistData
                    .flatMap(wishlist => wishlist.products.map(product => product.productId.toString()));
                const productsWithWishlistStatus = newData.map(product => {
                    const isWishlisted = productIds.includes(product._id.toString());
                    return Object.assign(Object.assign({}, product.toObject()), { isWishlisted });
                });
                res.status(200).json({ data: productsWithWishlistStatus });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: constant_1.constants.message.error });
            }
        });
    }
    //GET_PRODUCT_BY_ID
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const product = yield product_model_1.default.findById(id);
                res.status(200).json({ data: product });
            }
            catch (error) {
                throw error;
            }
        });
    }
    //REMOVE_PRODUCT_BY_ID
    removeProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                console.log(_id);
                const product = yield product_model_1.default.deleteOne({ _id });
                res.status(200).json({ data: product });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.productController = new ProductController();
