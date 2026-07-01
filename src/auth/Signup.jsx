import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [fullName,setFullName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const apibaseUrl = import.meta.env.VITE_API_URL

  const submitHandler = async(e)=>{
    e.preventDefault()
    try
    {
        console.log("signup form submit huwa")
    const newUser = {
        fullName:fullName,
        email:email,
        phone:phone,
        password:password
    }

    const res = await axios.post(`${apibaseUrl}/user/signup`,newUser)
    console.log(res.data.data)
    navigate('/login')
    }
    catch(err)
    {
        console.log(err)
    }

  }

  return (
    <div className='signup'>
        <h1>Create Your Account</h1>
        <form onSubmit={submitHandler} className='auth-form'>
            <input value={fullName} onChange={(e)=>{setFullName(e.target.value)}} type="text" placeholder='Full Name' />
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Email' />
            <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder='Phone' />
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder='Password' />
            <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="text" placeholder='Confirm Password' />
            <button type='submit'>Create Account</button>
        </form>
    </div>
  )
}

export default Signup