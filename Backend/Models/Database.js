import mongoose from "mongoose";
import 'dotenv/config';

export const db = async() =>{
    try{
        const url_db = process.env.url_db;
        await mongoose.connect(url_db);
        console.log("Database Connected Successfully !!! ")
    }
    catch
    {
         console.log("Check the database connection");
    }
     
}
