import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToDB from "./utils/database.js";
import tourRoute from "./routes/tourRoutes.js";
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";
import reviewRoute from './routes/reviewRoutes.js';
import bookingRoute from './routes/bookingRoutes.js';

dotenv.config();
const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);

const port = process.env.PORT || 5000;

const connect = async () => {
  try {
    await connectToDB();
    app.listen(port, () =>
      console.log(`Connected to MongoDB & Running on Port ${port}`)
    );
  } catch (error) {
    console.log("Error While Connecting To Mongodb");
  }
};

connect();
