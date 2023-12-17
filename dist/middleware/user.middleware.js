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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../constants/constant");
const redis_1 = require("../services/database/redis");
function verifytoken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const secret = constant_1.APP_CONFIG.jwt_secret;
            const token = req.headers.authorization;
            if (!token) {
                res.status(400).json("Token required for login");
            }
            else {
                let data = jsonwebtoken_1.default.verify(token, secret);
                req.body.token = data._id;
                const userId = data._id;
                const checkSession = yield redis_1.client.hget(`user:${userId}`, '_id');
                if (!checkSession) {
                    return res.status(400).json("Invalid session. Please log in again.");
                }
                next();
            }
        }
        catch (err) {
            res.status(400).json("Invalid token login again");
        }
    });
}
exports.default = verifytoken;
