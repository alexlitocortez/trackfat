"use client"

import React, { useState } from 'react'
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import instance from '../helpers/axiosInstance';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';


interface UserRegistration {
    username: string
    email: string;
    password: string;
    confirmPassword: string;
}

function Register() {
    const navigate = useRouter()
    const [userRegistration, setUserRegistration] = useState<UserRegistration>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)

    const registerUser = () => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
        setLoading(true)
        instance.post('/register', {
            username: userRegistration.username,
            email: userRegistration.email,
            password: userRegistration.password
        })
            .then(function (res) {
                console.log("res", res.data)

                if (res) {
                    navigate.push('/bodyfat')
                } else {
                    console.error("Redirect failed")
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.log("error", error)
            })
    }


    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegistration({
            ...userRegistration,
            username: e.target.value
        })
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegistration({
            ...userRegistration,
            email: e.target.value
        })
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegistration({
            ...userRegistration,
            password: e.target.value
        })
    }

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegistration({
            ...userRegistration,
            password: e.target.value
        })
    }

    return (
        <div>
            <MuiCard variant='outlined' sx={{ padding: '2rem' }}>

                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', marginBottom: '1rem' }}
                >
                    Register
                </Typography>
                <Box
                    component="form"
                    // onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                        </div>
                    ) : null}
                    <FormControl>
                        <TextField
                            required
                            label="Username"
                            variant="outlined"
                            // helperText="Please enter your username"
                            onChange={handleUsername}
                            value={userRegistration.username}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            required
                            label="Email"
                            variant="outlined"
                            onChange={handleEmail}
                            value={userRegistration.email}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            label="Password"
                            required
                            variant="outlined"
                            onChange={handlePassword}
                            value={userRegistration.password}
                            inputProps={{ maxLength: 12 }}
                        />
                    </FormControl>
                    <Button
                        fullWidth
                        onClick={registerUser}
                    >
                        Register
                    </Button>
                </Box>
            </MuiCard>
        </div >
    )
}

export default Register