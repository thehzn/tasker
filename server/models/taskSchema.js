const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        title:{
            type:String,
            required:[true,"task name is required"],
            trim:true,
        },
        description:{
            type:String,
            required:[true,"desc is required"],
            trim:true,
        },
        isCompleted:{
            type:Boolean,
            default:false,
        },
    },
{timestamps:true}
);
module.exports= mongoose.model("Task",taskSchema);