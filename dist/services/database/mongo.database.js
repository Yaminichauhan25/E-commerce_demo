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
const mongoose_1 = __importDefault(require("mongoose"));
const constant_1 = require("../../constants/constant");
const dbConnection = constant_1.APP_CONFIG.dbConnection;
const createConnection = con().catch((err) => console.log("database error"));
function con() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(dbConnection);
            mongoose_1.default.set("debug", true); //Enables Mongoose debugging, which will log database operations to the console. Useful for development and debugging purposes.
            console.log("Database Connect");
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = createConnection;
