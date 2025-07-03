import mongoose from "mongoose";
import { Schema } from "mongoose";

const dataScheme = new Schema({
    title:{
        type: String,
        required: true,
        default: "Untitled",
    },
    description:{
        type: String,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },
})

const userSchema = new Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    data:{
        type: [dataScheme],
        default: [],
    }
});

export default mongoose.model('User', userSchema);