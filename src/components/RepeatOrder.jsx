import React, { useState, useEffect } from 'react'
import API from '../axios'
import Modal from './UI/Modal'
import { FoodCartBlock } from './FoodBlock'
import Loading from './UI/Loading'
import Button from './UI/Button'
import Confirm from './UI/Confirm'

export default function RepeatOrder({ setClose, items, setHistory }) {
    const [state, setState] = useState(items)
    const [send, setSend] = useState(false)

    const [resState, setResState] = useState({
        loading: false,
    })
    const handleSubmit = () => {
        setResState(prev => ({ ...prev, loading: true }))
        const response = API.post('/orders/', {
            payment: true,
            items: state.map(item => ({ food: item.id, quantity: item.count }))
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response.then(res => {
            setHistory(prev => ({ ...prev, data: [ ...prev.data, res.data,] }))
            setClose(null)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setResState(prev => ({ ...prev, loading: false }))

        })

    }

    useEffect(() => {
        setResState(prev => ({ ...prev, loading: true }))
        const res = API.get('/foods/')
        res
            .then(res => {
                if (state) {
                    setState(prev => {
                        let newData = prev.map(item => {
                            let food = res.data.find(el => el.id == item.food)
                            if (food) {
                                return { ...food, count: item.quantity }
                            }
                            return null
                        })
                        return newData.filter(item => item)
                    })
                }
            })
            .finally(() => {
                setResState(prev => ({ ...prev, loading: false }))
            })
    }, [])

    return (
        <Modal setClose={() => setClose(null)}>
            <div className='flex gap-4 bg-yellow-300 p-5 rounded-xl flex-col'>
                <div className='flex gap-4'>
                    {
                        state && state.map(item => (
                            <FoodCartBlock setCart={setState} item={item} />
                        ))

                    }
                </div>
                {
                    send && <Confirm text={'Точно хотите отправить заказ?'} callback={handleSubmit} setCancel={() => setSend(false)} />
                }
                {
                    resState.loading && <Loading />
                }

                <div>
                    <Button onClick={() => setSend(prev => !prev)}>Отправить</Button>

                </div>

            </div>
        </Modal>
    )
}
