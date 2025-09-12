'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios"
import { useState } from "react";

const Login = () => {

  const [user, setUser ] = useState({
    email: "",
    password: "",
  })

  const logIn = async () => {

  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  return (
    <div className="h-screen flex-col text-white bg-gray-900 flex justify-center items-center">
      <h1 className="text-3xl font-semibold text-gray-100 text-center mb-4">Login</h1>
      <hr />
      <form className="min-w-[500px] flex flex-col gap-2">
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" placeholder="6886" name="password" onChange={handleChange} value={user.password} className="outline-none w-full border border-gray-500 px-3 py-1" />
        <label htmlFor="email">Email: </label>
        <input type="text" id="email" placeholder="mussadiqkhan@gmail.com" name="email" onChange={handleChange} value={user.email} className="outline-none w-full border border-gray-500 px-3 py-1" />
        <button className="px-4 mt-5 hover:bg-gray-800 py-1.5 border border-gray-600 text-white" onClick={logIn}>Login</button>
        <Link className="text-center" href={"/signup"}>Signup page</Link>
      </form>
    </div>
  )
}

export default Login
