const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const userSchema = new schema ({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        // required:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        trim: true,
        lowercase: true,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.pre('save',async function(next){
    const user = this;
    //jaba pw modified huncha taba matra hashing necessary cha
    if(!user.isModified('password')){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);//10 represents rounds(more round more secure,though complexity increases)
        const hashedPassword = await bcrypt.hash(user.password,salt);
        user.password = hashedPassword;
        next();
    }
    catch(err){
        next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
         const isPwMatch = await bcrypt.compare(candidatePassword,this.password);
         return isPwMatch;
    }
    catch(err){
        throw err;
    }
}
const user = mongoose.model("user",userSchema);

module.exports=user;
