import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from 'html5-qrcode';


function VerifyBooking(props) {
  const [qrData, setQrData] = useState([]);

  const [bookingDetail,setBookingDetail] = useState({})

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 300,
        height: 300
      },
    });

    scanner.render(success, error);

    function success(result) {
      console.log(result, 'result');
      scanner.clear();
      setQrData(result);
      setBookingDetail(JSON.parse(result))
    }

    function error(err) {
      console.log(err);
    }

   
  }, []);

  console.log( bookingDetail)
  return (
    <>
      <div id='reader'></div>
      {qrData && (
        <div>
          <div className='col-lg-12 mb-4'>
            { Object.keys(bookingDetail).length >0 && <div>
              <h2 className='m-4 p-2 display-5 text-primary'> <span className='bg-warning bg-opacity-25 p-3 shadow-lg rounded-5'>Booking Details</span></h2>
              <h5 className='m-5 p-2 fw-bold'>workSpace Name :<span className='mx-2 text-danger'>{bookingDetail?.workSpaceId.name}</span></h5>
              <h5 className='m-5 p-2 fw-bold'> Address :<span className='mx-2 text-danger'> {bookingDetail?.workSpaceId.address.name}</span></h5>
              <h5 className='m-5 p-2 fw-bold'> Start Date : <span className='mx-2 text-danger'>{new Date(bookingDetail?.startDate).toLocaleDateString()}</span></h5>
              <h5 className='m-5 p-2 fw-bold'> end Date : <span className='mx-2 text-danger'>{new Date(bookingDetail?.endDate).toLocaleDateString()}</span></h5>
              <h5 className='m-5 p-2 fw-bold'> totalPrice : <span className='mx-2 text-danger'> &#8377; {bookingDetail?.totalPrice} /-</span></h5>
              </div>}
        </div>
        </div>
      )}
    </>
  );
}

export default VerifyBooking;
