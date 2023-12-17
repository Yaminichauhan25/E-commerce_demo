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
exports.userController = exports.config = void 0;
const md5_1 = __importDefault(require("md5"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const redis_1 = require("../services/database/redis");
const constant_1 = require("../constants/constant");
const response_handler_1 = require("../lib/response.handler");
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
const otp_model_1 = __importDefault(require("../models/otp.model"));
const user_service_1 = require("../service/user.service");
dotenv.config();
exports.config = dotenv.config({
    path: (0, path_1.join)(process.cwd() + "/.env"),
});
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, password, phoneNumber } = req.body;
                const existUser = yield user_model_1.default.findOne({ email: email });
                if (existUser) {
                    (0, response_handler_1.handleErrorResponse)(res, constant_1.constants.statusCode.alreadyExist, constant_1.constants.message.exist);
                }
                else {
                    const user = yield user_model_1.default.create({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: (0, md5_1.default)(password),
                        phoneNumber: phoneNumber,
                    });
                    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES,
                    });
                    redis_1.client.hset(`user:${user._id}`, {
                        _id: user._id.toString(),
                        email: user.email,
                        token: token,
                    });
                    redis_1.client.expire(`user:${user._id}`, 120, (err, reply) => {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            console.log(`TTL set for user:${user._id}`);
                        }
                    });
                    (0, response_handler_1.handleSuccessResponse)(res, constant_1.constants.statusCode.success, constant_1.constants.message.signedup, user, token);
                }
            }
            catch (err) {
                (0, response_handler_1.handleErrorResponse)(res, constant_1.constants.statusCode.internalServerError, err.message);
            }
        });
    }
    //LOGIN_API
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, phoneNumber } = req.body;
                const existUser = yield user_model_1.default.findOne({
                    $or: [{ phoneNumber: phoneNumber }, { email: email }],
                });
                if (!existUser) {
                    return (0, response_handler_1.handleErrorResponse)(res, constant_1.constants.statusCode.notFound, constant_1.constants.message.notExist);
                }
                const verifypassword = (0, md5_1.default)(password) === existUser.password;
                if (!verifypassword) {
                    return res.status(400).json({ message: "Password does not match" });
                }
                const token = jsonwebtoken_1.default.sign({ _id: existUser._id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES,
                });
                redis_1.client.hset(`user:${existUser._id}`, {
                    _id: existUser._id.toString(),
                    email: existUser.email,
                    token: token,
                });
                redis_1.client.expire(`user:${existUser._id}`, 3600);
                const userExist = yield otp_model_1.default.findOne({ phoneNumber: phoneNumber });
                const otp = Math.floor(1000 + Math.random() * 9000);
                if (existUser && userExist) {
                    yield otp_model_1.default.findOneAndUpdate({ phoneNumber: phoneNumber }, { code: otp });
                }
                else {
                    yield otp_model_1.default.create({ phoneNumber: phoneNumber, code: otp });
                }
                const success = yield user_service_1.userService.sendOtpBySMS(otp, phoneNumber);
                if (success) {
                    res.status(200).json({ message: "Login successful", token });
                }
                else {
                    res.status(500).json({ message: "Error sending OTP" });
                }
            }
            catch (err) {
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
    //FORGOT_PASSWORD
    forgetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, phoneNumber } = req.body;
                const user = yield user_model_1.default.findOne({
                    $or: [{ email: email }, { phoneNumber: phoneNumber }],
                });
                if (!user) {
                    return (0, response_handler_1.handleErrorResponse)(res, constant_1.constants.statusCode.notFound, constant_1.constants.message.notExist);
                }
                const userExist = yield otp_model_1.default.findOne({ email: email });
                const otp = Math.floor(1000 + Math.random() * 9000);
                if (user && userExist) {
                    yield otp_model_1.default.findOneAndUpdate({ $or: [{ email: user.email }, { phoneNumber: user.phoneNumber }] }, { code: otp });
                }
                else {
                    yield otp_model_1.default.create({
                        $or: [
                            { email: req.body.email },
                            { phoneNumber: req.body.phoneNumber },
                        ],
                        code: otp,
                    });
                }
                if (email) {
                    yield user_service_1.userService.sendOtpByEmail(otp, email);
                }
                yield user_service_1.userService.sendOtpBySMS(otp, phoneNumber);
                res.status(200).json({ message: "otp sent" });
            }
            catch (err) {
                res.status(400).json(err.message);
            }
        });
    }
    //RESET PASSWORD
    ResetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, confirmPassword } = req.body;
                const token = req.headers.authorization;
                const [, payloadBase64] = token.split('.');
                // Decode the payload (second part)
                const decodedPayload = Buffer.from(payloadBase64, 'base64').toString('utf-8');
                // Parse the JSON string into an object
                const payloadObject = JSON.parse(decodedPayload);
                // Extract the user ID
                const userId = payloadObject._id;
                let data = yield user_model_1.default.findOne({ _id: userId });
                if (!data) {
                    return (0, response_handler_1.handleErrorResponse)(res, constant_1.constants.statusCode.notFound, constant_1.constants.message.notExist);
                }
                else {
                    if (password == confirmPassword) {
                        yield user_model_1.default.findByIdAndUpdate({ _id: data._id }, { $set: { password: (0, md5_1.default)(password) } });
                        res.status(400).json({ message: 'password updated' });
                    }
                    else {
                        res.status(400).json({ message: 'enter same password' });
                    }
                }
            }
            catch (err) {
                res.status(400).json(err.message);
            }
        });
    }
    //GET_PROFILE
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newData = yield user_model_1.default.find();
                res.status(200).json({ data: newData });
            }
            catch (err) {
                throw err;
            }
        });
    }
    //LOGOUT
    signOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authToken = req.header("Authorization");
                const secret = constant_1.APP_CONFIG.jwt_secret;
                if (!authToken) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const decodedToken = jsonwebtoken_1.default.verify(authToken, secret);
                const userId = decodedToken._id;
                // Clear user session in Redis
                redis_1.client.del(`user:${userId}`);
                res.status(200).json({ message: "Logout successful" });
            }
            catch (err) {
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
}
exports.userController = new UserController();
