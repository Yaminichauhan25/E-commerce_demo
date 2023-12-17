
import express from "express";
import createConnection from "./services/database/mongo.database";
import sessionMiddleware from "./services/database/redis";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import {options} from "./swagger/swagger.options";
import path from "path";
import router from "./routes";
import { APP_CONFIG,constants } from "./constants/constant";

// Establish MongoDB connection
createConnection;

const app = express();
const port = APP_CONFIG.port;
// Apply middleware
app.use(sessionMiddleware);
app.use(express.json()); // for parsing application/json , It's necessary when dealing with JSON data sent in the request payload.
app.use(express.urlencoded({ extended: true }));//This line adds middleware to parse URL-encoded data in the request body. It's commonly used when processing form submissions.
app.use(express.static(path.join(__dirname, "src/public")));//This is useful for serving uploaded files.
app.use("/", router);
const swaggerSpec: object = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
app.listen(port, () => {
  console.log(constants.message.serverRunning + " " + `${port}`);
});
