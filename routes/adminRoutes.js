const {Router} = require('express');
const {adminModel} = require("../db")

const adminRouter = new Router();

adminRouter.get("/",(req,res)=>{

})

adminRouter.post("/signup",(req,res)=>{

})

adminRouter.post("/login",(req,res)=>{

})

module.exports = {
    adminRouter: adminRouter
}