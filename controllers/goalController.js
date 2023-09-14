const asyncHandler = require("express-async-handler")
const Goal = require('../model/goalModel')
const User = require('../model/userModel') 

const getGoals = asyncHandler(async(req,res)=>{
    const goals = await Goal.find({user:req.user.id})
    res.status(201).json(goals)
})

const setGoals = asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400).json({errMsg:"Empty Text Message"})
    }
    const goal = await Goal.create(
        {
            text:req.body.text,
            user:req.user.id,
        }
    )
    res.status(201).json(goal)
})


const putGoals = asyncHandler(async(req,res)=>{
    
     const goal = await Goal.findById(req.params.id)
     console.log("The goal",req.body)

     if(!goal){
        res.status(400)
        throw new Error("No Goal")
     }

     const user = await User.findById(req.user.id)

     if(!user){
        res.status(401).json('User Not found')
     }


     if(goal.user.toString() !== user.id){
        res.status(401).json('User Not Authorized')
     }

     const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
     })

    res.status(201).json(updatedGoal)
})


const deleteGoals = asyncHandler(async(req,res)=>{
    const goal = await Goal.findByIdAndDelete(req.params.id)
     console.log("The goal",req.body)

     if(!goal){
        res.status(400)
        throw new Error("No Goal Id")
     }
     
     const user = await User.findById(req.user.id)

     if(!user){
        res.status(401).json('User Not found')
     }


     if(goal.user.toString() !== user.id){
        res.status(401).json('User Not Authorized')
     }

    
    res.status(201).json({id:req.params.id})
}) 


module.exports={
    getGoals,
    setGoals,
    putGoals,
    deleteGoals
}
