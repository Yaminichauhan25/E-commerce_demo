"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = require("../controller/address.controller");
const router = (0, express_1.Router)();
router.post('/addAddress', address_controller_1.addressController.AddAddressToCustomer);
router.delete('/removeAddress/:id', address_controller_1.addressController.removeAddress);
router.put('/updateAddress/:id', address_controller_1.addressController.updateAddress);
exports.default = router;
