const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const workoutRoutes = require("./routes/workoutRoutes");

dotenv.config(); 
connectDB();
app.use(express.json());

app.use("/api/users",userRoutes);
app.use("/api/workouts",workoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Port is listening to ${PORT}`));