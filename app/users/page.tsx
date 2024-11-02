"use client"

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import instance from '../helpers/axiosInstance'

interface UserData {
    name?: string | null;
}


function page() {
    const [users, setUsers] = useState<UserData[]>([])
    useEffect(() => {
        instance.get('/get-users')
            .then(function (res) {
                setUsers(res.data)
            })
    }, [])

    console.log("users", users)

    return (
        <div>
            <div className='flex flex-row'>
                <button className='bg-white text-black'>Add User</button>
            </div>
            {users.map((user, index) => {
                return (
                    <li key={index}>
                        <div className='flex flex-row'>
                            {user.name}
                            <button className='bg-white text-black'>Delete User</button>
                        </div>
                    </li>
                )
            })}
        </div>
    )
}

export default page