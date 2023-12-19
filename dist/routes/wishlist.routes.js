"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_controller_1 = __importDefault(require("../controller/wishlist.controller"));
const user_middleware_1 = __importDefault(require("../middleware/user.middleware"));
const router = (0, express_1.Router)();
router.post('/addToWishlist', user_middleware_1.default, wishlist_controller_1.default.addProductToWishlist);
router.get('/getWishlist', user_middleware_1.default, wishlist_controller_1.default.getWishlistData);
router.delete('/removeProductFromWishlist/:id', user_middleware_1.default, wishlist_controller_1.default.removeProductFromWishlist);
router.delete('/removeWishlist/:id', user_middleware_1.default, wishlist_controller_1.default.removeWishlist);
exports.default = router;
