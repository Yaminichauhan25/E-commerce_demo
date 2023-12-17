"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../controller/cart.controller");
const user_middleware_1 = __importDefault(require("../middleware/user.middleware"));
const router = (0, express_1.Router)();
router.post('/addtocart', user_middleware_1.default, cart_controller_1.cartController.CreateAndAddToCart);
router.get('/getCart', user_middleware_1.default, cart_controller_1.cartController.getItems);
router.delete('/deleteProductFromCart/:id', user_middleware_1.default, cart_controller_1.cartController.removeProductFromCart);
router.delete('/deletecart/:id', user_middleware_1.default, cart_controller_1.cartController.removeCartById);
exports.default = router;
