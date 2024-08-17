"use client";

import React, { useState, useEffect } from 'react';
import instance from '../helpers/axiosInstance';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { error } from 'console';


function DataTable() {
    const [data, setData] = useState([])

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

    const columns = [
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
    ]

    // const getMuiTheme = () => createTheme({
    //     components: {
    //         MUIDataTable: {
    //             styleOverrides: {
    //                 root: {
    //                     backgroundColor: 'red'
    //                 }
    //             }
    //         }
    //     }
    // })

    return (
        <div>
            {/* <ThemeProvider theme={getMuiTheme()}> */}
            <MUIDataTable
                title={"Bodyfat Data"}
                data={data}
                columns={columns}
            />
            {/* </ThemeProvider> */}
        </div>
    )
}

export default DataTable