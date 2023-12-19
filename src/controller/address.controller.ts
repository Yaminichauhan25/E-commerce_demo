import mongoose from "mongoose";
import addressModel from "../models/address.model";
import { Request, Response } from "express";
import { constants } from "../constants/constant";

//ADD_ADDRESS
class AddressController {
  async AddAddressToCustomer(req:Request,res:Response) {
    try {
      const { name, mobileNumber, pinCode, address, city, state ,addressType,makeDefaultAddress} = req.body;
      const customerAddress = await addressModel.create({
        name: name,
        mobileNumber: mobileNumber,
        pinCode: pinCode,
        address:address ,
        city: city,
        state: state,
        addressType:addressType,
        makeDefaultAddress:makeDefaultAddress
      });
      res
      .status(200)
      .json({ message:constants.message.addAddress , data: customerAddress });
    } catch (error) {
        res.status(400).json({ data: error });
      }
  }

  //REMOVE_ADDRESS
  async removeAddress(req: Request, res: Response) {
    try {
      const _id = req.params.id;
      const product = await addressModel.deleteOne({ _id });
      res.status(200).json({ data: product });
    } catch (error) {
      throw error;
    }
  }

  //UPDATE_ADDRESS
  async updateAddress(req: Request, res: Response) {
    try {
      const addressId = req.params.id; // Assuming you pass the address ID in the URL
      // Ensure the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(addressId)) {
        return res.status(400).json({ error:constants.message.invalidIdFormat });
      }
      const { name, mobileNumber, pinCode, address, city, state, addressType, makeDefaultAddress } = req.body;
      const updatedAddress = await addressModel.findOneAndUpdate(
        { _id: addressId },
        {
          $set: {
            name,
            mobileNumber,
            pinCode,
            address,
            city,
            state,
            addressType,
            makeDefaultAddress,
          },
        },
        { new: true }
      );
      if (!updatedAddress) {
        return res.status(404).json({ error:constants.message.addressNotFound});
      }
      res.status(200).json({ message: constants.message.addressUpdated, data: updatedAddress });
    } catch (error) {
      res.status(500).json({ error:constants.message.error});
    }
  }
}
export const addressController = new AddressController()
