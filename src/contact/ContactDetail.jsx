import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';

const ContactDetail = () => {
  //   const {state} = useLocation()
  //   console.log(state)
  const [contact, setContact] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [hasError, setError] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)
  const { id } = useParams();

  const navigate = useNavigate()

  useEffect(() => {
    console.log('use effect called')
    getContactById()
  }, [])

  const getContactById = async () => {
    try {

      setLoading(true)
      console.log('api called')
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact/contactById/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(res.data)
      setContact(res.data.contact)
      setLoading(false)
    }
    catch (err) {
      console.log(err)
      setLoading(false)
      toast.error('Something is wrong !', { position: 'top-right' });
      setError(true)
    }

  }

  const deleteHandler = async (id) => {

    try {
      const confirm = await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      console.log(confirm)
      if(confirm)
      {
        setDeleteLoader(true)
      await axios.delete(`${import.meta.env.VITE_API_URL}/contact/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDeleteLoader(false)
      navigate('/dashboard/contact')
      await swal("Deleted!", "Contact Deleted!", "success");
      }
      
    }
    catch (err) {
      console.log(err)
      await swal("Failed!", "Failed to Delete data!", "error");

    }
  }
  return (
    <div className='contact-detail-wrapper'>
      {isLoading ? <span><i className="fa-solid fa-spinner fa-spin-pulse"></i></span>
      :
      <div className='contact-detail-box'>
        <img src={contact.imageUrl} alt='profile' />
        <div className='contact-detail-card'>
          <h1>{contact.fullName}</h1>
          <p>Email : {contact.email}</p>
          <p>Phone : {contact.phone}</p>
          <p>Gender : {contact.gender}</p>
          <p>Address : {contact.address}</p>
          <div style={{ display: 'flex', gap: 10, paddingTop: 10 }}>
            <button onClick={()=>{navigate('/dashboard/edit',{state:contact})}} className='btn edit-btn'><span><i className="fa-solid fa-pen-to-square"></i></span> Edit</button>
            <button onClick={() => { deleteHandler(contact._id) }} className='btn delete-btn'>{deleteLoader && <span><i className="fa-solid fa-spinner fa-spin-pulse"></i></span>}  {!deleteLoader && <span><i className="fa-solid fa-trash-can"></i></span>} Delete</button>
          </div>
        </div>
      </div>
      }
      <ToastContainer />
    </div>
  )
}

export default ContactDetail