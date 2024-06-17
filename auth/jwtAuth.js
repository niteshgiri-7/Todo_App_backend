const jwt = require("jsonwebtoken");
const secretKey = process.env.JWTsecretKey;


const jwtVerify = (req,res,next)=>{

    const authorization = req.headers.authorization;
    if(!authorization){
        // res.redirect("/users/login");
        return res.status(401).json({error:"token not found"});
        

    }
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

    return jwt.sign(userData,secretKey,{expiresIn:(7*86400)});

}
const conditionalJwt = (req,res,next)=>{
    const publicPath = ["/users/signup","/users/login"];
    if(publicPath.includes(req.path)){
        return next();
    }
    return jwtVerify(req,res,next);
}

module.exports = {jwtVerify,generateToken,conditionalJwt};