import React, { useEffect, useState } from 'react'
import API from '../axios'
import { NavLink, Link, useNavigate } from 'react-router-dom'

export default function Auth() {
    const [error, setError] = useState('')
    const rout = useNavigate()

    useEffect(() => {
        const response = API.get('/auth/user/profile/')
        response.then(({ data }) => {
            if (data) {
                rout('/')
            }
        })
    }, [])

    const hanldeSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData(e.target)
        let data = Object.fromEntries(formData.entries())
        const response = API.post('/auth/user/login/', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response.then(({ data }) => {
            localStorage.setItem('jwt', data.token)
            rout('/')
        }).catch(err => {
            let { data } = err.response
            setError(data.detail)
        })
    }


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
                <p className='text-red-500 text-center h-4 curret-transparent'>{error}</p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onChange={() => setError('')} onSubmit={hanldeSubmit} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="login"
                                type="email"
                                autoComplete="email"
                                autoSave='on'
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                autoSave='on'

                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <Link className='py-2 text-blue-500 hover:text-blue-700 my-5' to={'register'}>Registration</Link>
            </div>
        </div>

    )
}
