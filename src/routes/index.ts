import { Router } from "express";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import cartRoutes from "./cart.routes";
import wishlistRoutes from "./wishlist.routes";
const router: Router = Router();
router.use("/", productRoutes, userRoutes, cartRoutes, wishlistRoutes);
export default router;