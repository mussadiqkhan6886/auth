import React from 'react'

const UserProfile = async({params}: {params: Promise<{id: string}>}) => {

    const id = (await params).id

  return (
    <div className='bg-gray-900 min-h-screen flex flex-col justify-center items-center '>
        <h1 className='text-white text-4xl'>Profile {id}</h1>
        <hr />
        <p className='text-gray-100'>User profile</p>
    </div>
  )
}

export default UserProfile
