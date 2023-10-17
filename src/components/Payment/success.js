import { useEffect, useState } from 'react'
import success from "./success.png"
import {Link} from "react-router-dom"
import axios from 'axios'



const Success = () => {

  

    const [bookingDetail,setBookingDetail] = useState([])
    const booking = localStorage.getItem('booking')
    const transaction = localStorage.getItem('transaction')

    const updatepaymentStatus = async ()=>{
            try{
                const response = await axios.put(`https://sharespace-xwig.onrender.com/api/updatePaymentStatus?transaction=${transaction}&booking=${booking}`,{status:"paid"},{
                        headers: {
                          Authorization:localStorage.getItem('token')
                        }})

                        if(response.status === 200){
                            console.log(response.data)
                            localStorage.removeItem('transaction')
                            localStorage.removeItem('booking') 
                            setBookingDetail(response.data)
                        }


            }catch(e){

                    console.log(e)

            }
    }

    console.log(bookingDetail)
    useEffect(()=>{
            if(booking && transaction){
                updatepaymentStatus()
            }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[booking,transaction])
  return (
    <>
    <div className='row'>
      <div className='col-lg-2'></div>
      
      <div className='col-lg-8 text-center'>
           <h2 className='my-5 p-2 display-6'> <span className='bg-success bg-opacity-25 p-3 shadow rounded-3'>Your WorkSpace Has Been Booked Successfully</span></h2>
           <h2 className='my-5 p-2 display-6'> <span className='bg-success bg-opacity-25 p-3  shadow rounded-3'>ThankYou for Choosing</span></h2>
           <h2 className='my-5 p-2 display-6'> <span className='bg-success bg-opacity-25 p-3  shadow rounded-3'> Share Space &#128512;</span></h2>
           <div className='flex justify-end items-center mx-auto my-24 w-60'>
            <img src={success} alt="succesimg" className='img-thumbnail border-0' width="300px" height="300px"/>
           </div>
           <div className='m-5'>
            <Link to="/userWorkSpaces" className='underline text-xl underline-offset-4'>
              Back to WorkSpaces
            </Link>
           </div>
      </div>
      <div className='col-lg-2'></div>
    </div>
   
    {bookingDetail.length>0&&
      bookingDetail.map((ele,i)=>{
        return<div className='row' key= {i}>
        <div className='col-lg-4 mb-4'>
            <div>
              <h2 className='m-4 p-2 display-5 text-primary'> <span className='bg-warning bg-opacity-25 p-3 shadow-lg rounded-5'>Booking Details</span></h2>
              <h5 className='m-5 p-2 fw-bold'>workSpace Name :<span className='mx-2 text-danger'>{ele.bookingUpdatedDoc?.workSpaceId.name}</span></h5>
              <h5 className='m-5 p-2 fw-bold'> Address :<span className='mx-2 text-danger'> {ele.bookingUpdatedDoc?.workSpaceId.address.name}</span></h5>
              <h5 className='m-5 p-2 fw-bold'> Start Date : <span className='mx-2 text-danger'>{new Date(ele.bookingUpdatedDoc?.startDate).toLocaleDateString()}</span></h5>
              <h5 className='m-5 p-2 fw-bold'> end Date : <span className='mx-2 text-danger'>{new Date(ele.bookingUpdatedDoc?.endDate).toLocaleDateString()}</span></h5>
              <h5 className='m-5 p-2 fw-bold'> totalPrice : <span className='mx-2 text-danger'> &#8377; {ele.bookingUpdatedDoc?.totalPrice} /-</span></h5>
              </div>
        </div>
        <div className='col-lg-4'>
           <img alt="qrCode" className='img-thumbnail' src = {ele.qrCode} width="300px" height="300px"/>
           <a
            href={ele.qrCode} // URL to the image
            download={`qrCode_${i}.png`} // Specify the filename for download
            className="btn btn-primary mt-3"
          >
            Download QR Code
          </a>
        </div>
        <div className='col-lg-4'></div>
      </div>
      })
    }
    </>
  )
}

export default Success
