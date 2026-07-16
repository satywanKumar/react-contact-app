import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import imageHolder from '../assets/imageHolder.jpg'

const AddContact = () => {
  const[fullName,setFullName] = useState('')
  const[email,setEmail] = useState('')
  const[phone,setPhone] = useState('')
  const[address,setAddress] = useState('')
  const[gender,setGender] = useState('Female')
  const[image,setImage] = useState(null)
  const [loading,setLoading] = useState(false)
  const [imageUrl,setImageUrl] = useState(null)
  const [imageName,setImageName] = useState('no image selected')

  const apibaseUrl = import.meta.env.VITE_API_URL

  const navigate = useNavigate()
  const {state} = useLocation()
  console.log(state)

  useEffect(()=>{
    if(state)
    {
      setFullName(state.fullName)
      setEmail(state.email)
      setPhone(state.phone)
      setGender(state.gender)
      setAddress(state.address)
      setImageUrl(state.imageUrl)
    }
    else
    {
      reset()
    }
  },[state])

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
    if(image)
    {
      formData.append('photo',image)
    }
    

    // console.log(formData)

   if(state)
   {
    // update
    console.log('update')
    const res = await axios.put(`${apibaseUrl}/contact/update/${state._id}`,formData,{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type':'multipart/form-data'
      }
    })
    console.log(res)
    swal("Contact Updated!", "Contact Updated ✅", "success");
    setLoading(false)
    reset()
   }
   else
   {
    console.log('add')
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
   }
   
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
    setImageUrl(null)
  }

  const fileHandler = (e)=>{
    setImageName(e.target.files[0].name)
    setImage(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
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
        <div className='upload-image-wrapper'>
          <img onClick={()=>{document.getElementById("fileInputBtn").click()}} src={imageUrl ? imageUrl : imageHolder} alt='image'/>
          {!state && <span>{imageName}</span>}
          <input id="fileInputBtn" onChange={fileHandler} type="file" />
          {/* <button onClick={()=>{document.getElementById("fileInputBtn").click()}} type='button' className='upload-img-btn'>Select Image</button> */}
        </div>
        <button  className='submit-btn' type='submit'>{loading && <span><i className="fa-solid fa-spinner fa-spin-pulse"></i></span>} {state ? 'Update Contact' : 'Add Contact'}</button>
      </form>
    </div>
  )
}

export default AddContact