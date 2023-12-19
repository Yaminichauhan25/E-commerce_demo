import { Router } from "express";
import { addressController } from "../controller/address.controller";

const router = Router()
router.post('/addAddress',addressController.AddAddressToCustomer)
router.delete('/removeAddress/:id',addressController.removeAddress)
router.put('/updateAddress/:id',addressController.updateAddress)
export default router