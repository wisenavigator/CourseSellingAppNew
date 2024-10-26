const { Router } = require("express");
const { userModel, courseModel } = require("../db");
const bcrypt = require("bcrypt");
const { userAuth, verifyUser } = require("../auth/userAuth");
const jwt = require("jsonwebtoken");
const { mongoose, mongo } = require("mongoose");

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

const userRouter = new Router();

//User Signup
userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const user = await userModel.findOne({ email: email });

  if (user) {
    res.status(401).json({
      message: "user already exisits",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    res.status(200).json({
      message: "User created successfully",
    });
  }
});

//User login
userRouter.post("/login", userAuth, (req, res) => {
  //This triggers after userAuth Middleware
  if (req.userId) {
    res.status(200).json({
      token: jwt.sign({ id: req.userId }, JWT_USER_SECRET),
    });
  } else {
    res.status(401).json({
      message: "Incorrect Credentials!",
    });
  }
});

//Get courses available for purchase
userRouter.get("/courses", async (req, res) => {
  const courses = await courseModel.find();
  res.status(200).json({
    courses,
  });
});

// Checks if the course is already purhcased
// async function verifyCoursePurchase(userId, courseId) {
//   const user = await userModel.findById(userId);

//   const courseFound = user.purchasedCourses.find((course) => {
//     return course.courseId.toString() == courseId;
//   });
//   if (courseFound) {
//     console.log("Verify Purhcase function ", courseFound);
//     return courseFound;
//   } else {
//     return null;
//   }
// }

// async function verifyCoursePurchase(userId, courseId){
//     const user = await userModel.findOne({
//         _id: userId,
//         purchasedCourses: {
//             $elemMatch:{
//                 courseId: courseId
//             }
//         }
//     })
//     return user? user.purchasedCourses[0]: null
// }

async function verifyCoursePurchase(userId, courseId){
    const courseIdObject = new mongoose.Types.ObjectId(courseId)

    const updatedUser = await userModel.findOneAndUpdate(
        {_id: userId, "purchasedCourses.courseId": {$ne: courseIdObject}},
        {
            $addToSet:{
                purchasedCourses: {
                    courseId: courseIdObject,
                    timeStamp: Date.now()
                }
            }
        }
    )
    console.log("Updated User ", updatedUser)
    return updatedUser;
}
//Add a

//Purchase a course
// userRouter.post("/courses/:courseId", verifyUser, async (req, res) => {
//   const courseId = req.params.courseId;

//   const course = await courseModel.findById(courseId);

//   if (course) {
//     const userId = req.userId;
//     const courseAlreadyPurchased = await verifyCoursePurchase(userId, courseId);

//     console.log("Course already purchased ", courseAlreadyPurchased);

//     if (courseAlreadyPurchased) {
//       return res.status(400).json({
//         message: "Course already purchased",
//       });
//     }
//     else 
//     {
//       const user = await userModel.findByIdAndUpdate(userId, {
//         $push: {
//           purchasedCourses: {
//             courseId: new mongoose.Types.ObjectId(courseId),
//           },
//           timeStamp: Date.now(),
//         },
//       });
//       res.status(200).json({
//         message: "Course purhcased successfully",
//         user: await userModel.findById(userId),
//       });
//     }
//   } 
//   else 
//   {
//     res.status(404).json({
//       message: "Course not found",
//     });
//   }
// });

userRouter.post("/courses/:courseId", verifyUser, async(req,res)=>{
    
    const courseId = req.params.courseId

    const course = await courseModel.findById(courseId )

    if(!course){
        return res.status(404).message({
            message:" Course Not found!!"
        })
    }

    const userId = req.userId;

    if(await verifyCoursePurchase(userId,courseId)){
        res.status(200).json({
            message: "Course purchased successfully"
        })
    }
    else{
        res.status(400).json({
            message: "Course already purchased"
        })
    }
})

module.exports = {
  userRouter: userRouter,
};
