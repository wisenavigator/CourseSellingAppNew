const {Router} = require("express");
const {courseModel} = require ("../db");
const { verifyToken } = require("../auth/adminAuth");

const courseRouter = new Router();

//get list of courses
courseRouter.get("/",(req,res)=>{
    
})

//Add a course
courseRouter.post("/create",verifyToken,async (req,res)=>{
    const {title, description, price, imageUrl} = req.body;
    const creatorId = req.adminId;

    const course = await courseModel.create({
        title,description,price: parseInt(price),creatorId,imageUrl
    })

    return res.status(201).json({
        message: "course created successfully",
        course
    })

})

//Details on a course
courseRouter.get("/:id",verifyToken,async (req,res)=>{
    console.log("Param id",req.params.id)
    // const course= await courseModel.findOne({_id: req.params.id})
    const course = await courseModel.findById(req.params.id)
    console.log(course)
    if(course){
        return res.status(200).json(course)
    }
    else{
        return res.status(404).json({message: "Course not found!"})
    }

})


module.exports ={
    courseRouter: courseRouter
}