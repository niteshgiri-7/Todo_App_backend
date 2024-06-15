const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const schema = mongoose.Schema;

const userSchema = new schema ({
    username:{
        type:string,
        required:true
    },
    email:{
        type:string,
        required:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        trim: true,
        lowercase: true
    }
})

userSchema.plugin(passportLocalMongoose);

const user = mongoose.model("user",userSchema);

module.exports=user;