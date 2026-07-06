import React from 'react'
import { ToastContainer } from 'react-toastify'
import satya from '../src/assets/satya.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate()

  const logout = ()=>{
    localStorage.clear()
    navigate('/login')

  }
  return (
    <div className='dashboard-wrapper'>
      <div className='sideNav'>
        <div className='sidenav-header'>
          <img src={satya}  />
          <h2>SBS App</h2>
        </div>
        <div className='menu'>
          <Link className='menu-link' to='/dashboard/home'><span><i className="fa-solid fa-house"></i></span> Home</Link>
          <Link className='menu-link' to='/dashboard/contact'><span><i className="fa-regular fa-address-book"></i></span> Contact List</Link>
          <Link className='menu-link' to='/dashboard/add-contact'><span><i className="fa-solid fa-plus"></i></span> Add Contact</Link>
          {/* <Link className='menu-link' to='/dashboard'><span><i className="fa-solid fa-arrow-right-from-bracket"></i></span> Logout</Link> */}
        </div>
        <button onClick={logout} type='button' className='logout-btn'><span><i className="fa-solid fa-arrow-right-from-bracket"></i></span> Logout</button>
      </div>

       <div className='dashboard-content'>
        <Outlet/>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Dashboard