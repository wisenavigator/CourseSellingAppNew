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


//Edit a course
courseRouter.post("/:id",verifyToken, async (req,res)=>{
    const  {title, description, price, imageUrl} = req.body;
    const courseId = req.params.id;

    const course = await courseModel.findById(courseId);
    const creatorId = course.creatorId;


    if(toString(creatorId) == toString(req.adminId)){

        const updatedCourse = {
            title: title?title : course.title,
            description: description? description: course.description,
            price: price? parseInt(price): course.price,
            imageUrl: imageUrl? imageUrl: course.imageUrl
        }
        // const newCourse = await courseModel.findByIdAndUpdate(courseId,{title,description,price, imageUrl},{returnDocument:"after"})
        const newCourse = await courseModel.findByIdAndUpdate(courseId,updatedCourse,{returnDocument:"after"})
        
        return res.status(200).json({
            message: "Course update succesfully",
            course: newCourse
        })
    }
    else{
        return res.status(403).json({message: "You are not authorized to edit this course"})
    }

})

module.exports ={
    courseRouter: courseRouter
}