import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import instance from '../helpers/axiosInstance';

type DropdownProps = {
    average: string | undefined;
    setAverage: React.Dispatch<React.SetStateAction<string | undefined>>;
    data: number | undefined;
    setData: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function Dropdown({ average, setAverage, data, setData }: DropdownProps) {
    const handleChange = (event: SelectChangeEvent) => {
        setAverage(event.target.value as string);
        instance.get('/avg-columns')
            .then(function (res) {

            })
    }
    return (
        <Box sx={{ minWidth: 120, marginBottom: '1rem' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Average</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={average}
                    label="Select Column"
                    className='text-white bg-white'
                    onChange={handleChange}
                >
                    <MenuItem value={"avgAge"}>Age</MenuItem>
                    <MenuItem value={"avgAbdomen"}>Abdomen</MenuItem>
                    <MenuItem value={"avgAnkle"}>Ankle</MenuItem>
                    <MenuItem value={"avgBiceps"}>Biceps</MenuItem>
                    <MenuItem value={"avgWrist"}>Wrist</MenuItem>
                    <MenuItem value={"avgThigh"}>Thigh</MenuItem>
                    <MenuItem value={"avgNeck"}>Neck</MenuItem>
                    <MenuItem value={"avgKnee"}>Knee</MenuItem>
                    <MenuItem value={"avgHeight"}>Height</MenuItem>
                    <MenuItem value={"avgHip"}>Hip</MenuItem>
                    <MenuItem value={"avgForearm"}>Forearm</MenuItem>
                    <MenuItem value={"avgDensity"}>Density</MenuItem>
                    <MenuItem value={"avgChest"}>Chest</MenuItem>
                    <MenuItem value={"avgBodyFat"}>Bodyfat</MenuItem>
                    <MenuItem value={"avgWeight"}>Weight</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default Dropdown