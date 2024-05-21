import { useState, useContext } from "react";
import axios from 'axios';
import 'tailwindcss/tailwind.css'; /* Import Tailwind CSS */
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "./contextFolder/Context";

export default  function Signup(){
    const isSignedIn = useContext(ApiContext)
    const toLogin = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    
  function handleSignUp() {
    axios.post("https://academics.newtonschool.co/api/v1/user/signup", {
      name: username,
      email: email,
      password: password,
      appType: "ott",
    }, {
      headers: {
        "accept": "application/json",
        "projectID": "treoo5dhf86s",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data); // Handle the response data here
      
      alert("User Created");
      isSignedIn.setIsSignedIn(true);
      toLogin("/login")
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  

  return(

        <div className="h-screen flex  flex-col items-center justify-center gap-14	bg-black">
        <div className="bg-violet-700 shadow-md rounded-2xl p-8 w-3/10 mb-32 ">
            <h2 className="text-2xl font-bold mb-4 mt-4 text-white ">Create a new Account</h2>
        <div className="flex  flex-col items-center justify-center gap-5 ">
          <div>
            <input
              className="border-2 border-customPurple rounded-xl w-full py-2 px-3 mb-3"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              className="border-2 border-customPurple rounded-xl w-full py-2 px-3 mb-3"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
            className="border-2 border-customPurple rounded-xl w-full py-2 px-3 mb-3"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className=" hue-rotate-180 drop-shadow-2xl text-lg text-white"
              onClick={handleSignUp}
            >
              SignUp
            </button>
            <br></br>
            <Link to="/login" className="text-white">Login</Link>

          </div>
          </div>
        </div>
    
    
        </div>
  )
}