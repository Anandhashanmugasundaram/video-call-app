import express from 'express'
const router = express.Router()
import {signUpController,loginController,logoutController, onboardController} from '../controllers/auth.controllers.js'
import { protectRoute } from '../middleware/auth.midddleware.js'

router.post("/signup",signUpController)
router.post("/login",loginController)
router.post("/logout",logoutController)
router.post("/onboard",protectRoute,onboardController)
router.get("/me", protectRoute,(req,res) => {
    res.status(200).json({success:true,user:req.user})
})

export default router