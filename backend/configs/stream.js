import {StreamChat} from "stream-chat"
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY
const apiSecretKey = process.env.STREAM_SECRET_KEY

if(!apiKey || !apiSecretKey) {
    console.error("Stream api or secret key missing")
} 

const streamClient = StreamChat.getInstance(apiKey,apiSecretKey)
//insert or create + update = upsert

export const upsertStreamUser = async(userData) => {
    try {
        await streamClient.upsertUsers([userData])
        return userData
    } catch (error) {
        console.error("error upserting User",error)
    }
}

export const generateStreamToken =async(userId) => {
    try {
        const userIdString = userId.toString()
        return streamClient.createToken(userIdString)
    } catch (error) {
        console.error("error generateStreamToken",error)
    }
}