import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../axios'
import Loading from '../../components/UI/Loading'
import Button from '../../components/UI/Button'



export default function SiingleFood() {
    const navigate = useNavigate()
    const params = useParams()
    const [food, setFood] = useState({
        loading: false,
        error: '',
        data: null
    })
    useEffect(() => {
        if (!params.foodId) return
        setFood(prev => ({ ...prev, loading: true }))
        const response = API.get(`/foods/${params.foodId}`)
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
        <div className='w-full '>
            <div className='w-full px-5 py-2'>
                <Button onClick={() => navigate(-1)}>Назад</Button>
            </div>
            {
                food.loading && <Loading />
            }
            <h1>{food.data?.title}</h1>

        </div>
    )
}
