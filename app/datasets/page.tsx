"use client"

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import instance from '../helpers/axiosInstance';

interface AuthType {
    auth: string
}

function page() {
    const navigate = useRouter()
    const [auth, setAuth] = useState<AuthType | null>()

    const token = localStorage?.getItem('token')

    useEffect(() => {
        if (token) {
            instance.get("/datasets", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (res) {
                    setAuth(res.data)
                    if (!token) {
                        console.log("no token")
                    }
                })
                .catch(function (err) {
                    console.log("error", err)
                })
        } else {
            setAuth(null)
        }
    }, [token])

    const logout = () => {
        instance.post('/logout', {
            expired_token: token
        })
            .then(function (res) {
                console.log("res", res)

                localStorage.removeItem('token');

                if (res) {
                    navigate.push('/')
                }
            })
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-white'>
            {
                auth ?
                    (
                        <>
                            <div className='flex flex-row justify-end p-3'>
                                <button className='text-white bg-black rounded p-4' onClick={logout}>Logout</button>
                            </div>
                            <div className="z-10 w-full max-w-5xl items-center flex-col justify-center font-mono text-sm lg:flex">
                                <h1 className='text-black'>Pick your Dataset</h1>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <button className='text-white bg-black rounded m-1 p-3' onClick={() => navigate.push('/bodyfat')}>Bodyfat</button>
                                    <button className='text-white bg-black rounded m-1 p-3' onClick={() => navigate.push('/lifestyle')}>Lifestyle</button>
                                </Box>
                            </div>
                        </>
                    ) :
                    (
                        <>
                            <h1 className='text-black'>User must login or create account!</h1>
                            <button className='text-white bg-black rounded m-1 p-3' onClick={() => navigate.push('/')}>Home</button>
                        </>
                    )
            }
        </main>
    )
}

export default page