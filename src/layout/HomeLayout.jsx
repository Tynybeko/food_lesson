import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import CartContext from '../context/CartContext'

export default function HomeLayout() {
    const [cart, setCart] = useState([])
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('cart') ?? '[]')
        setCart(data)
    }, [])
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            <div>
                <Header />
                <Outlet />
            </div>
        </CartContext.Provider>

    )
}
