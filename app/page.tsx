"use client"

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import DataTable from "./components/table";
import instance from "./helpers/axiosInstance";
import Dropdown from './components/dropdown';

export default function Home() {
  const [average, setAverage] = useState<string | undefined>("Age")
  const [data, setData] = useState<number | undefined>()

  const avgColumns = () => {
    instance.get('/avg-columns')
      .then(function (res) {
        setAverage(res.data)
        console.log("average", average)
      })
      .catch((error) => {
        console.log("error", error)
      })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center flex-col justify-center font-mono text-sm lg:flex">
        <Dropdown average={average} setAverage={setAverage} data={data} setData={setData} />
        <DataTable />
        <button onClick={avgColumns}>Click for test</button>
        <div className='text-white'>
          {/* {average} */}
        </div>
      </div>
    </main>
  );
}


