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
},
owner:{
    type: schema.Types.ObjectId,
    ref:"user"
}
})

const task = mongoose.model("task",taskSchema);

module.exports = task;