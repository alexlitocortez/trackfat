"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '../components/table';
import Dropdown from '../components/dropdown';
import { useRouter } from 'next/navigation';
import instance from '../helpers/axiosInstance';
import UserLogin from '../components/userlogin';
import TextField from '@mui/material/TextField';

interface bodyfatPercentage {
    weight: number,
    height: number,
    bodyfat: number
}

function page() {
    const navigate = useRouter()
    const [average, setAverage] = useState<string | undefined>()
    const [data, setData] = useState<number | undefined>()
    const [userToken, setUserToken] = useState<string | null>()
    const [bodyfatCalculator, setBodyfatCalculator] = useState(false)
    const [bodyfatPercentage, setBodyfatPercentage] = useState<bodyfatPercentage>({
        weight:
            height:
        bodyfat:
    })

    const router = useRouter()

    const token = localStorage?.getItem('token');

    useEffect(() => {
        if (token) {
            const fetchData = async () => {

                setUserToken(token)
            }

            fetchData()
        } else {
            setData(undefined)
        }
    }, [token])

    const logout = () => {
        instance.post('/logout', {
            expired_token: token,
        })
            .then(function (res) {
                console.log("res", res)

                if (res) {
                    navigate.push('/')

                    localStorage?.removeItem('token')

                    console.log("removed token")

                } else {
                    console.error("Redirect failed")
                }
            })
            .catch((error) => {
                console.log("error", error)
            })
    }

    const openBodyfatCalculator = () => {
        setBodyfatCalculator(!bodyfatCalculator)
        console.log("bodyfatCalculator", bodyfatCalculator)
    }

    const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBodyfatPercentage({
            ...bodyfatPercentage,
            height: e.target.value
        })
    }

    const handleBodyfat = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBodyfatPercentage({
            ...bodyfatPercentage,
            bodyfat: e.target.value
        })
        console.log("bf percentage", bodyfatPercentage)
    }

    const sendBodyfatPercentage = () => {
        instance.post('/calculate-bodyfat', {
            weight: bodyfatPercentage.weight,
            height: bodyfatPercentage.height,
            bodyfat_percentage: bodyfatPercentage.bodyfat
        })
            .then(function (res) {
                console.log("res", res)
            })
            .catch((error) => {
                console.log("error", error)
            })
    }


    return (
        <div className='flex min-h-screen flex-col items-center justify-between p-24 bg-white'>
            {
                userToken ? (
                    <>
                        <div className='bg-white'>
                            < div className='flex flex-row justify-end p-3' >
                                <button className='text-white bg-black rounded p-4' onClick={logout}>Logout</button>
                            </div >
                            <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
                                <div className='bg-white flex-col overflow-x-auto'>
                                    <button className='text-white bg-black rounded m-1 p-3' onClick={() => router.push('/home')}>Home</button>
                                    <button className='text-white bg-black rounded m-1 p-3' onClick={() => router.push('/lifestyle')}>Lifestyle Dataset</button>
                                    <button className='text-white bg-black rounded m-1 p-3' onClick={openBodyfatCalculator}>Bodyfat calculator</button>
                                    {
                                        bodyfatCalculator ? (
                                            <div className='p-2'>
                                                <h3 className='text-black'>Calculate how long it takes to get to different bodyfat percentages</h3>
                                                <div className='flex items-center'>
                                                    <TextField
                                                        label='Enter Weight'
                                                        variant='outlined'
                                                        onChange={handleHeight}
                                                        value={bodyfatPercentage.weight}
                                                    />
                                                    <TextField
                                                        label='Enter Height In Inches'
                                                        variant='outlined'
                                                        onChange={handleHeight}
                                                        value={bodyfatPercentage.height}
                                                    />
                                                    <TextField
                                                        label='Enter Bodyfat Percentage'
                                                        variant='outlined'
                                                        onChange={handleBodyfat}
                                                        value={bodyfatPercentage.bodyfat}
                                                    />
                                                    <button className='bg-black ml-1 p-3' onClick={sendBodyfatPercentage}>Calculate Bodyfat</button>
                                                </div>
                                            </div>
                                        ) :
                                            null
                                    }
                                    <Dropdown average={average} setAverage={setAverage} data={data} setData={setData} />
                                    <DataTable token={token} />
                                </div>

                            </div>
                        </div >
                    </>
                ) :
                    (
                        <>
                            <UserLogin />
                        </>
                    )
            }
        </div >

    )
}

export default page

