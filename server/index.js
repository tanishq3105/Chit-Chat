const express= require ("express");
const cors=require("cors");
const mongoose = require("mongoose");
const app=express();
require("dotenv").config();
const {database}=require('./db')
const rootRouter=require("./routes/index")


app.use(cors());
app.use(express.json());

app.use("/api/v1",rootRouter)





const server = app.listen(process.env.PORT,()=>{
    console.log("Server started on Port "+process.env.PORT)
})