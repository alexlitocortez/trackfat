"use client"

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

function page() {
    const router = useRouter()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            <div className="z-10 w-full max-w-5xl items-center flex-col justify-center font-mono text-sm lg:flex">
                <h1 className='text-black'>Pick your Dataset</h1>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <button className='text-white bg-black rounded m-1 p-3' onClick={() => router.push('/bodyfat')}>Bodyfat</button>
                    <button className='text-white bg-black rounded m-1 p-3' onClick={() => router.push('/lifestyle')}>Lifestyle</button>
                </Box>
            </div>
        </main>
    )
}

export default page