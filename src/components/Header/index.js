import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {

  const navigate = useNavigate();

  const logoutHandeler=()=>{
    localStorage.removeItem('userData');
    navigate('/login');
  }

  return (
    <div>

      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand text-white fw-bold ms-2 mt-2 fs-3">Bouquets Mart</Link>
         
          <div>
            <Link to='/profile'>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-circle text-white me-2" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
              </svg>
            </Link>
            <button className='btn btn-danger mx-2' onClick={logoutHandeler}>Logout</button>
          </div>
      
           
      
        </div>
      </nav>

    </div>
  )
}
