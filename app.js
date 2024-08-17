const express = require("express");
const cors = requirer("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
const db = require("./db");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const passport = require("./auth/localAuth");
const {jwtVerify,generateToken,conditionalJwt}=require("./auth/jwtAuth");

passport.initialize();


const taskRoute= require("./routes/taskRoutes");
const userRoute = require("./routes/userRoutes");
app.use(bodyParser.json());


// app.use("/tasks",passport.authenticate('local',{session:false}),taskRoute);
app.use("/tasks",jwtVerify,taskRoute);

app.use("/users",userRoute);
app.listen(PORT,()=>{
    console.log(`\nserver started at port ${PORT}`);
   
})
