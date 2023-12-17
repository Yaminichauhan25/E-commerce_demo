import mongoose, { model } from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  code: {
   type: Number,
  },
  phoneNumber: {
    type: String,
  },
});
const otpModel = model("optDetails", otpSchema);
export default otpModel;
