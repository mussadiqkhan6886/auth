'use client';

import axios from "axios";
import Link from "next/link";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

const ChangePassword = () => {

    const [token, setToken] = useState<string[] | string>("")
    const [data, setData] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const {newPassword} = data

    const change = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            setMessage("")
            if(data.newPassword === data.newPassword){
                const res = await axios.post("/api/users/changepassword", {token, newPassword})
            }else{
                setMessage("Password not matching")
            }
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(data.newPassword.length > 0 && data.confirmPassword.length > 0){
        setButtonDisabled(false)
        }else{
        setButtonDisabled(true)
        }
    }, [data])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")
        setToken(urlToken || "")
    }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <h1>Change Password</h1>

      <form onSubmit={change}>
        <label htmlFor="password">New Password: </label>
        <input type="password" autoComplete="off"  id="password" placeholder="new password" name="password" onChange={handleChange} value={data.newPassword} className="outline-none w-full border border-gray-500 px-3 py-1.5" />
        <label htmlFor="cPassword">Confirm Password: </label>
        <input type="password" id="cPassword" placeholder="confirm password" name="password" onChange={handleChange} value={data.confirmPassword} className="outline-none w-full border border-gray-500 px-3 py-1.5" />
       <button className={`px-4 mt-5  py-1.5 border border-gray-600  ${buttonDisabled ? "cursor-not-allowed opacity-50 text-gray-500": "cursor-pointer opacity-100 text-white hover:bg-gray-800"}`}>{loading ? "processing" : "Change Password"}</button>
      </form>
        {message && <p>{message}</p>}
      {verified && (
        <div>
            <h2>Password changed</h2>
            <Link href="/login">Login</Link>
        </div>
      ) }

      {error && (
        <div>
            <h1>Error</h1>
        </div>
      )}
    </div>
  )
}

export default ChangePassword
