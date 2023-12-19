"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const cart_routes_1 = __importDefault(require("./cart.routes"));
const wishlist_routes_1 = __importDefault(require("./wishlist.routes"));
const address_routes_1 = __importDefault(require("./address.routes"));
const router = (0, express_1.Router)();
router.use("/", product_routes_1.default, user_routes_1.default, cart_routes_1.default, wishlist_routes_1.default, address_routes_1.default);
exports.default = router;
