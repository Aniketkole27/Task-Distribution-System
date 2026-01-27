import express from "express";
import "dotenv/config";
import cors from 'cors';
import {db} from  "./src/Models/database.js"
import { authRoute } from "./src/Routes/AuthRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

db();

app.use("/api",authRoute);

app.listen(process.env.port,()=>{
  console.log("Sever started on port "+process.env.port);
})