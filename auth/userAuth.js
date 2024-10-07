const express = require('express');
const { userModel } = require('../db');
const bcrypt = require("bcrypt")


async function userAuth (req,res, next){

    const {email, password} = req.body;

    const user = await userModel.findOne({email: email})

    if(user && await bcrypt.compare(password,user.password)){
        req.body.isPasswordCorrect = true;
        req.body.userId = user._id.toString();
        next();

    }
    else{
        res.status(401).json({
            message: "Incorrect credentials"
        })
    }

}

module.exports ={
    userAuth: userAuth
}