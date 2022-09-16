import mongoose from "mongoose";

export const connectDB = async () => {
  return mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("database is connected");
    })
    .catch((err) => {
      console.log("error in connecting database: ", err.message);
    });
};
