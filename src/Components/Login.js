import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ err: "", color: "" });

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://hotel-del-luna-miglani.herokuapp.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.status === "ok") {
      // console.log("LOGIN SUCCESSFULL");
      setError({ err: data.message, color: "text-green-900" });
      localStorage.setItem("token", data.authToken);
      window.location.href = "/";
    } else {
      setError({ err: data.error, color: "text-red-700" });
    }
  };
  return (
    <div className="flex justify-center align-center mt-10" id="login_comp">
      <div
        id="myform"
        className="px-10 pt-10 pb-6 shadow-2xl shadow-gray-900/100 bg-gradient-to-r from-cyan-600 to-green-600 my-5 mx-2 rounded-2xl h-max"
      >
        <h1 className="text-5xl mb-2 sm:text-6xl">
          <span className="text-5xl sm:text-6xl font-bold text-white">
            LOGIN
          </span>
          👋
        </h1>
        <p className="text-gray-100 text-2xl mb-4 text-center">Welcome Back!</p>
        <form onSubmit={loginUser} className="h-full">
          <label htmlFor="email" className="text-xl text-black">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputs my-2 block outline-none border-none w-full px-3 py-2 rounded-lg shadow-inner shadow-gray-500"
          />
          <label htmlFor="password" className="text-xl text-black">
            Password
          </label>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputs my-2 block outline-none border-none  w-full px-3 py-2 rounded-lg shadow-inner shadow-gray-500"
          />
          <h1 className={`font-bold my-2 ${error.color}`}>
            {error.err ? `*${error.err}*` : ""}
          </h1>
          <input
            type="submit"
            value="Submit"
            className=" mx-auto mt-10 text-white cursor-pointer bg-gray-900 p-3 rounded-lg font-bold"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
