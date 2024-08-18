"use client"

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import DataTable from "./components/table";
import instance from "./helpers/axiosInstance";

export default function Home() {
  const [average, setAverage] = useState()

  const avgColumns = () => {
    instance.get('/avg-columns')
      .then(function (res) {
        setAverage(res.data.avg)
        console.log("average", average)
      })
      .catch((error) => {
        console.log("error", error)
      })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center flex justify-center font-mono text-sm lg:flex">
        <DataTable />
        <button onClick={avgColumns}>Click for test</button>
        <div className='text-white'>
          {average}
        </div>
      </div>
    </main>
  );
}


