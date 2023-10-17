 import Rating from "../User/rating"
 import { workSpaceContext } from "../../App"
import { useContext ,useState} from "react"
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios'

 function ReviewItem (props){
    const {workSpaceState} = useContext(workSpaceContext)
        const {comment,rating,userId,createdAt,_id,del,updateReview} = props
        console.log(rating,"single rating star")


        const [showModal, setShowModal] = useState(false);
        const handleShowModal = () => {
            setShowModal(true);
          };
        
          const handleCloseModal = () => {
            setShowModal(false);
          };
          const handleRatingChange = (newRating) => {
            console.log(newRating,"new rating")
          setRating(newRating);
        }
          const [erating, setRating] = useState(rating);
          const [ecomment,setComment] = useState(comment)

        const handleDelete = async (id)=>{
            try{
                const response = await axios.delete(`https://sharespace-xwig.onrender.com/api/reviews/${id}`,{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })

                if(response.status ===200){

                    del(response.data)

                }

            }catch(e){

                console.log(e)

            }
        }

 

        const handleUpdate = async(e)=>{
            e.preventDefault()
            try{
                const response = await  axios.put(`https://sharespace-xwig.onrender.com/api/reviews/${_id}`,{rating:erating,comment:ecomment},{
                    headers:{
                        Authorization: localStorage.getItem('token')
                    }
                })

                if(response.status ===200){
                    updateReview(response.data)
                    setShowModal(false)
                }


            }catch(e){

            console.log(e)



            }
        }


    return(
        <div className="col-lg-5 bg-white bg-opacity-25 rounded-3 shadow m-3 p-4">
            <h6> {userId.username}</h6>
            <h6> {userId.email}</h6>
            <Rating key={rating} rating={rating} />
            <p>{comment}</p>
            <p>{new Date(createdAt).toLocaleString()}</p>
            {userId._id === workSpaceState.userDetails._id && <button className="btn btn-danger mx-2" onClick={handleShowModal}>Edit</button>}
            {userId._id === workSpaceState.userDetails._id && <button className="btn btn-danger mx-2" onClick={()=>{handleDelete(_id)}}>Delete</button>}

            <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">FeedBack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <h6 className="fw-bold"> Rating </h6>
          <Rating rating={erating} onChange={handleRatingChange} />
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label fw-bold">Comment </label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"value={ecomment} onChange={(e)=>{setComment(e.target.value)}} ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Send Review
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
 }
 
 export default ReviewItem