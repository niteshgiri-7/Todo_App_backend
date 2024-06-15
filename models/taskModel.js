const mongoose = require("mongoose");
const schema = mongoose.Schema;

const taskSchema = new schema ({
title:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true
},
createdAt:{
      type:Date,
      default:Date.now()
}
})

const task = mongoose.model("task",taskSchema);

module.exports = task;