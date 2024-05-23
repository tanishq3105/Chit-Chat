import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onclickHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Account successfully created!");
        localStorage.setItem("token", response.data.id_token);
        setTimeout(() => {
          navigate("/")
          
        }, 2000);
      }
    } catch (err) {
      toast.error("Failed to create account. Please try again.");
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className="bg-[url('./media/background.jpg')] bg-cover h-screen flex flex-col justify-center items-center font-dancing-script">
        <div className="border-2 w-auto h-auto rounded-3xl bg-indigo-950">
          <div className="flex">
            <div className="h-20 w-20 pt-14">
              <img src="./media/logo.png" alt="Logo" />
            </div>
            <div className="text-3xl mb-8 pt-20 text-white">
              Create Your Account
            </div>
          </div>
          <div className="p-5 w-96 flex flex-col justify-center">
            <input
              className="bg-slate-800 w-full mb-4 p-2 rounded border-2 border-violet-500 focus:border-4 outline-none text-slate-400"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-slate-800 w-full mb-4 p-2 rounded border-2 border-violet-500 focus:border-4 outline-none text-slate-400"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              className="bg-slate-800 w-full mb-4 p-2 rounded border-2 border-violet-500 focus:border-4 outline-none text-slate-400"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="bg-slate-800 w-full mb-4 p-2 rounded border-2 border-violet-500 focus:border-4 outline-none text-slate-400"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                className="text-white border-2 px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-700"
                onClick={onclickHandler}
              >
                Register Now
              </button>
            </div>
            <div className="pt-4 text-white">
              Already have an account?{" "}
              <a href="/login" className="text-purple-500">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
