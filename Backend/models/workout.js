const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    name: { type:String, required:true},
    exercises: [{
        exerciseName: { type: String,required: true},
        sets: {type: Number, required:true},
        reps: {type: Number,required:true},
        weight: {type: Number, required: true},
    }],
    notes: {type:String,required:true}
},{timestaps: true});

module.exports = mongoose.model("Workout",workoutSchema);