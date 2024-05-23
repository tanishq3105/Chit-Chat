const express = require("express");
const { User } = require("../db");
const z = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.use(express.json());

const signupBody = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
});
const loginBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post("/signup", async (req, res) => {
  const payload = req.body;
  const parsedPayload = signupBody.safeParse(payload);
  if (!parsedPayload.success) {
    return res.status(411).json({
      msg: "wrong input",
    });
  }
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    return res.status(411).json({
      msg: "user already exists",
    });
  }

  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(payload.password, saltRounds);
  const user = await User.create({
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    password: hashedPass,
  });
  const user_id = user._id;
  console.log(user_id);
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET);

  return res.json({
    msg: "account successfully created",
    id_token: token,
  });
});
router.post("/login", async (req, res) => {
  const payload = req.body;
  const parsedPayload = loginBody.safeParse(payload);
  if (!parsedPayload.success) {
    return res.status(411).json({
      msg: "wrong input",
    });
  }
  const existingUser = await User.findOne({
    email: payload.email,
  });
  if (!existingUser) {
    res.status(411).json({
        msg:"user not found"
    })
}
 bcrypt.compare( payload.password,existingUser.password,(err,result)=>{
    if(err){
        console.error("error",err);
        return;
    }
    if(!result)
        {
            return res.status(411).json({
                msg:"password is incorrect"
            })
        }
    user_id=existingUser._id;
    console.log(user_id)
    const token=jwt.sign({user_id},process.env.JWT_SECRET);
    res.json({
        msg:"login successful",
        "id_token":token
    })
});


 
  
});
module.exports = router;
