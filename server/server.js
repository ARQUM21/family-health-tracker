import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import memberRouter from "./routes/memberRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import reportRouter from "./routes/reportRoutes.js";
import vitalsRouter from "./routes/vitalsRoutes.js";
import aiRouter from "./routes/aiRoutes.js";


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter); 
app.use('/api/member', memberRouter);
app.use('/api/report', reportRouter); 
app.use('/api/vitals', vitalsRouter);
app.use('/api/ai', aiRouter);

app.get("/", (req, res) => {
  res.send("HealthMate Backend Chal Raha Hai! 🚀");
});

app.listen(port, () => console.log('Server Started', port))

export default app
