import User from "../models/user.models.js"
import Friend from "../models/friendRequest.models.js"

const getRecommendedUsers = async(req,res) => {
    try {
        const currentUserId = req.user.id
        const currentUser = await User.findById(currentUserId)
        const recommendedUsers = await User.find({
            $and:[
                {_id:{$ne:currentUserId}},
                {_id:{$nin:currentUser.friends}},
                {isOnboarded:true}
            ]
        })
        res.status(200).json(recommendedUsers);

        } catch (error) {
          console.log("Error in getting recommended user",error)
    res.status(500).json({mssg:"Error in getting recommended user"})
    }
}

const getMyFriends = async(req,res) => {
    try {
        const currentUserId = req.user.id
    const currentUser = await User.findById(currentUserId).select("friends")
    .populate("friends", "fullName nativeLanguage learningLanguage profilePic")
    res.status(200).json(currentUser.friends)
    } catch (error) {
         console.log("Error in getting friends",error)
    res.status(500).json({mssg:"Error in getting friends"})
    }
}

const sendFriendRequest= async(req,res) => {
  try {
      const myId = req.user.id
    const {id:recipientId} = req.params

    if(myId === recipientId){
       return res.status(400).json({mmsg:"you can't send a friend request to yourself"});

    }

    const isRecipientExist = await User.findById(recipientId)
    if(!isRecipientExist){
          return res.status(400).json({mmsg:"Recipient not found"})
    }

    if(isRecipientExist.friends.includes(myId)){
                  return res.status(400).json({mmsg:"You are already friends with this user"})
    }

    const existingRequest = await Friend.findOne({
        $or:[
            {sender:myId,recipient:recipientId},
            {sender:recipientId,recipient:myId}
        ]
    })

    if(existingRequest) {
           return res.status(400).json({mssg:"You can't send friend req to yourself"});

    }
    const newFriendRequest = await Friend.create({
        sender:myId,
        recipient:recipientId
    })

    res.status(200).json(newFriendRequest)

  } catch (error) {
           console.log("Error in friendReq",error)
    res.status(500).json({mssg:"Error in friendReq"})
    }
}

const acceptFriendRequest = async(req,res) => {
    try {
       const {id:requestId} =req.params
       const friendRequest = await Friend.findById(requestId)

       if(!friendRequest) {
        return res.status(404).json({mssg:"Friend request not found"})
       }

       if(friendRequest.recipient.toString() !== req.user.id){
          return res.status(404).json({mssg:"Not Authorized to accept this request"})
       }

       friendRequest.status = "accepted"
       await friendRequest.save()

       //add each use to thier arrays

       await User.findByIdAndUpdate(friendRequest.sender ,{
        $addToSet:{friends:friendRequest.recipient}
       })

       await User.findByIdAndUpdate(friendRequest.recipient ,{
        $addToSet:{friends:friendRequest.sender}
       })

       res.status(200).json({mssg:"friend request accepted"})
       
    } catch (error) {
                 console.log("Error in AcceptfriendReq",error)
    res.status(500).json({mssg:"Error in AcceptfriendReq"})
    }
}

const getFriendRequest = async(req,res) => {
    try {
        const incomingRequest = await Friend.find({
            recipient:req.user.id,
            status:"pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage")

        const acceptedRequest = await Friend.find({
            sender:req.user.id,
            status:"accepted",
        }).populate("recipient", "fullName profilePic")

       res.status(200).json({
  incomingRequest,
  acceptedRequest,
});

    } catch (error) {
              console.log("Error in getFriendRequest",error)
    res.status(500).json({mssg:"Error in getFriendRequest"})
    }
}

const getOutGoingRequest = async(req, res)  => {
     try {
    const outgoingRequests = await Friend.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export {getRecommendedUsers,getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequest,getOutGoingRequest}