const {Router} = require(express);

const courseRouter = new Router();

//get list of courses
courseRouter.get("/",(req,res)=>{
    
})


//Details on a course
courseRouter.get("/:Id",(req,res)=>{
    
})


module.exports ={
    courseRouter: courseRouter
}