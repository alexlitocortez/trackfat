"use client"

import React, { useState, useEffect } from 'react'
import instance from '../helpers/axiosInstance'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';


interface UserData {
    id: string;
    name?: string | null;
}

interface AddUserData {
    username?: string | null;
    email?: string | null;
    password?: string | null;
}


function page() {
    const navigate = useRouter()
    const [users, setUsers] = useState<UserData[]>([])
    const [addUser, setAddUser] = useState<AddUserData>({
        username: '',
        email: '',
        password: ''
    })
    const [clickUserButton, setClickUserButton] = useState(Boolean)

    const token = localStorage?.getItem('token');

    useEffect(() => {
        if (token) {
            instance.get('/get-users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (res) {
                    setUsers(res.data)

                    if (!token) {
                        console.log("no token")
                    }
                })
                .catch(function (error) {
                    console.log("error", error)
                })
        } else {
            setUsers([]);  // Clear users data if there's no token
        }
    }, [token])

    const logout = () => {
        instance.post('/logout', {
            expired_token: token
        })
            .then(function (res) {
                console.log("res", res)

                localStorage.removeItem('token');

                setUsers([]);

                if (res) {
                    navigate.push('/')
                }
            })
    }


    const addUserButton = () => {
        setClickUserButton(!clickUserButton)
    }

    const addUserInfo = () => {
        instance.post('/register', {
            username: addUser.username,
            email: addUser.email,
            password: addUser.password
        })
            .then(function (res) {
                console.log("res", res)
            })
            .catch((error) => {
                console.log("error", error)
            })
    }

    const deleteUser = (userId: string) => {
        instance.delete(`/users/${userId}`)
            .then(res => {
                console.log("User deleted:", res)
                setUsers(users.filter(user => user.id !== userId))
                console.log("userId success", userId)
            })
            .catch(error => {
                console.error("Error deleting user:", error)
                console.log("userId error", userId)
            })
    }

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddUser({
            ...addUser,
            username: e.target.value
        })
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddUser({
            ...addUser,
            email: e.target.value
        })
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddUser({
            ...addUser,
            password: e.target.value
        })
    }


    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-row justify-end p-3'>
                <button className='text-black bg-white rounded p-4' onClick={logout}>Logout</button>
            </div>
            <div className='flex flex-row'>
                <button className='bg-white text-black' onClick={addUserButton}>Add User</button>
                {
                    clickUserButton && (
                        <div className='flex flex-col'>
                            <TextField
                                label="Username"
                                variant="outlined"
                                className="bg-white"
                                onChange={handleUsername}
                                value={addUser.username}
                            >
                            </TextField>
                            <TextField
                                label="Email"
                                variant="outlined"
                                className="bg-white"
                                onChange={handleEmail}
                                value={addUser.email}
                            >
                                Email
                            </TextField>
                            <TextField
                                label="Password"
                                variant="outlined"
                                className='bg-white'
                                onChange={handlePassword}
                                value={addUser.password}
                            >
                                Password
                            </TextField>
                            <Button onClick={addUserInfo}>Add User</Button>
                        </div>
                    )
                }
            </div>
            {users.map((user, index) => {
                return (
                    <li key={index}>
                        <div className='flex flex-row'>
                            {user.name}
                            <button className='bg-white text-black' onClick={() => deleteUser(user.id)}>Delete User</button>
                        </div>
                    </li>
                )
            })}
        </div>
    )
}

export default page