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
            name: 'Gender',
            options: {
                customBodyRender: (value: string | number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            },
        },
        {
            name: 'Age',
            options: {
                customBodyRender: (value: string | number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        // {
        //     name: 'Occupation'
        // },
        {
            name: 'Sleep_Duration',
            options: {
                customBodyRender: (value: string | number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        {
            name: 'Quality_Of_Sleep',
            options: {
                customBodyRender: (value: string | number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        {
            name: 'Physical_Activity_Level',
            options: {
                customBodyRender: (value: string | number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        {
            name: 'Stress_Level',
            options: {
                customBodyRender: (value: string | number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        {
            name: 'BMI_Category',
            options: {
                customBodyRender: (value: string | number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        // {
        //     name: 'Blood_Pressure'
        // },
        {
            name: 'Heart_Rate',
            options: {
                customBodyRender: (value: string | number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        // {
        //     name: 'Daily_Steps'
        // }
    ])

    const token = localStorage?.getItem('token')

    useEffect(() => {
        if (token) {
            instance.get('/lifestyle', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (res) {
                    setData(res.data)
                    console.log("res", data)
                })
                .catch((error) => {
                    console.log("error", error)
                })
        } else {
            setData([])
        }
    }, [token])

    return (
        <div>
            <Box sx={{ marginBottom: '1rem' }}>
                <MUIDataTable
                    title={"Lifestyle Data"}
                    data={data}
                    columns={columns}
                    options={{
                        responsive: 'simple'
                    }}
                />
            </Box>
        </div>
    )
}

export default LifestyleTable