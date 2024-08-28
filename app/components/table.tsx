"use client";

import React, { useState, useEffect } from 'react';
import instance from '../helpers/axiosInstance';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { error } from 'console';

type DataRow = {
    [key: string]: any;
}

function DataTable() {
    const [data, setData] = useState<DataRow[]>([]);
    const [obese, setObese] = useState()
    const [columns, setColumns] = useState([
        {
            name: 'Age',
            options: {
                filter: true
            }
        },
        {
            name: 'Abdomen',
            options: {
                filter: true
            }
        },
        {
            name: 'Ankle',
            options: {
                filter: true
            }
        },
        {
            name: 'Biceps',
            options: {
                filter: true
            }
        },
        {
            name: 'Wrist',
            options: {
                filter: true
            }
        },
        {
            name: 'Thigh',
            options: {
                filter: true
            }
        },
        {
            name: 'Neck',
            options: {
                filter: true
            }
        },
        {
            name: 'Knee',
            options: {
                filter: true
            }
        },
        {
            name: 'Height',
            options: {
                filter: true
            }
        },
        {
            name: 'Hip',
            options: {
                filter: true
            }
        },
        {
            name: 'Forearm',
            options: {
                filter: true
            }
        },
        {
            name: 'Density',
            options: {
                filter: true
            }
        },
        {
            name: 'Chest',
            options: {
                filter: true
            }
        },
        {
            name: 'BodyFat',
            options: {
                filter: true
            }
        },
        {
            name: 'Weight',
            options: {
                filter: true
            }
        },
    ])

    useEffect(() => {
        instance.get('/df')
            .then(function (res) {
                setData(res.data)
                console.log("data", data)
            })
            .catch((error) => {
                console.log("error", error)
            })
    }, [])

    const addColumn = () => {

        const newColumnName = 'Bodyfat Weight';
        const newColumn = {
            name: newColumnName,
            options: { filter: true },
        }
        instance.get('/convert')
            .then(function (res) {
                setData(res.data)
                console.log("res", res)

                // Update the state with new columns and data
                setColumns(prevColumns => [...prevColumns, newColumn]);
                // setData(updatedData);
            })
            .catch((error) => {
                console.error("error", error);
            });
    }

    const bodyfatStatus = () => {
        instance.get('/bodyfat-status-men')
            .then(function (res) {
                setData(res.data)
                console.log("res bodyfat", res)
            })
            .catch((error) => {
                console.error("error", error)
            })
    }

    return (
        <div>
            <button onClick={addColumn} style={{ marginBottom: '20px', color: 'black' }}>
                Add Column
            </button>
            <button onClick={bodyfatStatus} style={{ marginBottom: '20px', color: 'black' }}>
                Bodyfat Status
            </button>
            <MUIDataTable
                title={"Bodyfat Data"}
                data={data}
                columns={columns}
            />
        </div>
    )
}

export default DataTable