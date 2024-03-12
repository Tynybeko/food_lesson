import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../axios'
import Button from '../../components/UI/Button'



export default function Update() {
  const [inputValue, setInputValue] = useState({})
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const [error, setError] = useState()
  const params = useParams()
  useEffect(() => {
    if (!params.foodId) return
    setLoading(true)
    API.get(`/foods/${params.foodId}`)
      .then(res => setInputValue(res.data))
      .catch(ee => setError(ee.response.status))
      .finally(() => setLoading(false))

    API.get(`/categories/`)
      .then(res => setCategories(res.data))
      .catch(err => setError(err.response.status))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const response = API.patch(`/foods/${inputValue.id}/`, inputValue, { headers: { 'Content-Type': 'application/json' } })
    response.then(res => console.log(res))
      .catch(err => console.log(err))
  }


  const handleChange = (e) => {
    let key = e.target.name
    let value = e.target.value
    setInputValue(prev => ({ ...prev, [key]: value }))
  }
  return (
    <div className='w-full flex justify-center'>
      <form onSubmit={handleSubmit} className='mx-auto w-50 rounded-xl' action="">
        <label htmlFor="">
          <p>Название</p>
          <input onChange={handleChange} className='border-2 outline-none border-green-300 focus:border-green-700' name='title' value={inputValue.title} type="text" />
        </label>
        <label htmlFor="">
          <p>Описание</p>
          <input onChange={handleChange} className='border-2 outline-none border-green-300 focus:border-green-700' name='description' value={inputValue.description} type="text" />
        </label>
        <label htmlFor="">
          <p>Цена</p>
          <input onChange={handleChange} className='border-2 outline-none border-green-300 focus:border-green-700' name='price' value={inputValue.price} type="number" />
        </label>
        <label htmlFor="">
          <p>Ингредиенты</p>
          <input onChange={handleChange} className='border-2 outline-none border-green-300 focus:border-green-700' name='ingredients' value={inputValue.ingredients} type="text" />
        </label>

        <label htmlFor="">
          <p>Category</p>
          <select onChange={handleChange} name="category" id="">
            {
              categories && categories.map(item => (
                <option value={item.id}>{item.name}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="">
          {
            inputValue?.photos?.map(item => (
              <img src={item.photo} alt="IMg" />
            ))
          }
        </label>
        <div className='flex justify-between'>
          <Button type="submit">Сохранить</Button>
          <Button onClick={() => navigate(-1)} type="button">Отмена</Button>
        </div>

      </form>



    </div>
  )
}
