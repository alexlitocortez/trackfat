"use client";

import React, { useState, useEffect } from 'react';
import instance from '../helpers/axiosInstance';
import MUIDataTable from 'mui-datatables';
import Box from '@mui/material/Box';

type DataRow = {
    [key: string]: any;
}

function LifestyleTable() {
    const [data, setData] = useState<DataRow[]>([])
    const [columns, setColumns] = useState([
        {
            name: 'Gender'
        },
        {
            name: 'Age'
        },
        {
            name: 'Occupation'
        },
        {
            name: 'Sleep_Duration'
        },
        {
            name: 'Quality_Of_Sleep'
        },
        {
            name: 'Physical_Activity_Level'
        },
        {
            name: 'Stress_Level'
        },
        {
            name: 'BMI_Category'
        },
        {
            name: 'Blood_Pressure'
        },
        {
            name: 'Heart_Rate'
        },
        {
            name: 'Daily_Steps'
        }
    ])

    useEffect(() => {
        instance.get('/lifestyle')
            .then(function (res) {
                setData(res.data)
                console.log("res", data)
            })
            .catch((error) => {
                console.log("error", error)
            })
    }, [])

    return (
        <div>
            <Box sx={{ marginBottom: '1rem' }}>
                <MUIDataTable
                    title={"Lifestyle Data"}
                    data={data}
                    columns={columns}
                />
            </Box>
        </div>
    )
}

export default LifestyleTable