 
import { useState } from "react"

import { Modal, Button } from 'react-bootstrap';
 import axios from 'axios'

 import Rating from "../User/rating";
import ReviewItem from "./reviewItem";


 function ReviewContainer  (props){

    const {reviews,id,addReview,del,updateReview} = props 

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };

      const [rating, setRating] = useState(0);
      const [comment,setComment] = useState('')

      



    
  const handleRatingChange = (newRating) => {
      console.log(newRating,"new rating")
    setRating(newRating);
  }
  console.log('input rating',rating)
      const handleSubmit = async (e)=>{
          e.preventDefault()
            try{
                const response = await axios.post(`http://127.0.0.1:3857/api/reviews/${id}`,{rating,comment},{
                    headers:{
                        Authorization: localStorage.getItem('token')
                    }
                })
                if(response.status ===200){
                    setShowModal(false)
                    setRating(0)
                    setComment('')
                    // console.log(response.data)
                    addReview(response.data)
                }

            }catch(e){
                console.log(e)
            }
      }

   




    


    return(
        <>
               {localStorage.getItem('token')&& <button className="btn btn-danger fw-bold m-5" onClick={handleShowModal}> Write A Review </button>}
            <div className="row bg-info bg-opacity-25 rounded-3 shadow-lg px-4">
                    <h4 className="display-4 my-3 py-2 text-center"> Reviews </h4>
                {
                    reviews.length >0 && reviews.map((ele,i)=>{
                        return <ReviewItem del={del} {...ele} updateReview={updateReview} key={i}/>
                    })
                }
            </div>
           
            



            <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">FeedBack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <h6 className="fw-bold"> Rating </h6>
          <Rating rating={rating} onChange={handleRatingChange} />
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label fw-bold">Comment </label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"value={comment} onChange={(e)=>{setComment(e.target.value)}} ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Send Review
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
 }

 export default ReviewContainer