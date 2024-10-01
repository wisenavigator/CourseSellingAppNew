const {Router} = require(express);

const userRouter = new Router();

//User Signup
userRouter.post("/user/signup",(req,res)=>{
    

})

//User login
userRouter.post("/user/login",(req,res)=>{
    
})

module.exports = {
    userRouter: userRouter
}
