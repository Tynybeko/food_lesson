import { useState } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import HomeLayout from './layout/HomeLayout'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Register from './pages/Register'
import AuthLayout from './layout/AuthLayout'
import AdminLayout from './layout/AdminLayout'
import SiingleFood from './pages/home/SiingleFood'
import Admin from './pages/admin/Admin'
import Create from './pages/admin/Create'
import Update from './pages/admin/Update'
import Basket from './pages/basket/Basket'
import Histrory from './pages/history/Histrory'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path='food/:foodId' element={<SiingleFood />} />
        <Route path='basket' element={<Basket />} />
        <Route path='history' element={<Histrory />} />
      </Route>
      <Route path='/auth' element={<AuthLayout />}>
        <Route index element={<Auth />} />
        <Route path='register' element={<Register />} />
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Admin />} />
        <Route path='create' element={<Create />} />
        <Route path='update/:foodId' element={<Update />} />
      </Route>

    </Routes>
  )
}

export default App
