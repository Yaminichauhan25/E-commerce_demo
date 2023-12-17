"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controller/user.controller");
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middleware/user.middleware"));
const user_middleware_2 = __importDefault(require("../middleware/user.middleware"));
const router = (0, express_1.Router)();
router.post("/signup", user_controller_1.userController.signup);
router.post("/login", user_controller_1.userController.login);
router.post("/forgotpassword", user_middleware_1.default, user_controller_1.userController.forgetPassword);
router.post("/resetPassword", user_middleware_1.default, user_controller_1.userController.ResetPassword);
router.get('/get', user_middleware_2.default, user_middleware_1.default, user_controller_1.userController.getProfile);
router.post("/logout", user_middleware_1.default, user_controller_1.userController.signOut);
exports.default = router;
