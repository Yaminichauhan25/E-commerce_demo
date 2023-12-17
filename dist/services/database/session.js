"use strict";
// import session from "express-session";
// import Redis from "ioredis";
// import connectRedis from "connect-redis";
// // Create a Redis client
// const redisClient = new Redis();
// // Use connect-redis to store session data in Redis
// const RedisStore: any = new connectRedis(session as any);
// // Set up session middleware
// export const sessionMiddleware = session({
//   store: new RedisStore({ client: redisClient }) ,
//   secret: process.env.JWT_SECRET ?? "yamini25",
//   resave: false,//: Indicates that the session should not be saved if it wasn't modified during the request. It helps optimize session storage.
//   saveUninitialized: true,//Allows saving sessions for new and unmodified sessions. It ensures that even if the session wasn't modified, it still gets saved.
// });
