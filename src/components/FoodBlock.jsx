import React from 'react'
import ImageBlock from './UI/ImageBlock'
import Button from './UI/Button'
import { Link } from 'react-router-dom'

export default function FoodBlock({ item, setCart }) {

    const handleCart = () => {
        if (item.isCart) {
            setCart(prev => {
                let newData = prev.filter(el => el.id != item.id)
                localStorage.setItem('cart', JSON.stringify(newData))
                return newData
            })
        } else {
            setCart(prev => {
                let newData = [...prev, { ...item, count: 1 }]
                localStorage.setItem('cart', JSON.stringify(newData))
                return newData
            })
        }
    }
    return (
        <div className='max-w-40 rounded-lg bg-blue-300 bg-opacity-70 flex justify-center items-center flex-col p-3'>
            <h1>{item.title}</h1>
            <div className='image-contant h-30'>
                {
                    item.photos.slice(0, 4).map(photo => (
                        <ImageBlock key={photo.id} src={photo.photo} />
                    ))
                }
                {
                    !item.photos.length && <ImageBlock src={''} />
                }
            </div>
            <div className='py-2 flex w-full items-center flex-col justify-center gap-2'>
                <Button onClick={handleCart}>{!item.isCart ? 'Добавить' : 'В корзине'}</Button>
                <Button><Link to={`food/${item.id}`}>Перейти</Link></Button>
            </div>
        </div>
    )
}
