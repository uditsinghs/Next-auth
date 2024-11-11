"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'



const ProfilePage = () => {
  const [data, setdata] = useState({})
  const router = useRouter()
  const getUserProfile = async () => {
    try {
      const { data } = await axios.get('/api/users/me');
      if (data.success) {
        setdata(data.user)
      }
    } catch (error: any) {
      console.log(error);

    }
  }
  useEffect(() => {
    getUserProfile()
  }, [])

  const handleLogout = async () => {
    try {
      const { data } = await axios.get('/api/users/logout')
      if (data.success) {
        router.push('/login')
      }
    } catch (error) {
      console.log(error);

    }

  }

  return (

    <>
      <button className='py-2 px-3 bg-red-500 text-white rounded-md' onClick={handleLogout}>Logout</button>
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='flex justify-center items-center w-[300px] bg-gray-100 h-[300px]'>
          <div className='flex flex-col gap-3'>
            <p> USERNAME:{data?.username}</p>
            <p>EMAIL:{data?.email}</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default ProfilePage