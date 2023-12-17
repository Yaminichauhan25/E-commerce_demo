"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
// Create a Redis client
exports.client = new ioredis_1.default({
    host: "127.0.0.1", // Redis server host
    port: 6379, // Redis server port
});
// Test the connection
exports.client.on("connect", () => {
    console.log("Connected to Redis server");
});
const RedisStore = require("connect-redis").default;
const sessionMiddleware = (0, express_session_1.default)({
    store: new RedisStore({ client: exports.client }),
    secret: 'yamini25',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        // maxAge: 1000 * 60 * 60 * 24 // 1 day
        maxAge: 60 * 1000,
    }
});
// console.log(sessionMiddleware(),"-------------------")
exports.default = sessionMiddleware;
