import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const ContactDetail = () => {
//   const {state} = useLocation()
//   console.log(state)
const [contact,setContact] = useState({})
const [isLoading,setLoading] = useState(false)
const [hasError,setError] = useState(false)
const {id} = useParams();

useEffect(()=>{
  console.log('use effect called')
  getContactById()
},[])

const getContactById = async()=>{
   try
    {
      setLoading(true)
      console.log('api called')
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact/contactById/${id}`,{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(res.data)
    setContact(res.data.contact)
    setLoading(false)
  }
    catch(err)
    {
      console.log(err)
      setLoading(false)
      toast.error('Something is wrong !', {position: 'top-right'});
      setError(true)
    }
    
}
  return (
    <div className='contact-detail-wrapper'>
       <div className='contact-detail-box'>
        <img src={contact.imageUrl} alt='profile'/>
        <div className='contact-detail-card'>
          <h1>{contact.fullName}</h1>
          <p>Email : {contact.email}</p>
          <p>Phone : {contact.phone}</p>
          <p>Gender : {contact.gender}</p>
          <p>Address : {contact.address}</p>
          <div style={{display:'flex',gap:10,paddingTop:10}}>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
       </div>

    <ToastContainer/> 
    </div>
  )
}

export default ContactDetail