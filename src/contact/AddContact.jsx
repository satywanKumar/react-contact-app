import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const AddContact = () => {
  const[fullName,setFullName] = useState('')
  const[email,setEmail] = useState('')
  const[phone,setPhone] = useState('')
  const[address,setAddress] = useState('')
  const[gender,setGender] = useState('Female')
  const[image,setImage] = useState(null)
  const [loading,setLoading] = useState(false)

  const apibaseUrl = import.meta.env.VITE_API_URL

  const navigate = useNavigate()


  const submitHandler = async(e)=>{
    e.preventDefault()
    setLoading(true)
    console.log(fullName,email,phone,gender,address,image)
    try
    {
      const formData = new FormData()
    formData.append('fullName',fullName)
    formData.append('email',email)
    formData.append('phone',phone)
    formData.append('address',address)
    formData.append('gender',gender)
    formData.append('photo',image)

    // console.log(formData)

    const res = await axios.post(`${apibaseUrl}/contact/add-contact`,formData,{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type':'multipart/form-data'
      }
    })

    console.log(res)
    swal("Contact Added!", "New Contact Added ✅", "success");
    setLoading(false)
    reset()
    navigate('/dashboard/contact')
    }

    catch(err)
    {
      console.log(err)
      setLoading(false)
      swal("Failed!", "fail to add contact..❌", "error");
    }
  }

  const reset = ()=>{
    setFullName("")
    setPhone("")
    setEmail("")
    setAddress("")
    setGender("Female")
    document.getElementById('contactForm').reset()
    setImage(null)
  }

  return (
    <div className='add-contact'>
      <form id='contactForm' className='contact-form' onSubmit={submitHandler}>
        <input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" placeholder='Full Name' />
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder='Email' />
        <input onChange={(e)=>setPhone(e.target.value)} value={phone} type="text" placeholder='Phone' />
        <input onChange={(e)=>setAddress(e.target.value)} value={address} type="text" placeholder='Address' />
        <select onChange={(e)=>setGender(e.target.value)}  value={gender}>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <input  onChange={(e)=>{setImage(e.target.files[0])}} type="file" />
        <button  className='submit-btn' type='submit'>{loading && <span><i className="fa-solid fa-spinner fa-spin-pulse"></i></span>} Add Contact</button>
      </form>
    </div>
  )
}

export default AddContact