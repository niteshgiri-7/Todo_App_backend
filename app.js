const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const db = require("./db");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const taskRoute= require("./routes/taskRoutes");

app.use(bodyParser.json());


app.use("/tasks",taskRoute);


app.listen(PORT,()=>{
    console.log(`\nserver started at port ${PORT}`);
   
})