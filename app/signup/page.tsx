'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios"
import { ChangeEvent, useState } from "react";

const Signup = () => {

  const [user, setUser ] = useState({
    email: "",
    password: "",
    username: ""
  })

  const signUp = async () => {

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  return (
    <div className="h-screen flex-col text-white bg-gray-900 flex justify-center items-center">
      <h1 className="text-3xl font-semibold text-gray-100 text-center mb-4">Sign Up</h1>
      <hr />
      <form className="min-w-[500px] flex flex-col gap-2">
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" placeholder="mussadiqkhan" name="username" onChange={handleChange} value={user.username} className="outline-none w-full border border-gray-500 px-3 py-1.5" />
        <label htmlFor="password">Password: </label>
        <input type="text" id="password" placeholder="6886" name="password" onChange={handleChange} value={user.password} className="outline-none w-full border border-gray-500 px-3 py-1.5" />
        <label htmlFor="email">Email: </label>
        <input type="text" id="email" placeholder="mussadiqkhan@gmail.com" name="email" onChange={handleChange} value={user.email} className="outline-none w-full border border-gray-500 px-3 py-1.5" />
        <button className="px-4 mt-5 hover:bg-gray-800 py-1.5 border border-gray-600 text-white" onClick={signUp}>Signup</button>
        <Link className="text-center" href={"/login"}>Login page</Link>
      </form>
    </div>
  )
}

export default Signup
