import mongoose from "mongoose";
let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) {
    return console.log("MONGODB URL IS NOT DEFINED");
  }

  if (isConnected) return console.log("=> using existing database connection");

  try {
    await mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    });
    isConnected = true;
  } catch (error) {
    console.log("Error While Connecting To Mongodb : ", error);
    throw new Error("Failed To Connect To Mongodb " + error.message);
  }
};

export default connectToDB;
