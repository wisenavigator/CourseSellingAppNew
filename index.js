const express = require('express');
const {userRouter} = require("./routes/userRouter")
const {courseRouter} = require("./routes/courseRoutes")

const jwt = require('jsonwebtoken');

const {mongoose} = require("mongoose");

const app = new express();
app.use(express.json());

app.use(userRouter,"/user")
app.use(courseRouter,"/course")

const JWT_SECRET = "P@ssw0rd";

mongoose.connect("mongodb+srv://xxtremezz00:%3Cdb_password%3E@cluster0.mfk4w.mongodb.net/courseApp")



app.listen(3000, console.log("server listening on port 3000"))