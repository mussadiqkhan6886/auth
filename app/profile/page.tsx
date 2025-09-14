'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const Profile = () => {

  const router = useRouter()

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout")
      router.push("/login")
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className='bg-gray-900 min-h-screen flex flex-col justify-center items-center '>
      <h1 className='text-white text-4xl'>Profile</h1>
      <hr />
      <p className='text-gray-100'>Profile Page</p>
      <hr />
      <button className="bg-red-400 mt-4 hover:bg-red-800 cursor-pointer px-4 py-1.5 border border-red-600 text-white" onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile
