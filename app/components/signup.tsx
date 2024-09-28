"use client"

import React, { useState } from 'react'

import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import instance from '../helpers/axiosInstance';
import axios from 'axios';

interface UserRegistration {
    email: string;
    password: string;
    confirmPassword: string;
}

function Signup() {
    const [userRegistration, setUserRegistration] = useState<UserRegistration>({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const registerUser = () => {
        axios.post('/register')
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

    console.log("password", userRegistration.password)

    return (
        <div>
            <MuiCard variant='outlined' sx={{ padding: '1rem' }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Create Account
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
                    <FormControl>
                        <TextField
                            // error={emailError}
                            // helperText={emailErrorMessage}
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            autoComplete="email"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            onChange={handleEmail}
                            value={userRegistration.email}
                            // color={emailError ? 'error' : 'primary'}
                            sx={{ ariaLabel: 'email' }}>

                        </TextField>
                    </FormControl>
                    <FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                        </Box>
                        <TextField
                            // error={passwordError}
                            // helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            onChange={handlePassword}
                            value={userRegistration.password}
                        // color={passwordError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <FormLabel htmlFor="password">Confirm Password</FormLabel>
                        </Box>
                        <TextField
                            name="confirm-password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="confirm-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            onChange={handleConfirmPassword}
                            value={userRegistration.confirmPassword}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    // sx={{ backgroundColor: 'blue' }}
                    // onClick={validateInputs}
                    >
                        Create Account
                    </Button>
                </Box>
            </MuiCard>
        </div>
    )
}

export default Signup