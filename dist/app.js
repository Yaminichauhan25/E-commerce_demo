"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongo_database_1 = __importDefault(require("./services/database/mongo.database"));
const redis_1 = __importDefault(require("./services/database/redis"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_options_1 = require("./swagger/swagger.options");
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const constant_1 = require("./constants/constant");
// Establish MongoDB connection
mongo_database_1.default;
const app = (0, express_1.default)();
const port = constant_1.APP_CONFIG.port;
// console.log(port)
// Apply middleware
app.use(redis_1.default);
app.use(express_1.default.json()); // for parsing application/json , It's necessary when dealing with JSON data sent in the request payload.
app.use(express_1.default.urlencoded({ extended: true })); //This line adds middleware to parse URL-encoded data in the request body. It's commonly used when processing form submissions.
app.use(express_1.default.static(path_1.default.join(__dirname, "src/public"))); //This is useful for serving uploaded files.
app.use("/", routes_1.default);
const swaggerSpec = (0, swagger_jsdoc_1.default)(swagger_options_1.options);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Start the server
app.listen(port, () => {
    console.log(constant_1.constants.message.serverRunning + " " + `${port}`);
});
