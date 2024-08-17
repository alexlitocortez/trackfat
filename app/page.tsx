"use client"

import Image from "next/image";
import Link from "next/link";
import DataTable from "./components/table";
import instance from "./helpers/axiosInstance";

export default function Home() {

  const dbTest = () => {
    instance.get('/test-db')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center flex justify-center font-mono text-sm lg:flex">
        <DataTable />
        {/* <button onClick={dbTest}>Click for test</button> */}
      </div>
    </main>
  );
}


