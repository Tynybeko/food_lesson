import React from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

const navData = [
  {
    id: 1,
    title: 'Админка',
    href: '/admin',
  },
  {
    id: 1,
    title: 'Создание',
    href: 'create',
  }
]

export default function AdminLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return (
    <div>
      <header className='flex justify-between  px-4 py-4 bg-red-400 bg-opacity-80 '>
        <button onClick={() => navigate('/')} className='px-2 py-1 rounded-lg bg-blue-300 hover:bg-blue-700'>Назад</button>
        <nav className='flex gap-2 items-center'>
          {
            navData.map(item => (
              <NavLink key={item.id} className={() => pathname.endsWith(item.href) ? "px-2 py-1.5 bg-yellow-500 rounded-lg" : "px-2 py-1.5 bg-yellow-300 hover:bg-yellow-500 rounded-lg"} to={item.href}>{item.title}</NavLink>
            ))
          }

        </nav>
      </header>
      <Outlet />
    </div>
  )
}
