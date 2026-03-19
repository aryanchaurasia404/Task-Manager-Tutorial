import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default:"https://toppng.com/uploads/preview/male-user-filled-icon-man-icon-115533970576b3erfsss1.png",
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user",
    },
},
    {timestamps:true}
)
const User = mongoose.model("User",userSchema)
export default User