import React, { useContext, useState } from 'react'
import CartContext from '../../context/CartContext'
import { FoodCartBlock } from '../../components/FoodBlock'
import Button from '../../components/UI/Button'
import API from '../../axios'
import Loading from '../../components/UI/Loading'
import Confirm from '../../components/UI/Confirm'
import { useNavigate } from 'react-router-dom'
export default function Basket() {
    const { cart, setCart } = useContext(CartContext)
    const navigate = useNavigate()
    const [send, setSend] = useState(false)
    const [resState, setResState] = useState({
        error: '',
        loading: false,
        succes: ''
    })
    const handleSubmit = () => {
        setResState(prev => ({ ...prev, loading: true }))
        const response = API.post('/orders/', {
            payment: true,
            items: cart.map(item => ({ food: item.id, quantity: item.count }))
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response.then(res => {
            setCart([])
            navigate('/')
            localStorage.removeItem('cart')
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setResState(prev => ({ ...prev, loading: false }))

        })

    }
    return (
        <div className='flex p-4 gap-4 flew-wrap'>
            {
                send && <Confirm text={'Точно хотите отправить заказ?'} callback={handleSubmit} setCancel={() => setSend(false)}/>
            }
            {
                resState.loading && <Loading />
            }
            {
                cart && cart.map(item => (
                    <FoodCartBlock setCart={setCart} item={item} />
                ))
            }
            <div className='fixed bottom-0 bg-yellow-300 w-full left-0 px-4 py-2 flex justify-between'>
                <h1 className='underline'> <span className='text-blue-500 '>Итог:</span> {cart.reduce((acc, item) => acc += item.count * item.price, 0)}</h1>
                <Button onClick={() => setSend(prev => !prev)}>Отправить</Button>
            </div>
        </div>
    )
}
