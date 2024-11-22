"use client";

import React, { useState, useEffect } from 'react';
import instance from '../helpers/axiosInstance';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import Box from '@mui/material/Box';

type DataRow = {
    [key: string]: any;
}

interface DataTableProps {
    token?: string | null;
}

type Column = {
    name: string;
    options?: {
        customBodyRender?: (value: any) => React.ReactNode;
    }
}


const DataTable: React.FC<DataTableProps> = () => {
    const [data, setData] = useState<DataRow[]>([]);
    const [columns, setColumns] = useState<Column[]>([
        {
            name: 'Age',
            options: {
                customBodyRender: (value: number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        {
            name: 'Abdomen',
            options: {
                customBodyRender: (value: number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        {
            name: 'Ankle',
            options: {
                customBodyRender: (value: number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        {
            name: 'Biceps',
            options: {
                customBodyRender: (value: number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        // {
        //     name: 'Wrist'
        // },
        // {
        //     name: 'Thigh'
        // },
        // {
        //     name: 'Neck',
        // },
        // {
        //     name: 'Knee',
        // },
        {
            name: 'Height',
            options: {
                customBodyRender: (value: number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        // {
        //     name: 'Hip',
        // },
        // {
        //     name: 'Forearm',
        // },
        {
            name: 'Density',
            options: {
                customBodyRender: (value: number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        // {
        //     name: 'Chest',
        // },
        {
            name: 'BodyFat',
            options: {
                customBodyRender: (value: number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
            }
        },
        {
            name: 'Weight',
            options: {
                customBodyRender: (value: number) => (
                    <div style={{ textAlign: 'center' }}>
                        {value}
                    </div>
                )
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
            <Box sx={{ marginBottom: '1rem', display: 'flex' }}>
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
                options={{
                    responsive: 'simple'
                }}
            />
        </div>
    )
}

export default DataTable