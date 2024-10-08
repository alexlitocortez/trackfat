import React from 'react'

import Register from '../components/register'

function page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            <div className="z-10 w-full max-w-5xl items-center flex-col justify-center font-mono text-sm lg:flex">
                <Register />
            </div>
        </main>
    )
}

export default page