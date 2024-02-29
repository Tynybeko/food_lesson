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

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path='food/:foodId' element={<SiingleFood />} />
      </Route>
      <Route path='/auth' element={<AuthLayout />}>
        <Route index element={<Auth />} />
        <Route path='register' element={<Register />} />
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
          {/* 1) Read Admin.jsx */}
          {/* 2) Update Update.jsx */}
          {/* 3) Create Create.jsx */}
      </Route>

    </Routes>
  )
}

export default App
