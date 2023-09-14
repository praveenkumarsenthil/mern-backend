const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User =require('../model/userModel')


const registerUser = asyncHandler(async(req,res) =>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({message:"Please Enter All fields"})
    }

    const userexists = await User.findOne({email})

    if(userexists){
        res.status(400).json({message:"User Already Exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hassedPassword = await bcrypt.hash(password,salt)
    
    const user = await User.create({
        name,
        email,
        password:hassedPassword,
    })

    if(user){
        res.status(200).json({
            id:user.id,
            name:user.name,
            email:user.email,
            token:generateJWT(user.id),
        })
    }else{
        res.status(400).json({message:"Invalid User Data"})
    }


})


const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            id:user.id,
            name:user.name,
            email:user.email,
            token:generateJWT(user.id),
        })
    }else {
        res.status(400).json('Invalid Credentials')
    }
})

const userFetched = asyncHandler(async(req,res) =>{
    const {id,name,email} = await User.findById(req.user.id)

    res.status(200).json({
        id,
        name,
        email,
    })
    
})

const generateJWT = (id) =>{
    return jwt.sign({id},process.env.JWT_TOKEN,{
        expiresIn:"30d"
    })
};
         

module.exports={
    registerUser,
    loginUser,
    userFetched,
}