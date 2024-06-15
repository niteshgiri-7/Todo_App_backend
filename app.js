const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const db = require("./db");
const taskRoute= require("./routes/taskRoutes");
const port = 3000;

app.use(bodyParser.json());


app.use("/tasks",taskRoute);


app.listen(port,()=>{
    console.log(`\nserver started at port ${port}`);
})