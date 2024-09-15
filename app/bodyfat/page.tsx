"use client";

import React, { useState, useEffect } from 'react';
import DataTable from '../components/table';
import Dropdown from '../components/dropdown';
import { useRouter } from 'next/navigation';

function page() {
    const [average, setAverage] = useState<string | undefined>()
    const [data, setData] = useState<number | undefined>()

    const router = useRouter()

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            <div className='bg-white z-10 w-full max-w-5xl items-center flex-col justify-center font-mono text-sm lg:flex'>
                <button className='text-white bg-black rounded m-1 p-3' onClick={() => router.push('/home')}>Home</button>
                <button className='text-white bg-black rounded m-1 p-3' onClick={() => router.push('/lifestyle')}>Lifestyle Dataset</button>
                <Dropdown average={average} setAverage={setAverage} data={data} setData={setData} />
                <DataTable />
            </div>
        </div>
    )
}

export default page


