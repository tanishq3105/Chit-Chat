const { default: mongoose } = require("mongoose");
const dotenv=require("dotenv");
dotenv.config();



try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("database connected succesfully");
} catch (err) {
  console.log(err.message);
}


const userSchema= new mongoose.Schema({
      firstName:{
        type:String,
        required:true,
        maxLength:50
      },
      lastName:{
        type:String,
        required:true,
        maxLength:50
      },
      email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:3,
        maxLength:50
      },
      password:{
        type:String,
        required:true,
        minLength:8
      }
})

const User=mongoose.model("User",userSchema);

module.exports={
  User
}


