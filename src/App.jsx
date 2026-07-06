import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Dashboard from './Dashboard'
import { ToastContainer } from 'react-toastify'
import Home from './Home'
import ContactList from './contact/ContactList'
import AddContact from './contact/AddContact'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<ContactList />} />
          <Route path='add-contact' element={<AddContact />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App