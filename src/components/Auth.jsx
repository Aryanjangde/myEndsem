

export default function Auth({handleSignIn}){


  return (
    <div className="h-screen flex  flex-col items-center justify-center gap-14	bg-black">
    <div className="flex  flex-col items-center justify-center gap-2">
      <div>
        <h1 className="bg-violet-500 rounded-xl p-4 pl-8 ">Sign Up</h1>
        <input
          className="border-black border-2"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
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
        <button onClick={handleSignUp} className="hue-rotate-180 drop-shadow-2xl cursor-wait text-lg text-white">Sign Up</button>
      </div>
    </div>


    </div>
  );
}
