require('dotenv').config();

const express = require('express');
const {userRouter} = require("./routes/userRouter")
const {courseRouter} = require("./routes/courseRoutes")
const {adminRouter} = require("./routes/adminRoutes")
const mongoose = require("mongoose");



const jwt = require('jsonwebtoken');


const app = new express();
app.use(express.json());

app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/admin",adminRouter)

const JWT_SECRET = "P@ssw0rd";
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST

const DB_URI =`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`


async function main(){
    console.log(DB_URI)
    // await mongoose.connect("mongodb+srv://admin:cisco@cluster0.mfk4w.mongodb.net/courseApp")
    await mongoose.connect(DB_URI)
    app.listen(3000, console.log("server listening on port 3000"))

}

main()