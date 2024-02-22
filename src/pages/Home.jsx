import React, { useEffect } from 'react'
import API from '../axios'

export default function Home() {
    useEffect(() => {
        const response = API.get('/orders/')
        response.then(data => {
            console.log(data);
        })
        .catch(e => {
            console.log(e.response);
        })
    }, [])
    return (
        <div>Home</div>
    )
}
