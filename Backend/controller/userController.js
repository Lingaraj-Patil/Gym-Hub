const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler"); 

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
}

const registerUser = asyncHandler(async(req,res) => {
    const { name,email,password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"Please fill in the details"})
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already Exists"});
    }

    const user = await User.create({name,email,password});
    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } 
    else{
        res.status(401).json({message:"Invalid user data!"});
    }
});

const loginUser = asyncHandler(async(req,res) => {
    const { password,email } = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }
    else{
        return res.status(400).json({message: "Invalid password or email"})
    }
});

module.exports = { registerUser,loginUser };
