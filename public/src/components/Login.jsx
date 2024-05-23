import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const onclickHandler= async ()=>{
        try{
          const response=await axios.post("http://localhost:3000/api/v1/user/login",{
          email,
          password
    
        });
        
        if(response.status==200){
          navigate("/chat")
        }
        
        localStorage.setItem("token",response.data.id_token)
    
        }catch(err){
          console.log(err.message)
        }
      }
    return(
        <div>
      <div className=" bg-[url('./media/background.jpg')] bg-cover h-screen flex flex-col justify-center items-center font-dancing-script">
        <div className="border-2  w-auto h-auto rounded-3xl bg-indigo-950">
          <div className="flex pl-3">
            <div className="h-20 w-20 pt-14">
              <img src="./media/logo.png" alt="" />
            </div>

            <div className="text-3xl mb-8 pt-20 text-white ">
              Welcome Back
            </div>
          </div>
          <div className="p-5 pl w-96 flex  flex-col  justify-center">
          <input
              className="bg-slate-800 w-full mb-4 p-2 rounded border-2  border-violet-500 focus:border-4 outline-none text-slate-400"
              placeholder="Email"
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
            />

            <input
              className="bg-slate-800 w-full mb-4 p-2 rounded border-2  border-violet-500 focus:border-4 outline-none text-slate-400"
              placeholder="Password"
              type="password"
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
            />
            <div className="flex justify-center">
              <button className="text-white border-2 border- px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-700"
              onClick={onclickHandler}>
                Sign In
              </button>
            </div>
            <div className="pt-4 text-white" >
              New Here? <a href="/login" className="text-purple-500">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}