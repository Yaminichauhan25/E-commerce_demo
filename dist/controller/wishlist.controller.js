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
const wishlist_module_1 = __importDefault(require("../models/wishlist.module")); // Import your Wishlist model
class WishlistController {
    addProductToWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.userId;
                const products = req.body.products;
                // Check if wishlist exists for the user
                const wishlistExist = yield wishlist_module_1.default.findOne({ userId });
                if (wishlistExist) {
                    const productIds = wishlistExist === null || wishlistExist === void 0 ? void 0 : wishlistExist.products.map((product) => product.productId.toString());
                    const product = products.find((element) => element.productId);
                    const productId = product ? product.productId : undefined;
                    const isUserInArray = productIds.some((objId) => objId === productId);
                    if (isUserInArray) {
                        return res.json({ message: "Product already exist" });
                    }
                    yield wishlist_module_1.default.findOneAndUpdate({ userId }, { $push: { products: products } });
                    return res.json({ message: "Product added to existing wishlist" });
                }
                else {
                    // Wishlist doesn't exist, create a new wishlist
                    yield wishlist_module_1.default.create({
                        userId,
                        products,
                    });
                    return res.json({ message: "New wishlist created and product added" });
                }
            }
            catch (err) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    getWishlist() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getWishlist = yield wishlist_module_1.default.find();
                return getWishlist;
                //  return  res.status(200).json({ data: getWishlist });
            }
            catch (err) {
                throw err;
            }
        });
    }
    removeProductFromWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params.id);
                const productId = req.params.id;
                const getWishlist = yield wishlist_module_1.default.findOneAndUpdate({ userId: req.body.userId }, { $pull: { products: { productId: productId } } }, { new: true });
                res.status(200).json({ data: getWishlist });
            }
            catch (err) {
                throw err;
            }
        });
    }
    removeWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const getWishlist = yield wishlist_module_1.default.deleteOne({ _id });
                res.status(200).json({ data: getWishlist });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
const wishlistController = new WishlistController();
exports.default = wishlistController;
