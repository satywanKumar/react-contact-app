import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [isLoading,setLoading] = useState(false)

  const navigate = useNavigate()

  const apibaseUrl = import.meta.env.VITE_API_URL

//    const successToast = () => {
//     toast.success('Account Created ✅ !', {
//       position: 'top-right',
//     });
//     }

  const submitHandler = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try
    {
        console.log("Login form submit huwa")
    const newUser = {
        email:email,
        password:password
    }

    const res = await axios.post(`${apibaseUrl}/user/login`,newUser)
    // console.log(res.data)
    localStorage.setItem('token',res.data.token)
    localStorage.setItem('fullName',res.data.fullName)
    setLoading(false)
    toast.success('Login Success ✅ !', {
      position: 'top-right',
    });
    navigate('/dashboard')
    }
    catch(err)
    {
        setLoading(false)
        toast.error('Login Failed !', {
      position: 'top-right',
      // style:{
      //   backgroundColor:'yellow',
      //   borderColor:'black'
      // }
    });
        console.log(err)
    }

  }

  const show = async()=>{
    await successToast()
  }

  return (
    <div className='auth'>
        <h1>Login</h1>
        <form onSubmit={submitHandler} className='auth-form'>
            {/* <input value={fullName} onChange={(e)=>{setFullName(e.target.value)}} type="text" placeholder='Full Name' /> */}
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Email' />
            {/* <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder='Phone' /> */}
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Password' />
            {/* <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="text" placeholder='Confirm Password' /> */}
            <button className='submit-btn' type='submit'>{isLoading && <span><i className="fa-solid fa-spinner fa-spin-pulse"></i></span>} Login</button>
            {/* <button onClick={show}>click</button> */}
        </form>
    <ToastContainer />
    </div>
  )
}

export default Login