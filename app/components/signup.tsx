import React from 'react'

import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

function Signup() {
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
                        />
                    </FormControl>
                </Box>
            </MuiCard>
        </div>
    )
}

export default Signup