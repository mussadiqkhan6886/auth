'use client';

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";


const VerifyEmail = () => {

    const [token, setToken] = useState<string[] | string>("")
    const [verifiedEmail, setVerifiedEmail] = useState(false)
    const [error, setError] = useState(false)

    const verifyEmail = async () => {
        try {
            const res = await axios.post("/api/users/verifyemail", {token})
            setVerifiedEmail(true)
        } catch (error: any) {
            setError(true)
            console.log(error.message)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if(token.length > 0){
            verifyEmail()
        }
    }, [token])

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <h1>Verify email</h1>
      <h2>{token ? `${token}` : "no token"}</h2>

      {verifiedEmail && (
        <div>
            <h2>Email verified</h2>
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

export default VerifyEmail
