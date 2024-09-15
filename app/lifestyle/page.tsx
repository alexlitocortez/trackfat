"use client";

import React from 'react';
import LifestyleTable from '../components/lifestyletable';
import { useRouter } from 'next/navigation'

function page() {
    const router = useRouter()

    return (
        <div>
            <button className='text-black bg-white rounded m-1 p-3' onClick={() => router.push('/home')}>Home</button>
            <button className='text-black bg-white rounded m-1 p-3' onClick={() => router.push('/bodyfat')}>Bodyfat Dataset</button>
            <LifestyleTable />
        </div>
    )
}

export default page