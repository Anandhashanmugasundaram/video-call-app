import express from "express"
import { protectRoute } from "../middleware/auth.midddleware.js"
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutGoingRequest, getRecommendedUsers, sendFriendRequest } from "../controllers/user.controllers.js"
const router = express.Router()

//aplly to all
router.use(protectRoute)

router.get("/",getRecommendedUsers)
router.get("/friends",getMyFriends)
router.post("/friend-request/:id",sendFriendRequest)
router.put("/friend-request/:id/accept",acceptFriendRequest)
router.get("/friend-request",getFriendRequest)
router.get("/outgoing-friend-request",getOutGoingRequest)


export default router