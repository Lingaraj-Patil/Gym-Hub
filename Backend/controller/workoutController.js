const Workout = require("../models/workout");
const asyncHandler = require("express-async-handler");

const createWorkout = asyncHandler(async(req,res)=>{
    const { name,exercises,notes } = req.body;

    if(!name || !exercises || exercises.length === 0){
        return res.status(401).json({message: "Please provide information"});
    }

    const workout = new Workout({
        user: req.user._id,
        name,
        exercises,
        notes
    })

    const createdWorkout = await workout.save();
    res.status(200).json(createdWorkout);
})

const getWorkout = asyncHandler(async(req,res)=>{
    const workouts = await Workout.find({user: req.user._id});
    res.status(200).json({workouts});
})

const updateWorkout = asyncHandler(async(req,res)=>{
    const workout = await Workout.findById(req.params.id);

    if(!workout){
        return res.status(400).json({message:"Workout not found"});
    }
    if(workout.user.toString() !== req.user._id.toString()){
        return res.status(401).json({message:"Unauthorised access"});
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updateWorkout); 
})

const deleteWorkout = asyncHandler(async(req,res)=>{
    const workout = await Workout.findById(req.params.id);

    if(!workout){
        return res.status(400).json({message:"Workout not found"});
    }
    if(workout.user.toString() !== req.user._id.toString()){
        return res.status(401).json({message:"Unauthorised access"});
    }

    await workout.deleteOne();
    res.status(200).json({message:"Workout removed"});
})

module.exports = { createWorkout,updateWorkout,getWorkout,deleteWorkout };

