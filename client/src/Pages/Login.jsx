import { useNavigate } from 'react-router-dom';
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {

  const {backendUrl, token, setToken} = useContext(AppContext)
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Registration Api
      if (state === 'Sign Up') {
        const {data} = await axios.post(`${backendUrl}/api/user/register`, {name, password, email} );
        if(data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        }else {
          toast.error(data.message);
        }
      } else {
        // Login Api
        const {data} = await axios.post(`${backendUrl}/api/user/login`, {password, email} );
        if(data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        }else {
          toast.error(data.message);
        }
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center ">
      <div className="flex flex-col items-start gap-3 p-8 m-auto min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg  ">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Log In"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment
        </p>
        {
          state === "Sign Up" && <div className="w-full">
          <p>Full Name</p>
          <input
            className="w-full p-2 mt-1 border rounded border-zinc-300"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        }
        
        <div className="w-full">
          <p>Email</p>
          <input
            className="w-full p-2 mt-1 border rounded border-zinc-300"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="w-full p-2 mt-1 border rounded border-zinc-300"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='w-full py-2 text-base text-white rounded-md bg-primary' >{state === "Sign Up" ? "Create Account" : "Login"}</button>

        {
          state === "Sign Up"
          ? <p>Already have an account? <span onClick={(()=> setState('Login'))} className='underline cursor-pointer text-primary'>Login Here</span></p>
          : <p>Create a new account? <span onClick={(()=> setState('Sign Up'))} className='underline cursor-pointer text-primary'>Click here</span></p>
        }
      </div>
    </form>
  );
};

export default Login;
