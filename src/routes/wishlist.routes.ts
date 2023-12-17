import {Router} from "express";
import WishlistController from "../controller/wishlist.controller";
import wishlistController from "../controller/wishlist.controller";
const router = Router()
router.post('/addToWishlist',wishlistController.addProductToWishlist)
router.get('/getWishlist',wishlistController.getWishlist)
router.delete('/removeProductFromWishlist/:id',wishlistController.removeProductFromWishlist)
router.delete('/removeWishlist/:id',wishlistController.removeWishlist)
export default router