'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios"

const Login = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const login = async (e: FormEvent) => {
    e.preventDefault()
    try{
      setLoading(true)
      const res = await axios.post("/api/users/login", user)
      console.log(res)
      router.push("/profile")
    }catch(err: any){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  return (
    <div className="h-screen flex-col text-white bg-gray-900 flex justify-center items-center">
      <h1 className="text-3xl font-semibold text-gray-100 text-center mb-4">Login</h1>
      <hr />
      <form onSubmit={login} className="min-w-[500px] flex flex-col gap-2">
        <label htmlFor="password">Password: </label>
        <input type="password" autoComplete="off"  id="password" placeholder="6886" name="password" onChange={handleChange} value={user.password} className="outline-none w-full border border-gray-500 px-3 py-1.5" />
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" placeholder="mussadiqkhan@gmail.com" name="email" onChange={handleChange} value={user.email} className="outline-none w-full border border-gray-500 px-3 py-1.5" />
       <button className={`px-4 mt-5  py-1.5 border border-gray-600  ${buttonDisabled ? "cursor-not-allowed opacity-50 text-gray-500": "cursor-pointer opacity-100 text-white hover:bg-gray-800"}`}>{loading ? "processing" : "Login"}</button>
        <Link className="text-center" href={"/signup"}>Signup page</Link>
      </form>
    </div>
  )
}

export default Login
 