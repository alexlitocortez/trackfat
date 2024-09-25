import React from 'react'

import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Signup from '../components/signup';

function page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            <div className="z-10 w-full max-w-5xl items-center flex-col justify-center font-mono text-sm lg:flex">
                <Signup />
            </div>
        </main>
    )
}

export default page