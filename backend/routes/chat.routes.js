import express from 'express'
import { protectRoute } from '../middleware/auth.midddleware.js'
import { getStreamToken } from '../controllers/chat.controllers.js'
const router = express.Router()

router.get("/token", protectRoute,getStreamToken)

export default router