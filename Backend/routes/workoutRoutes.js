const express = require("express");
const { createWorkout, updateWorkout, getWorkout, deleteWorkout } = require("../controller/workoutController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");


router.post("/",protect,createWorkout);
router.get("/:id",protect,getWorkout);
router.put("/:id",protect,updateWorkout);
router.delete("/:id",protect,deleteWorkout);

module.exports = router;