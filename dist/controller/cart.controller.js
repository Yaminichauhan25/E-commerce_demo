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
exports.cartController = void 0;
const cart_model_1 = __importDefault(require("../models/cart.model"));
class CartController {
    CreateAndAddToCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let newCart;
                const userId = req.body.userId;
                const cartExist = yield cart_model_1.default.findOne({ userId });
                if (cartExist) {
                    const updatedCart = yield cart_model_1.default.findOneAndUpdate({ "cartItems.productId": req.body.cartItems[0].productId }, { $inc: { "cartItems.$.quantity": req.body.cartItems[0].quantity } }, { new: true });
                    if (!updatedCart) {
                        newCart = yield cart_model_1.default.findOneAndUpdate({ userId: req.body.userId }, { $push: { cartItems: req.body.cartItems } }, { new: true });
                    }
                    res.status(400).json({ message: "new product added", data: newCart });
                }
                else {
                    const cart = yield cart_model_1.default.create({
                        userId: req.body.userId,
                        cartItems: req.body.cartItems,
                    });
                    res
                        .status(200)
                        .json({ message: "successfully added to cart", data: cart });
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    getItems(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield cart_model_1.default.find();
                res.status(200).json({ data: data });
            }
            catch (err) {
                throw err;
            }
        });
    }
    removeProductFromCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = req.params.id;
                const data = yield cart_model_1.default.findOneAndUpdate({ userId: req.body.userId }, { $pull: { cartItems: { productId: productId } } });
                res.status(200).json({ message: "removed successfully", data: data });
            }
            catch (err) {
                throw err;
            }
        });
    }
    removeCartById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const data = yield cart_model_1.default.deleteOne({ _id });
                res.status(200).json({ data: data });
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.cartController = new CartController();
