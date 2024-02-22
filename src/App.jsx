import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomeLayout from './layout/HomeLayout'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Register from './pages/Register'
import AuthLayout from './layout/AuthLayout'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='/auth' element={<AuthLayout />}>
        <Route index element={<Auth />} />
        <Route path='register' element={<Register />} />
      </Route>
    </Routes>
  )
}

export default App
