import { userController } from "../controller/user.controller";
import { Router } from "express";
import verifytoken from "../middleware/user.middleware";
import requireLogin from "../middleware/user.middleware";
const router = Router();
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/forgotpassword", verifytoken,userController.forgetPassword);
router.post("/resetPassword", verifytoken,userController.ResetPassword);
router.get('/getProfile',verifytoken,userController.getProfile)
router.post("/logout", verifytoken,userController.signOut);
router.put('/updateProfile/:id',verifytoken,userController.updateProfile)
export default router;