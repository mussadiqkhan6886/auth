import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please Provide Username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please Provide Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Provide Password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpire: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User