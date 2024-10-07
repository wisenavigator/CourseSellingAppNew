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
        reference: "admin",
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
        reference: "course",
        type: ObjectId
    }

})

const userModel = mongoose.model("users", userSchema)
const adminModel = mongoose.model("admin", adminSchema)
const courseModel = mongoose.model ("course",courseSchema)
const purchaseModel = mongoose.model("purchase",purchaseSchema)


module.exports = {
    userModel: userModel,
    adminModel: adminModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
}