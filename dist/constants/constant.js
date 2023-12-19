"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_CONFIG = exports.constants = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config(); // Load environment variables from .env file
exports.constants = {
    statusCode: {
        invalid: 400,
        loginFailed: 401,
        success: 200,
        alreadyLoggedIn: 406,
        alreadyExist: 409,
        notFound: 404,
        gone: 410,
        internalServerError: 500,
    },
    message: {
        success: "success",
        unauthorized: "Unauthorized",
        serverRunning: "server is running on port",
        signedup: "signedup successfully",
        login: "Loggedin successfully",
        logout: "Logout successful",
        connection: "connection successful!",
        exist: "user already exit",
        notExist: "User does not exist",
        updateProfile: "profile updated successfully",
        addAddress: "address saved successfuly",
        invalidIdFormat: "Invalid address ID format",
        addressNotFound: "Address not found",
        addressUpdated: "Address updated successfully",
        error: "Internal server error",
        productAdded: "new product added successfully",
        addedToCart: "successfully added to cart",
        removeFromcart: "removed successfully",
        productExist: "Product already exist",
        wishlistCreated: "New wishlist created and product added",
        productAddedToExistingWishlist: "Product added to existing wishlist",
        passwordNotMatched: "Password does not match",
        errorSendingOtp: "Error sending OTP",
        otpSent: "otp sent",
        passwordUpdated: 'password updated',
        enterSamePassword: 'enter same password'
    },
    status: {
        true: true,
        false: false,
    },
};
exports.APP_CONFIG = {
    dbConnection: process.env.DB_URL,
    port: process.env.PORT,
    url: process.env.URL,
    jwt_secret: process.env.JWT_SECRET,
    accountSid: process.env.ACCOUNT_SID,
    authToken: process.env.AUTH_TOKEN
};
