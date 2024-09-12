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

    useEffect(() => {
        instance.get('/lifestyle')
            .then(function (res) {
                setData(res.data)
                console.log("res", res.data)
            })
            .catch((error) => {
                console.log("error", error)
            })
    }, [])

    return (
        <div>lifestyletable</div>
    )
}

export default LifestyleTable