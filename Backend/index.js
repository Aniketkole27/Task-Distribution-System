import dotenv from "dotenv"
import express from 'express'

const app = express()
dotenv.config()
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("<h1>Next handle kar, Darsha</h1>")
})

app.listen(port, () => {
    console.log("Sever listening on port 8000")
})