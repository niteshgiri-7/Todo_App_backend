const express = require("express");
const router = express.Router();
const user = require("../models/userModel");
const {generateToken,jwtVerify} = require("../auth/jwtAuth");
router.post("/signup", async (req, res) => {
    try {
        const userToBeAdded = req.body;
        const newUser = new user(userToBeAdded);
        const response = await newUser.save();

        const payLoad = {
            id:response.id,
            username:response.username
        }
        const token = generateToken(payLoad);
        res.status(200).json({id:response.id,token:token,message:"signup successful"});
        console.log("new user saved")
    }
    catch (err) {
        console.log("unable to save new user");
        console.log(err)
        res.status(400).json({error:"username not availabe,try another username"});
    }
})
router.get("/login",(req,res)=>{
    res.send("login page")
})
router.post("/login",async(req,res)=>{
    try{
    const {username,password} = req.body;
    const User = await user.findOne({username:username});
    if(!User || !(await User.comparePassword(password))){
     return    res.status(401).json({error:"invalid username or password"});
    }
    const payload = {
        id:User.id,
        username:username
    }
    const token = generateToken(payload);
    res.status(200).json({token:token,message:"successful login"});
}
catch(err){
    res.status(500).json({error:"internal server error"});
    console.log(err)
}

})

router.get("/profile",jwtVerify,async(req,res)=>{
    // try{
    console.log(req.user)
    // console.log(req.user)
    // const userData = req.user;
    // const id = userData.id;
    // const User = await user.findById(id);
    // res.status(200).json({User:User});
    // }
    // catch(err){
    //     res.status(500).json({error:"internal server error"});
    //     console.log(err)
    // }

})

router.put("/changepassword", jwtVerify,async (req, res) => {
         const {username,oldPassword,newPassword}= req.body;
         console.log(username,oldPassword,newPassword);

    try {
         const {username,oldPassword,newPassword}= req.body;
         const User =await user.findOne({username:username});
         if(!User){
          return   res.status(404).json({error:"user not found"});
         }
         const isPwMatch =await User.comparePassword(oldPassword);
         if(!isPwMatch){
           return  res.status(501).json({error:"incorrect password"});
         }
         if(oldPassword===newPassword){
            return res.status(501).json({message:"new password cannot be same as old password"});
         }
         User.password = newPassword;
         await User.save();
         res.status(200).json({message:"password changed"});
    }

    catch (err) {
        res.status(500).json({error:"internal error occured"});
        console.log(err)
    }
})

router.delete("/delete",jwtVerify,async(req,res)=>{
    try{
    const User = req.body.username;
    const UsertobeDeleted = await user.findOneAndDelete({username:User});
    res.status(200).json({message:"successfully deleted"});
    }
    catch(err){
        res.status(500).json({error:"error occured"});
        console.log(err)
    }
})




module.exports = router;