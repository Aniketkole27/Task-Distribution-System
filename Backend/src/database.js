import mongoose from "mongoose";
import 'dotenv/config';


export const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected !");
    } catch (error) {
        console.log("Something went wrong with database connection !", error);
    }
}
