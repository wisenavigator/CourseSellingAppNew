const {Router} = require('express');
const bcrypt = require("bcrypt");   
const jwt = require('jsonwebtoken');
const {adminModel} = require("../db")

const adminRouter = new Router();
const {adminAuth,verifyToken} = require("../auth/adminAuth")    

const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET

//Get list of Admins
adminRouter.get("",verifyToken,async (req,res)=>{
    const admins = await adminModel.find();
    return res.status(200).json(
        admins)

    })



adminRouter.post("/signup",async (req,res)=>{ 

    const {email, password, firstName, lastName} = req.body;

    const admin = await adminModel.findOne({email: email})

    if(admin){
        return res.status(403).json({
            msg: "Admin already exists"
        })
    }
    else{
        const newAdmin = await adminModel.create({
            email: email,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName
        })

        return res.status(200).json({
            msg: "Admin created successfully",
            newAdmin   
        })
    }

})

adminRouter.post("/login",adminAuth,(req,res)=>{

    const adminId = req.body.adminId;
    return res.status(200).json({
        message: "Admin logged in succesfully",
        token : jwt.sign({id: adminId}, JWT_ADMIN_SECRET)
    })

})

module.exports = {
    adminRouter: adminRouter
}