const Task = require("../models/taskSchema");


exports.addTask= async(req,res)=>{
    try{
const {title,description} = req.body;
if(!title || !description){
    return res.status(400).json({
        message:"enter full details",
        success:false
    });
}
const newtask = await Task.create({title,description,userId: req.userId });
res.status(201).json({
    message:"task added successfully",
    success:true,
    addedTask:newtask,
});
    }
    catch(error){
   return res.status(500).json({
    message:error.message,
    success:false,
   })
    }
}

exports.getAllTasks=async(req,res)=>{
    try{
        const { search, isCompleted, page = 1, limit = 10 } = req.query;
        const query = {userId:req.userId};
        if(search){
            query.$or=[
                {title:{$regex:search,$options:'i'}},
                {description:{$regex:search,$options:'i'}},
            ]
        }
        if(isCompleted !==undefined && isCompleted!==''){
            query.isCompleted=isCompleted==='true'
        }
        const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;
     const [tasks, total] = await Promise.all([
      Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Task.countDocuments(query),
    ]);

    res.json({
      success: true,
      tasks,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Search/filter error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tasks' });
  }


    
}

exports.deleteTask= async(req,res)=>{
    try{
        const {id}=req.params;

const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task missing",
                success: false
            });
        }
res.status(200).json({
    message:"task deleted successfully",
    success:true,
    deletedtask,
});
    }
    catch(error){
   return res.status(500).json({
    message:error.message,
    success:false,
   })
    }
}



exports.getsingletask= async(req,res)=>{
    try{

        const {id} = req.params;

const task = await Task.findById(id);
console.log(task);
if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: "Task not found" 
            });
        }

res.status(200).json({
    message:" task fetched successfully",
    success:true,
    task,
});
    }
    catch(error){
   return res.status(500).json({
    message:error.message,
    success:false,
   })
    }
}
exports.updateTask=async(req,res)=>{
    try{
        const {id}=req.params;
        
        const task = await Task.findById(id); 
        if(!task){
             return res.status(404).json({ success: false, message: 'Task not found' });
        }
        const updates={};
        const {title,description,isCompleted}=req.body;
        if(title)updates.title=title;
        if(description)updates.description=description;
        if (isCompleted !== undefined) updates.isCompleted = isCompleted;
        const updatedTask=await Task.findByIdAndUpdate(id,updates,{new:true,runValidators:true});
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task:updatedTask});
    }
       catch(error){
   return res.status(500).json({
    message:error.message,
    success:false,
   })
    }
};

exports.toggleTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        
        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
