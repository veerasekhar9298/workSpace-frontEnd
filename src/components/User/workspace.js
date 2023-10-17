
// import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Rating from "./rating";
function UserWorkSpace(props) {
  const navigate = useNavigate();




  const { _id, name, images,averageRating } = props;


  
  const handleShow = (id) => {
    navigate(`/ShowWorkSpace/${id}`);
  };
    // console.log(averageRating)

    
    

  return (
    <div className="col-lg-4 my-4">
      <Card className="h-100 border-0 shadow">
        <Card.Img variant="top" src={images[0]} alt="workspace img" style={{ height: "200px" }} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
        <Rating key={averageRating} rating={averageRating}/>
          <Button className="fw-bold my-3"
            variant="warning"
            onClick={() => {
              handleShow(_id);
            }}
          >
            Show More...
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserWorkSpace;
