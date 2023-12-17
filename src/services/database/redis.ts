import session from "express-session";
import Redis from "ioredis";


// Create a Redis client
export const client = new Redis({
  host: "127.0.0.1", // Redis server host
  port: 6379, // Redis server port
});

// Test the connection
client.on("connect", () => {
  console.log("Connected to Redis server");
});
const RedisStore = require("connect-redis").default;
const sessionMiddleware = session({
  store: new RedisStore({ client }),
  secret: 'yamini25',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    // maxAge: 1000 * 60 * 60 * 24 // 1 day
    maxAge:60 * 1000,
  }
});
// console.log(sessionMiddleware(),"-------------------")
export default sessionMiddleware