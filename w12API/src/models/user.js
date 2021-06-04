const mongoose= require("mongoose");
const validator = require("validator");

const signupSchema = new mongoose.Schema({
    Fullname:{
        type:String,
        required:true,
        minlength:3
    },
    Email:{
        type:String,
        required:true,
        unique:[true,"Email id already present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        },
        minlength:3
    },
    Phone:{
        type:Number,
        required:true,
        required:true,
        unique:true
    },
    password:{
            type:String,
            required:true,
            minlength:3
        },
        Cpassword:{
            type:String,
            required:true,
            minlength:3
        },

    
})


const User = new mongoose.model('Signup',signupSchema);

module.exports = User;