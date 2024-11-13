import { useRouter } from 'next/navigation'
import React from 'react'

const UserLogin = () => {
    const navigate = useRouter()
    return (
        <>
            <h1 className='text-black'>User must login or create account!</h1>
            <button className='text-white bg-black p-4 rounded hover:bg-slate-700' onClick={() => navigate.push('/')}>Login</button>
        </>

    )
}

export default UserLogin