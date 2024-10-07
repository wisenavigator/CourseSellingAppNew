const {Router} = require("express");
const {userModel} = require("../db")
const bcrypt = require("bcrypt");
const {userAuth} = require("../auth/userAuth");
const jwt = require("jsonwebtoken");

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;


const userRouter = new Router();

//User Signup
userRouter.post("/signup", async (req,res)=>{
    
    const { email, password, firstName, lastName} = req.body;
    const user = await userModel.findOne({email: email})
    
    

    if(user){
        res.status(401).json({
            message: "user already exisits"
        })
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10)

        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.status(200).json({
            message: "User created successfully"
        })
    }

})

//User login
userRouter.post("/login",userAuth, (req,res)=>{

    //This triggers after userAuth Middleware
    console.log(req.body.userId)
    if(req.body.isPasswordCorrect){
        res.status(200).json({
            token : jwt.sign({id: req.body.userId},JWT_USER_SECRET)
        })
    }
    else{
        res.status(401).json({
            message: "Incorrect Credentials!"
        })
    }
})

module.exports = {
    userRouter: userRouter
}
