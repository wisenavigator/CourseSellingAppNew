const express = require('express');
const { userModel } = require('../db');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {JWT_USER_SECRET} = process.env;



async function userAuth (req,res, next){

    const {email, password} = req.body;

    const user = await userModel.findOne({email: email})

    if(user && await bcrypt.compare(password,user.password)){
        req.isPasswordCorrect = true;
        req.userId = user._id.toString();
        next();

    }
    else{
        res.status(402).json({
            message: "Incorrect credentials"
        })
    }

}

async function verifyUser(req,res,next){
    const token = req.headers.authorization.split(" ")[1]
    let decodedData;
    try{
        decodedData  = await jwt.verify(token, JWT_USER_SECRET)
        if(decodedData.id){
            req.userId = decodedData.id;
            next();
        }
        else{
            res.status(401).json({
                message: "Invalid token. No ID found! "
            })
        }
    }
    catch(e){
        res.status(401).json({
            message: "Invalid token "
        })
    }

}

module.exports ={
    userAuth: userAuth,
    verifyUser: verifyUser
}