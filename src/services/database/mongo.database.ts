import mongoose from "mongoose";
import { APP_CONFIG } from "../../constants/constant";
const dbConnection = <string>APP_CONFIG.dbConnection
const createConnection = con().catch((err) => console.log("database error"));
async function con(): Promise<void> {
  try {
    await mongoose.connect(dbConnection);
    mongoose.set("debug", true); //Enables Mongoose debugging, which will log database operations to the console. Useful for development and debugging purposes.
    console.log("Database Connect");
  } catch (err) {
    throw err;
  }
}

export default createConnection;
