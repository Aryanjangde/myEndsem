import { useState } from "react";
import { useNavigate } from "react-router-dom";

import 'tailwindcss/tailwind.css'; /* Import Tailwind CSS */
import { Link } from "react-router-dom";

export default  function Login(){
    const nav = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');



    function handleLogin(){
        fetch("https://academics.newtonschool.co/api/v1/user/login", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "projectID": "treoo5dhf86s",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        appType: "ott",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

      if (data.status === "success") {
        localStorage.setItem("user", data.token)
        nav("/")
        alert("Login Successful");
        
      } else {
        nav("/signup");
      }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  return(

        <div className="h-screen flex  flex-col items-center justify-center gap-14	bg-black">
        <div className="flex  flex-col items-center justify-center gap-2">
          <div>
            <input
              className="ring-black"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className=" hue-rotate-180 drop-shadow-2xl cursor-wait text-lg text-white"
              onClick={handleLogin}
            >
              Login
            </button>
            <br></br>
            <Link to="/signup"className="text-white	">
                Create Account
            </Link>
          </div>
        </div>
    
    
        </div>
  )
}