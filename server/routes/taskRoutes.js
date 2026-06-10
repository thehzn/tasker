const express = require("express");
const { addTask, getAllTasks, updateTask, toggleTaskStatus, deleteTask, getsingletask } = require("../controllers/taskController");
const { userAuthenticate } = require("../middleware/auth");

const router = express.Router();
  router.route("/add").post(userAuthenticate,addTask);
   router.route("/getall").get(userAuthenticate,getAllTasks);

  router.route("/:id")
  .get(getsingletask)
  .put(userAuthenticate, updateTask)
  .delete(userAuthenticate, deleteTask);        
router.route('/:id/toggle').patch(userAuthenticate,toggleTaskStatus);






module.exports= router;