"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '../components/table';
import Dropdown from '../components/dropdown';
import { useRouter } from 'next/navigation';
import instance from '../helpers/axiosInstance';

function page() {
    const navigate = useRouter()
    const [average, setAverage] = useState<string | undefined>()
    const [data, setData] = useState<number | undefined>()
    const [token, setToken] = useState<string | null>()

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            setToken(token)
        }

        fetchData()
    })

    const logout = () => {
        instance.post('/logout')
            .then(function (res) {
                console.log("res", res)

                if (res) {
                    navigate.push('/')
                }
            })
            .catch((error) => {
                console.log("error", error)
            })
    }


    return (
        <div className='bg-white'>
            <div className='flex flex-row justify-end p-3'>
                <button className='text-white bg-black rounded p-4' onClick={logout}>Logout</button>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
                <div className='bg-white z-10 w-full max-w-5xl items-center flex-col justify-center font-mono text-sm lg:flex'>
                    <button className='text-white bg-black rounded m-1 p-3' onClick={() => router.push('/home')}>Home</button>
                    <button className='text-white bg-black rounded m-1 p-3' onClick={() => router.push('/lifestyle')}>Lifestyle Dataset</button>
                    <Dropdown average={average} setAverage={setAverage} data={data} setData={setData} />
                    <DataTable />
                </div>
            </div>
        </div>
    )
}

export default page

