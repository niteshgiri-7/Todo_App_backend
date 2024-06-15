const mongoose = require("mongoose");

// const mongoUrl = 'mongodb://localhost:27017/tasks';
const mongoUrl ='mongodb+srv://admin:AdminNitesh@cluster0.pxpbmhn.mongodb.net/'

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

//export the connection

module.exports = db;
