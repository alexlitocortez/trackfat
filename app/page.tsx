"use client";

import React, { useState, useEffect } from 'react';
import DataTable from "./components/table";
import Dropdown from './components/dropdown';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation'

export default function Home() {
  const [average, setAverage] = useState<string | undefined>()
  const [data, setData] = useState<number | undefined>()
  const [bodyfatWeight, setBodyfatWeight] = useState<number[] | undefined>()

  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div className="z-10 w-full max-w-5xl items-center flex-col justify-center font-mono text-sm lg:flex">
        {/* <Dropdown average={average} setAverage={setAverage} data={data} setData={setData} />
        <DataTable /> */}
        <h1 className='text-black'>Pick your Dataset</h1>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <button className='text-white bg-black rounded m-1 p-3' onClick={() => router.push('/bodyfat')}>Bodyfat</button>
          <button className='text-white bg-black rounded m-1 p-3' onClick={() => router.push('/lifestyle')}>Lifestyle</button>
        </Box>
      </div>
    </main>
  );
}
