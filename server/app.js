import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connect.js";
import authRouter from "./routes/auth.js";
import hotelRouter from "./routes/hotels.js";
import userRouter from "./routes/users.js";
import roomRouter from "./routes/rooms.js";

const app = express();
dotenv.config();

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/users", userRouter);
app.use("/api/rooms", roomRouter);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log("server is running");
  } catch (err) {
    console.log("error at running server: ", err.message);
  }
});
