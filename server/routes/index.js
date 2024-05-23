const express=require("express");
const userRouter=require("./user")
const messageRouter=require("./messages")

const router=express.Router();

router.use("/user",userRouter);
// router.use("/messages",messageRouter);

module.exports=router;