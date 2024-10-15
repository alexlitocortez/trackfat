"use client";

import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import instance from '../helpers/axiosInstance';

interface UserLogin {
    email: string
    password: string
}

function Login() {
    const navigate = useRouter()
    const [loading, setLoading] = useState(false)
    const [userLogin, setUserLogin] = useState<UserLogin>({
        email: '',
        password: ''
    })

    const loginUser = () => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
        setLoading(true)
        instance.post('/login', {
            email: userLogin.email,
            password: userLogin.password
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

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserLogin({
            ...userLogin,
            email: e.target.value
        })
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserLogin({
            ...userLogin,
            password: e.target.value
        })
    }


    return (
        <div>
            <MuiCard variant='outlined' sx={{ padding: '2rem' }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Sign in
                </Typography>
                <Box
                    component="form"
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
                            label="Email"
                            variant="outlined"
                            onChange={handleEmail}
                            value={userLogin.email}
                        />
                    </FormControl>
                    <FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link
                                component="button"
                                variant="body2"
                                sx={{ alignSelf: 'baseline' }}
                            >
                                Forgot your password?
                            </Link>
                        </Box>
                        <TextField
                            required
                            label="Password"
                            variant="outlined"
                            onChange={handlePassword}
                            value={userLogin.password}
                        />
                    </FormControl>
                    <Button
                        fullWidth
                        onClick={loginUser}
                    >
                        Sign in
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Don&apos;t have an account?{' '}
                        <span>
                            <Link
                                href="/material-ui/getting-started/templates/sign-in/"
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                            >
                                Sign up
                            </Link>
                        </span>
                    </Typography>
                </Box>
            </MuiCard>
        </div>
    )
}

export default Login