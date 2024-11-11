import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDb");
    });
    connection.on("error", (err) => {
      console.log("error:", err);
      process.exit();
    });
  } catch (error) {
    console.log(
      "Something went Wrong while conncting MongoDb to server and the error is :",
      error
    );
  }
};
