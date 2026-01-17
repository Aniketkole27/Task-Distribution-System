import express from "express";
import "dotenv/config";
import cors from 'cors';
import {db} from  "./Models/Database.js"

const app = express();

app.use(cors());
app.use(express.json());

db();
