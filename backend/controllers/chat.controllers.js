
import { generateStreamToken } from "../configs/stream.js"
const getStreamToken = async(req,res) => {
  try {
      const token = await generateStreamToken(req.user.id)
    res.status(200).json({token})
  } catch (error) {
             console.log("Error in getStreamToken",error)
    res.status(500).json({mssg:"Error in getStreamToken"})
  }
}

export {getStreamToken}

    