const express = require("express");
const router = express.Router();
const task = require("../models/taskModel");
const moment = require("moment-timezone")
const mongoose = require("mongoose")
router.post("/",async(req,res)=>{

    try{
        const taskAdded = req.body;
        const newTask = new task(taskAdded);
        
        const response = await newTask.save();
      
      
        console.log("data is saved in the database");
        res.status(200).json(response);
    }
    catch(err){
        console.log("error occured while saving",err);
        res.status(500).send("internal serval error");
    }
})

router.get("/",async(req,res)=>{
    try{
    const allTask = await task.find();
   
    const tasksWithISTDates = allTask.map(task => ({
        _id: task._id,
        title: task.title,
        description: task.description,
        createdAt: moment(task.createdAt).tz('Asia/Kathmandu').format('YYYY-MM-DD HH:mm')
    }));
    res.status(200).json(tasksWithISTDates);
}
catch(err){
    res.status(500).send("internal serval error");
    console.log(err)
}
})

router.get("/:id",async(req,res)=>{
    let {id} = req.params;
    const foundtask = await task.findById(id)
    res.status(200).json(foundtask);
})


router.put("/:id",async(req,res)=>{
    let id =req.params.id;
    const updatedTask = req.body;
    const flagId = mongoose.Types.ObjectId.isValid(id);
    console.log(flagId);
    try{
        if(flagId){
            const taskTobeUpdated = await task.findByIdAndUpdate(id,updatedTask,{
                new:true,
                runValidators:true
            })
           
            if(taskTobeUpdated){
            console.log("task updated succesfully")
            res.status(200).json(taskTobeUpdated);
            }
            else
            res.status(404).send("task not found");
        }
        else{
            throw new Error("invalid ID");
        }
    }
    catch(error){
        res.status(500).send("invalid id");
        console.log(error.message);
    }
})

router.delete("/:id",async(req,res)=>{
    try{
       let id = req.params.id;
       let taskTobeDeleted = await task.findByIdAndDelete(id);
       //no need to return the deleted data
       res.status(200).json(taskTobeDeleted);
       console.log("successfully deleted")
    }
    catch(err){
        console.log("unable to delete");
    }

})
module.exports = router;