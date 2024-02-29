import React, { useContext, useEffect, useState } from 'react'
import API from '../axios'
import Loading from '../components/UI/Loading'
import ImageBlock from '../components/UI/ImageBlock'
import Button from '../components/UI/Button'
import FoodBlock from '../components/FoodBlock'
import CartContext from '../context/CartContext'

export default function Home() {
    const cart = useContext(CartContext)
    const [food, setFood] = useState({
        loading: false,
        error: '',
        data: null
    })
    useEffect(() => {
        setFood(prev => ({ ...prev, loading: true }))
        const response = API.get('/foods/')
        response
            .then(res => {
                console.log(res);
                setFood(prev => ({ ...prev, data: res.data }))
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setFood(prev => ({ ...prev, loading: false }))
            })
    }, [])
    return (
        <div>
            {
                food.loading && <Loading />
            }

            <div className='grid grid-cols-5 px-5 py-3'>
                {
                    food?.data?.map(item => (
                        <FoodBlock setCart={cart.setCart} item={{ ...item, isCart: cart.cart.some(el => el.id == item.id) }} />
                    ))
                }
            </div>



        </div>
    )
}
