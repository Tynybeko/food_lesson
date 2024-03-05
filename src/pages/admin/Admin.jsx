import React, { useState, useEffect } from 'react'
import API from '../../axios'
import Loading from '../../components/UI/Loading'
import { Link } from 'react-router-dom'
import Confirm from '../../components/UI/Confirm'


export default function Admin() {
    const [deletedFood, setDeletedFood] = useState(null)
    
    const [food, setFood] = useState({
        loading: false,
        error: '',
        data: null
    })

    const handleDeleteOurFood = () => {
        alert('DELETED')
    }
    useEffect(() => {
        setFood(prev => ({ ...prev, loading: true }))
        const response = API.get('/foods/')
        response
            .then(res => {
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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {
                food.loading && <Loading />
            }
            {
                deletedFood &&
                <Confirm callback={handleDeleteOurFood} text="Точно хотите удалить?" setCancel={() => setDeletedFood(null)} />
            }
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ingredients
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        food?.data?.map(item => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.title}
                                </th>
                                <td className="px-6 py-4">
                                    {item.description}
                                </td>
                                <td className="px-6 py-4">
                                    {item.ingredients}
                                </td>
                                <td className="px-6 py-4">
                                    ${item.price}
                                </td>
                                <td className="px-6 py-4 ">
                                    <Link to={`update/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                    <button onClick={() => setDeletedFood(item)} className='ml-2 px-2 py-1 bg-red-400 hover:bg-red-600 hover:text-white rounded-lg'>Delete</button>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div>

    )
}
