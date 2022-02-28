import React, { useState } from "react";
import "./Reg.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ err: "", color: "" });

  const registerUser = async (e) => {
    e.preventDefault();
    // console.log(name, email, password);
    const response = await fetch(
      "https://hotel-del-luna-miglani.herokuapp.com/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (data.status === "ok") {
      setError({ err: data.message, color: "text-green-900" });
      localStorage.setItem("token", data.authToken);
      // console.log(data);
      window.location.href = "/";
    } else {
      if (data.errors) {
        let str = "";
        data.errors.forEach((element) => {
          str = element.msg;
        });
        setError({ err: str, color: "text-red-900" });
      } else {
        setError({ err: data.error, color: "text-red-900" });
      }
    }
  };
  return (
    <div id="register_comp" className="flex justify-center align-center mt-10">
      <div
        id="myform"
        className="px-10 pt-10 shadow-2xl shadow-gray-900/100 pb-6 bg-gradient-to-r from-red-600 to-indigo-700 my-5 mx-2 rounded-2xl h-max"
      >
        <h1 className="text-4xl text-center mb-2 sm:text-6xl">
          <span className="text-4xl text-center sm:text-6xl font-bold text-white">
            SIGN UP
          </span>
          🤩
        </h1>
        <p className="text-gray-100 text-xl mb-4 text-center ">
          Create An Account!
        </p>

        <form onSubmit={registerUser} className="h-full">
          <label htmlFor="name" className="text-xl text-black">
            Username
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inputs my-2 block outline-none border-none w-full px-3 py-2 rounded-lg shadow-inner shadow-gray-500"
          />
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
            className="mx-auto mt-14 text-white cursor-pointer bg-gray-900 p-3 rounded-lg font-bold"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
