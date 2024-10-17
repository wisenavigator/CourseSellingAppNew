const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;



const userSchema = new Schema ({
    email : {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String

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
        reference: "admins",
        type: ObjectId
    },
    imageUrl: String

})

const purchaseSchema = new Schema ({
    userId : {
        reference: "users",
        type: ObjectId
    },
    courseId : {
        reference: "courses",
        type: ObjectId
    }

})

const userModel = mongoose.model("users", userSchema)
const adminModel = mongoose.model("admins", adminSchema)
const courseModel = mongoose.model ("courses",courseSchema)
const purchaseModel = mongoose.model("purchases",purchaseSchema)


module.exports = {
    userModel: userModel,
    adminModel: adminModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
}