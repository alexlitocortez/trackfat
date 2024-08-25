import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import instance from '../helpers/axiosInstance';
import TextField from '@mui/material/TextField';
import { error } from 'console';

type DropdownProps = {
    average: string | undefined;
    setAverage: React.Dispatch<React.SetStateAction<string | undefined>>;
    data: number | undefined;
    setData: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function Dropdown({ average, setAverage, data, setData }: DropdownProps) {

    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value as string
        setAverage(event.target.value as string);
        instance.get('/avg-columns')
            .then(function (res) {
                setData(res.data[selectedValue])
                console.log("res", res.data)
                console.log("data dropdown", data)
            })
            .catch((error) => {
                console.log("error", error)
            })
    }

    return (
        <Box sx={{ minWidth: 120, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Average</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={average}
                    label="Select Column"
                    className='text-black bg-white'
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
            <TextField id='filled-basic' variant='filled' value={data} />
        </Box>
    )
}

export default Dropdown