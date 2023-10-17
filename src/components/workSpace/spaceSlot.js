/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function SpaceSlot(props) {
  const { isAvailable, num ,_id,spaceEdit,spaceDelete} = props;
  const [showModal, setShowModal] = useState(false);


  const [editForm,setEditForm] = useState({
    isAvailable:isAvailable,tenentId:null
  })

  const [spaceDetails,setSpaceDetails] = useState({})
  const [BookingDetails,setBookingDetails] = useState({})

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

    const geteditDetails = async ()=>{
        try{
          const response = await axios.get(`https://sharespace-xwig.onrender.com/api/editspaces/${_id}`,{
            headers:{
              Authorization: localStorage.getItem('token')
            }
          })
           
          if(response.status ===200){
            console.log(response.data)
            setSpaceDetails(response.data.spaceDetails)
            setBookingDetails(response.data.bookingdetails)
          }


        }catch(e){

          console.log(e)


        }

    }


  useEffect(()=>{
    if(showModal){

      geteditDetails()
    }
    
  },[showModal])


  const handleEdit = async ()=>{
        try{

            const response = await axios.put(`https://sharespace-xwig.onrender.com/api/spaces/${_id}`,editForm,{
                headers: {
                    Authorization:localStorage.getItem('token')
                  }
            })
            if(response.status ===200){
                setShowModal(false);
                spaceEdit(response.data)
            }

        }catch(e){
            console.log(e)
        }
  }

  const handleDelete = async ()=>{
      try{

        const response = await axios.delete(`https://sharespace-xwig.onrender.com/api/spaces/${_id}`,{
            headers: {
                Authorization:localStorage.getItem('token')
              }
        })
        if(response.status ===200){
            setShowModal(false);
            console.log(response.data)
            spaceDelete(response.data)
        }

    }catch(e){
        console.log(e)
    }
    }

  return (
    <div className="col-lg-1 m-3 text-center">
      {' '}
      <input
        type="checkbox"
        className="form-check"
        style={{ width: '25px', height: '25px' }}
        checked={!isAvailable}
        readOnly
      />{' '}
      <p>{num}</p>
      <button className="btn btn-warning fw-bold my-2" onClick={handleShowModal}>
        Edit
      </button>
      <button className="btn btn-primary fw-bold my-2" onClick={handleDelete}>
        Delete
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Space</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
                <label className='fw-bold'> availability : <input type="checkbox" checked={editForm.isAvailable} onChange={(e)=>{setEditForm({...editForm,isAvailable:e.target.checked})}}/></label> <br/>
                {!isAvailable && (<div><p>{spaceDetails.tenentId?.username}</p>
                <p>{spaceDetails.tenentId?.email}</p>
                <p>From:{new Date(BookingDetails?.startDate).toLocaleDateString()}</p>
                <p>Till:{new Date(BookingDetails?.endDate).toLocaleDateString()}</p></div>)}
               
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SpaceSlot;
