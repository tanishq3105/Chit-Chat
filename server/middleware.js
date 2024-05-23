const express=require("express")
const jwt=require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{
    const authHead=req.headers.authorization;
    if(!authHead)
        {
            return res.status(411).json({
                msg:"no token passed"
            })
        }
    const token=authHead.split(' ')[1];

   try{ const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.userId=decoded.userId;
    next();
}catch(err)
{
    return res.status(411).json({
        msg:"unknown error"
    })
    console.log(err.message);
}

}
module.exports={authMiddleware};