import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'

const ContactList = () => {
  const [contactList, setContactList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getContact();
  }, [])

  const getContact = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact/all-contact`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log(res.data)
      setContactList(res.data.contacts)
      setLoading(false)

    }
    catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <>
      {
        isLoading ?
          <div>
            loading data........
          </div>
          :
          <div>
            {contactList.length == 0 ?
              <p>No Contact Found, <Link to="/dashboard/add-contact">Add Contact</Link></p>
              :
              <div className="contact-wrapper">
                {
                  contactList.map(contact => (
                    <div onClick={() => { navigate('/dashboard/contact-detail/' + contact._id) }} className='contact-card' key={contact._id}>
                      <img src={contact.imageUrl} alt="image" />
                      <p className='fullName'>{contact.fullName}</p>
                      <p className='phone'>{contact.phone}</p>
                    </div>
                  ))
                }
              </div>
            }
          </div>
      }
    </>
  )
}

export default ContactList