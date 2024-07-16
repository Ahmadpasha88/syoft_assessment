import React, { useEffect } from 'react'
import Header from '../Header'
import './index.css'
import BouquetsData from '../../BouquetsData'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'

export default function Home() {
const isLogedIn = localStorage.getItem('userData');

const navigate = useNavigate();


useEffect(() => {
  if (!isLogedIn) {
      navigate('/login');
  }
}, [isLogedIn, navigate])



  return (
    <div>
      <Header />
      <div className='bg-body-tertiary homeContainer'>

        <div className='row col-11 col-lg-10 m-auto p-2 gap-5'>
          {
            BouquetsData.map((e) =>
              <div className='flower_card col-11 col-lg-3 p-2 flex-grow-1' key={e.boquet_name}>
                <img src={e.boquet_images} className='flower_card_image' alt={e.boquet_name} />
                <p className='p-0 m-0 text-center fw-bold'>{e.boquet_name}</p>
                <p className='p-0 m-0 fw-medium'>Price: {e.price}</p>
                <p className='p-0 m-0 fw-medium'>Rating: {e.rating} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFD700" className="bi bi-star-fill mb-1" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg></p>
              </div>)
          }
        </div>

      </div>
      <Footer />
    </div>
  )
}
