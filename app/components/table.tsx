"use client";

import React, { useState, useEffect } from 'react';
import instance from '../helpers/axiosInstance';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function DataTable() {
    const [data, setData] = useState([])

    useEffect(() => {
        instance.get('/df')
            .then(function (res) {
                setData(res.data)
                console.log("data", data)
            })
    }, [])

    const options = {
        filterType: 'checkbox'
    }

    const getMuiTheme = () => createTheme({
        components: {
            MUIDataTable: {
                styleOverrides: {
                    tableBody: {
                        display: 'flex',
                        justifyContent: 'center',
                        margin: 'auto'
                    }
                }
            }
        }
    })

    return (
        <div>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Bodyfat Data"}
                    data={data}
                    columns={["id", "Density", "BodyFat", "Age", "Weight", "Height", "Neck", "Chest", "Abdomen", "Hip", "Thigh", "Knee", "Ankle", "Biceps", "Forearm", "Wrist"]}
                />
            </ThemeProvider>
        </div>
    )
}

export default DataTable