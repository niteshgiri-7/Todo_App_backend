const mongoose = require("mongoose");
require('dotenv').config();


// const mongoUrl = process.env.DB_URL;
const mongoUrl =process.env.DB_LOCAL_URL;
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology:true
});

const db = mongoose.connection;//db is an object representing database connection

db.on('connected',()=>{
    console.log("connected to database server\n");
})
db.on('error',()=>{
    console.log("unable to connect to database server");
})
db.on('disconnected',()=>{
    console.log("database server disconnected");
})
console.log(process.env)
//export the connection

module.exports = db;
