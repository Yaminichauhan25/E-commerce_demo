import mongoose, { model } from "mongoose";
import { UserInterface } from "../interface/user.interface";

const userSchema = new mongoose.Schema<UserInterface>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true
    },

    phoneNumber: {
      type: String,
      required: false,
    },
    devices: [{ type: String }], // Array to store device IDs
  },
  { timestamps: true }
);

const userModel = model<UserInterface>("userDetails", userSchema);
export default userModel;
