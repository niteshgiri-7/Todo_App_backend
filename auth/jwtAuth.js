const jwt = require("jsonwebtoken");
const secretKey = process.env.JWTsecretKey;


const jwtAuthMiddleware = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
  try{
    if(!token){
        return res.status(401).json({error:"Unauthorized"});
    }
    const decoded = jwt.verify(token,secretKey);
    req.user = decoded;
    next()
}
catch(err){
    return res.status(401).json({error:"invalid token"});
}
}

const generateToken = (userData)=>{

    return jwt.sign(userData,secretKey);

}

module.exports = {jwtAuthMiddleware,generateToken};