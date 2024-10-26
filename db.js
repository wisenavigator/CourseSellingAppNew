const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;



const userSchema = new Schema ({
    email : {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    purchasedCourses: [{
        courseId:{
            type: ObjectId, 
            ref: "courses"
        },
        timeStamp:{
            type: Date,
            default: Date.now
        }
    }]
})


const adminSchema =  new Schema ({
    email: { type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
    
})

const courseSchema = new Schema ({
    title: String,
    description: String,
    price: Number,
    creatorId: {
        ref: "admins",
        type: ObjectId
    },
    imageUrl: String

})


const userModel = mongoose.model("users", userSchema)
const adminModel = mongoose.model("admins", adminSchema)
const courseModel = mongoose.model ("courses",courseSchema)


module.exports = {
    userModel: userModel,
    adminModel: adminModel,
    courseModel: courseModel
}