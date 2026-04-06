import express from "express";
import "dotenv/config";
import cors from 'cors';
import { db } from "./src/database.js"
import { authRoute } from "./src/Routes/AuthRoutes.js";
import { todoRoutes } from "./src/Routes/TodoRoutes.js";
import { projectRoutes } from "./src/Routes/ProjectRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
db();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
})
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/todos", todoRoutes);
app.use("/api/project", projectRoutes);

app.listen(process.env.PORT, () => {
  console.log("Sever started on port ", process.env.PORT);
})