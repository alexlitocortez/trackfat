"use client";

import React, { useState, useEffect } from 'react';
import instance from '../helpers/axiosInstance';
import MUIDataTable from 'mui-datatables';
import Box from '@mui/material/Box';

type DataRow = {
    [key: string]: any;
}

interface BodyFatData {
    BodyFatCategory: number;
}

interface DataTableProps {
    token?: string | null;
}

const DataTable: React.FC<DataTableProps> = () => {
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

    const token = localStorage?.getItem('token');

    useEffect(() => {
        if (token) {
            instance.get('/df', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(function (res) {
                    setData(res.data)
                    console.log("res", res)
                    // console.log("token", token)
                })
                .catch((error) => {
                    console.log("error", error)
                })
        } else {
            setData([])
        }
    }, [token])


    const addColumn = () => {
        const newColumnName = 'Bodyfat Weight';
        const newColumn = {
            name: newColumnName,
            options: { filter: true },
        }
        instance.get('/convert')
            .then(function (res) {
                setData(prevData => prevData.map((row, index) => ({
                    ...row,
                    [newColumnName]: res.data[index]?.[newColumnName] || null
                })));
                console.log("res", res)

                // Update the state with new columns and data
                setColumns(prevColumns => [...prevColumns, newColumn]);
                // setData(updatedData);
            })
            .catch((error) => {
                console.error("error", error);
            });
    }

    const mensBodyfatCategory = () => {
        const newColumnName = 'Men BodyFatCategory';
        const newColumn = {
            name: newColumnName,
            options: { filter: true },
        }
        instance.get('/bodyfat-status-men')
            .then(function (res) {
                setData(prevData => prevData.map((row, index) => ({
                    ...row,
                    [newColumnName]: res.data[index]?.[newColumnName] || null
                })));
                setColumns(prevColumns => [...prevColumns, newColumn]);
            })
            .catch((error) => {
                console.error("error", error)
            })
    }

    const womensBodyfatCategory = () => {
        const newColumnName = 'Women BodyFatCategory';
        const newColumn = {
            name: newColumnName,
            options: { filter: true },
        }
        instance.get('/bodyfat-status-women')
            .then(function (res) {
                setData(prevData => prevData.map((row, index) => ({
                    ...row,
                    [newColumnName]: res.data[index]?.[newColumnName] || null
                })))
                console.log("womens bf category", data)

                setColumns(prevColumns => [...prevColumns, newColumn]);
            })
            .catch((error) => {
                console.error("error", error)
            })
    }


    return (
        <div>
            <Box sx={{ marginBottom: '1rem' }}>
                <button onClick={addColumn} className='bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-1'>
                    Bodyfat Weight
                </button>
                <button onClick={mensBodyfatCategory} className='bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mr-1'>
                    Men's BF Category
                </button>
                <button onClick={womensBodyfatCategory} className='bg-black hover:bg-slate-600 text-white font-bold py-2 px-4 rounded' >
                    Women's BF Category
                </button>
            </Box>
            <MUIDataTable
                title={"Bodyfat Data"}
                data={data}
                columns={columns}
            />
        </div>
    )
}

export default DataTable