const express = require("express");
const router = express.Router();
const task = require("../models/taskModel");
const moment = require("moment-timezone")
const mongoose = require("mongoose");

router.post("/",async(req,res)=>{

    try{
        const taskAdded = req.body;
         taskAdded.owner = req.user.id;
        console.log(req.user.id)
        const newTask = new task(taskAdded);
        console.log(req.user.id);
        const response = await newTask.save();
      
      
        console.log("data is saved in the database");
        res.status(200).json({response:response});
    }
    catch(err){
        console.log("error occured while saving",err);
        res.status(500).send("internal serval error");
    }
})

router.get("/",async(req,res)=>{
    try{
        const owner = req.user.id;
        console.log(req.user.id)
    const allTask = await task.find({owner:owner}).populate('owner');
   
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
      const {id}=req.params;
      const taskTobeDeleted = await task.findById(id);
      const ownerId = taskTobeDeleted.owner.toString();
      const reqUserId = req.user.id;
      console.log(reqUserId);
      console.log(ownerId)
      if(ownerId!==reqUserId){
        return res.status(501).json({error:"unable to delete"});
      }
      await taskTobeDeleted.deleteOne();
      res.status(200).json({message:"task deleted"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
})
module.exports = router;