"use client";

import React from 'react';
import LifestyleTable from '../components/lifestyletable';
import { useRouter } from 'next/navigation'
import instance from '../helpers/axiosInstance';

function page() {
    const navigate = useRouter();

    const token = localStorage?.getItem('token')

    const logout = () => {
        instance.post('/logout', {
            expired_token: token
        })
            .then(function (res) {
                localStorage.removeItem('token')

                if (res) {
                    navigate.push('/')
                }
            })
    }

    return (
        <div className='bg-white'>
            <div className='flex flex-row justify-end p-3'>
                <button className='text-white bg-black rounded p-4' onClick={logout}>Logout</button>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
                <div className='bg-white z-10 w-full max-w-5xl items-center flex-col justify-center font-mono text-sm lg:flex'>
                    <button className='text-white bg-black rounded m-1 p-3' onClick={() => navigate.push('/home')}>Home</button>
                    <button className='text-white bg-black rounded m-1 p-3' onClick={() => navigate.push('/bodyfat')}>Bodyfat Dataset</button>
                    <LifestyleTable />
                </div>
            </div>
        </div>
    )
}

export default page