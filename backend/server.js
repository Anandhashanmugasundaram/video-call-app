import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import {db} from './configs/mongodbConfig.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.routes.js'
import chatRoutes from './routes/chat.routes.js'
import path from 'path'
dotenv.config()
const app = express()
await db();



//middleware
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true, //allow frontend to send cookies
}))
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT
const __dirname = path.resolve()

try {
  console.log("Registering auth routes...");
  app.use("/api/auth", authRoutes);

  console.log("Registering user routes...");
  app.use("/api/user", userRoutes);

  console.log("Registering chat routes...");
  app.use("/api/chat", chatRoutes);

  console.log("All routes registered.");
} catch (err) {
  console.error("❌ Error while registering routes:", err);
}


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port,() => {
console.log(`server running in port ${port}`);

})