import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ContactList = () => {
  const [contactList,setContactList] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    getContact();
  },[])

  const getContact = async()=>{
    try
    {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact/all-contact`,{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log(res.data)
    setContactList(res.data.contacts)

    }
    catch(err)
    {
      console.log(err)
    }
  }

  return (
    <div className="contact-wrapper">
      {
        contactList.map(contact=>(
          <div onClick={()=>{navigate('/dashboard/contact-detail/'+contact._id)}} className='contact-card' key={contact._id}>
            <img src={contact.imageUrl} alt="image" />
            <p className='fullName'>{contact.fullName}</p>
            <p className='phone'>{contact.phone}</p>
          </div>
        ))
      }
    </div>
  )
}

export default ContactList