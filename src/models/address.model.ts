import mongoose, { model } from "mongoose";

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  mobileNumber:{
    type:String,
    required:true
  },
  pinCode:{
    type:Number,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  addressType:{
    type:String,
    enum: ["home", "work"], // Enum validation for allowed values
    required:true
  },
  makeDefaultAddress: {
    type: Boolean,
    default: false,
    required:true // Set default value to false if not provided
  },
});
const addressModel=model('addressDetails' ,addressSchema)
export default addressModel
