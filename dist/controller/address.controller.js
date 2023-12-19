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
exports.addressController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const address_model_1 = __importDefault(require("../models/address.model"));
const constant_1 = require("../constants/constant");
//ADD_ADDRESS
class AddressController {
    AddAddressToCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, mobileNumber, pinCode, address, city, state, addressType, makeDefaultAddress } = req.body;
                const customerAddress = yield address_model_1.default.create({
                    name: name,
                    mobileNumber: mobileNumber,
                    pinCode: pinCode,
                    address: address,
                    city: city,
                    state: state,
                    addressType: addressType,
                    makeDefaultAddress: makeDefaultAddress
                });
                res
                    .status(200)
                    .json({ message: constant_1.constants.message.addAddress, data: customerAddress });
            }
            catch (error) {
                res.status(400).json({ data: error });
            }
        });
    }
    //REMOVE_ADDRESS
    removeAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                const product = yield address_model_1.default.deleteOne({ _id });
                res.status(200).json({ data: product });
            }
            catch (error) {
                throw error;
            }
        });
    }
    //UPDATE_ADDRESS
    updateAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addressId = req.params.id; // Assuming you pass the address ID in the URL
                // Ensure the provided ID is a valid ObjectId
                if (!mongoose_1.default.Types.ObjectId.isValid(addressId)) {
                    return res.status(400).json({ error: constant_1.constants.message.invalidIdFormat });
                }
                const { name, mobileNumber, pinCode, address, city, state, addressType, makeDefaultAddress } = req.body;
                const updatedAddress = yield address_model_1.default.findOneAndUpdate({ _id: addressId }, {
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
                }, { new: true });
                if (!updatedAddress) {
                    return res.status(404).json({ error: constant_1.constants.message.addressNotFound });
                }
                res.status(200).json({ message: constant_1.constants.message.addressUpdated, data: updatedAddress });
            }
            catch (error) {
                res.status(500).json({ error: constant_1.constants.message.error });
            }
        });
    }
}
exports.addressController = new AddressController();
