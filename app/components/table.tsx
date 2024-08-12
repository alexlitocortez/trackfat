"use client";

import React, { useEffect } from 'react';
import instance from '../helpers/axiosInstance';

function DataTable() {

    useEffect(() => {
        instance.get('/df')
            .then(function (res) {
                console.log("res", res)
            })
    }, [])

    return (
        <div>table</div>
    )
}

export default DataTable