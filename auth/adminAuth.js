const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {adminModel} = require("../db")

const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

async function adminAuth(req,res,next){
    const {email, password}= req.body;

    const admin = await adminModel.findOne({email: email})  

    if(admin && await bcrypt.compare(password, admin.password)){
        req.body.isPasswordCorrect = true;
        req.body.adminId = admin._id.toString();
        next();
    }
    else{
        res.status(403).json({
            message: "incorrect credentials"
        })
        
    }
}

async function verifyToken(req,res,next){
    const token = req.headers.token;
    let decodedData
    if(token){

        try{
            decodedData = await jwt.verify(token,JWT_ADMIN_SECRET)
        }
        catch(e){
            return res.status(403).json({message: "invalid JSON Token"})
        }
        if(decodedData){
            const admin = await adminModel.findById(decodedData.id)
            req.adminId = admin._id;
            console.log("Admin ID", req.adminId)
            next();
            
            
        }
    }
}


module.exports={
    adminAuth,
    verifyToken
}