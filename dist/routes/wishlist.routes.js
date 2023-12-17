"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_controller_1 = __importDefault(require("../controller/wishlist.controller"));
const router = (0, express_1.Router)();
router.post('/addToWishlist', wishlist_controller_1.default.addProductToWishlist);
router.get('/getWishlist', wishlist_controller_1.default.getWishlist);
router.delete('/removeProductFromWishlist/:id', wishlist_controller_1.default.removeProductFromWishlist);
router.delete('/removeWishlist/:id', wishlist_controller_1.default.removeWishlist);
exports.default = router;
