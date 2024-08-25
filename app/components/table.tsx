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

        const newColumnName = 'BodyfatsWeight';
        const newColumn = {
            name: newColumnName,
            options: { filter: true },
        }
        instance.get('/convert')
            .then(function (res) {
                // const updatedData = res.data.map((row: DataRow) => ({
                //     ...row,
                //     [newColumnName]: 'Bodyfat Weight'  // Or use a calculated value from `res.data`
                // }));
                setData(res.data)
                console.log("res", res)

                // Update the state with new columns and data
                setColumns(prevColumns => [...prevColumns, newColumn]);
                // setData(updatedData);
                console.log("new data", data)
            })
            .catch((error) => {
                console.error("error", error);
            });
    }

    return (
        <div>
            <button onClick={addColumn} style={{ marginBottom: '20px', color: 'black' }}>
                Add Column
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