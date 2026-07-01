import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Dashboard from './Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/"  element={<Login/>} />
        <Route path="/login"  element={<Login/>} />
        <Route path="/signup"  element={<Signup/>} />
        <Route path="/dashboard"  element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default App