'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Profile = () => {

  const router = useRouter()
  const [data, setData] = useState("nothing")

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout")
      console.log(res)
      router.push("/login")

    } catch (error: any) {
      console.log(error.message)
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me")
    console.log(res)
    setData(res.data.data._id)
  }


  return (
    <div className='bg-gray-900 min-h-screen flex flex-col justify-center items-center '>
      <h1 className='text-white text-4xl'>Profile</h1>
      <hr />
      <p className='text-gray-100'>Profile Page</p>
      <h2>{data === "nothing" ? "nothing" : <Link href={`profile/${data}`}>Profile Page</Link>}</h2>
      <hr />
      <button className="bg-red-400 mt-4 hover:bg-red-800 cursor-pointer px-4 py-1.5 border border-red-600 text-white" onClick={logout}>Logout</button>
      <button className="bg-blue-400 mt-4 hover:bg-blue-800 cursor-pointer px-4 py-1.5 border border-blue-600 text-white" onClick={getUserDetails}>User Details</button>
    </div>
  )
}

export default Profile
