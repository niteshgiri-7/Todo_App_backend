const express = require("express");
const router = express.Router();
const user = require("../models/userModel");

router.post("/", async (req, res) => {
    try {
        const userToBeAdded = req.body;
        const newUser = new user(userToBeAdded);
        const response = await newUser.save();
        res.status(200).send(response);
        console.log("new user saved")
    }
    catch (err) {
        console.log("unable to save new user");
        console.log(err)
    }
})

router.put("/", async (req, res) => {
    try {
         const {username,password}= req.body;
         const User =await user.findOne({username:username});
         if(!User){
            res.status(404).send("user not found");
         }
         User.password = password;
         await User.save();
         res.status(200).send("password changed");
    }

    catch (err) {
        res.status(500).send("error")
        console.log(err)
    }
})


module.exports = router;