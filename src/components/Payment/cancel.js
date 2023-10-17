import  { useEffect } from 'react'
import cancel from "./cancel.png"
import {Link} from "react-router-dom"
import axios from 'axios'

const Cancel = () => { 

  const booking = localStorage.getItem('booking')

    const cancelBooking = async ()=>{
        try{
          const response = axios.delete(`https://sharespace-xwig.onrender.com/api/updateBookingStatus?booking=${booking}`,{
            headers:{
              Authorization: localStorage.getItem('token')
            }
          })
          if(response.status === 200){
            console.log(response.data)
          }


        }catch(e){

          console.log(e)

        }
    }

      useEffect(()=>{
          cancelBooking()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])


  return (
    <div className='grid place-items-center w-full lg:h-screen h-full font-raleway bg-[#F7F7F7]'>
      
      <div className='row'>
      <div className='col-lg-2'></div>
      
      <div className='col-lg-8 text-center'>
           <h2 className='my-5 p-2 display-6'> <span className='bg-danger bg-opacity-25 p-3  shadow rounded-3'>Booking has not been completed due </span></h2>
           <h2 className='my-5 p-2 display-6'> <span className='bg-danger bg-opacity-25 p-3 shadow rounded-3'> to an unsuccessful payment &#128531;</span></h2>
           <div className='flex justify-end items-center mx-auto my-24 w-60'>
            <img src={cancel} alt="succesimg" className='img-thumbnail border-0' width="300px" height="300px"/>
           </div>
           <div className='m-5'>
            <Link to="/userWorkSpaces" className='underline text-xl underline-offset-4'>
              Back to WorkSpaces
            </Link>
           </div>
      </div>
      <div className='col-lg-2'></div>
    </div>
    </div>
  )
}

export default Cancel
