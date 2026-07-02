import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const [fullName,setFullName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
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
        console.log("signup form submit huwa")
    const newUser = {
        fullName:fullName,
        email:email,
        phone:phone,
        password:password
    }

    const res = await axios.post(`${apibaseUrl}/user/signup`,newUser)
    console.log(res)
    setLoading(false)
    toast.success('Account Created ✅ !', {
      position: 'top-right',
    });
    navigate('/login')
    }
    catch(err)
    {
        setLoading(false)
        toast.error('Account Creation Failed !', {
      position: 'top-right',
      style:{
        backgroundColor:'yellow',
        borderColor:'black'
      }
    });
        console.log(err)
    }

  }

  const show = async()=>{
    await successToast()
  }

  return (
    <div className='auth'>
        <h1>Create Your Account</h1>
        <form onSubmit={submitHandler} className='auth-form'>
            <input value={fullName} onChange={(e)=>{setFullName(e.target.value)}} type="text" placeholder='Full Name' />
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Email' />
            <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="text" placeholder='Phone' />
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder='Password' />
            {/* <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="text" placeholder='Confirm Password' /> */}
            <button className='submit-btn' type='submit'>{isLoading && <span><i className="fa-solid fa-spinner fa-spin-pulse"></i></span>} {isLoading ? 'Creating Account' : 'Create Account'}</button>
            {/* <button onClick={show}>click</button> */}
        </form>
    <ToastContainer />
    </div>
  )
}

export default Signup