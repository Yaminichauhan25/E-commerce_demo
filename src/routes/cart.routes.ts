import {Router} from "express";
import { cartController } from "../controller/cart.controller";
import verifytoken from "../middleware/user.middleware";

const router = Router()
router.post('/addtocart',verifytoken,cartController.CreateAndAddToCart)
router.get('/getCart',verifytoken,cartController.getItems)
router.delete('/deleteProductFromCart/:id',verifytoken,cartController.removeProductFromCart)
router.delete('/deletecart/:id',verifytoken,cartController.removeCartById)
export default router