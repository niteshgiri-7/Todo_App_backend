const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const user = require("../models/userModel");
const bcrypt = require("bcryptjs");


passport.use(new LocalStrategy(async(Username,password,done)=>{
    try{
        const userHere = await user.findOne({username:Username});
        if(!userHere){
            console.log("username not found")
            return done(null,false,{message:"user not found"});
        }
        else{
            const isPwMatch = await userHere.comparePassword(password);
            if(isPwMatch){
                return done(null,true,{message:"login successful"});
            }
            else{
                return done(null,false,{message:"incorrect password"});
            }
        }
    }
    catch(err){
        console.log("error occured: ",err);
        return done(err)
    }
}))
module.exports = passport;