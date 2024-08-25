"use client"

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import DataTable from "./components/table";
import instance from "./helpers/axiosInstance";
import Dropdown from './components/dropdown';

export default function Home() {
  const [average, setAverage] = useState<string | undefined>()
  const [data, setData] = useState<number | undefined>()
  const [bodyfatWeight, setBodyfatWeight] = useState<number[] | undefined>()

  const convertPercent = () => {
    instance.post('/convert')
      .then(function (res) {
        setData(res.data)
        console.log("res", res)
      })
      .catch((error) => {
        console.log("error", error)
      })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div className="z-10 w-full max-w-5xl items-center flex-col justify-center font-mono text-sm lg:flex">
        <Dropdown average={average} setAverage={setAverage} data={data} setData={setData} />
        <DataTable />
        <button onClick={convertPercent} className='text-black'>Click for test</button>
        <div className='text-black'>
        </div>
      </div>
    </main>
  );
}


