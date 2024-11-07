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
        <div>
            <div className='flex flex-row justify-end p-3'>
                <button className='text-black bg-white rounded p-4' onClick={logout}>Logout</button>
            </div>
            <button className='text-black bg-white rounded m-1 p-3' onClick={() => navigate.push('/home')}>Home</button>
            <button className='text-black bg-white rounded m-1 p-3' onClick={() => navigate.push('/bodyfat')}>Bodyfat Dataset</button>
            <LifestyleTable />
        </div>
    )
}

export default page