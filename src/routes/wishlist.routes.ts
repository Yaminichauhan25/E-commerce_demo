import {Router} from "express";
import WishlistController from "../controller/wishlist.controller";
import wishlistController from "../controller/wishlist.controller";
import verifytoken from "../middleware/user.middleware";
const router = Router()
router.post('/addToWishlist',verifytoken,wishlistController.addProductToWishlist)
router.get('/getWishlist',verifytoken,wishlistController.getWishlistData)
router.delete('/removeProductFromWishlist/:id',verifytoken,wishlistController.removeProductFromWishlist)
router.delete('/removeWishlist/:id',verifytoken,wishlistController.removeWishlist)
export default router