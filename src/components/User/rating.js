
import { Container, Row, Col } from 'react-bootstrap';
import RatingStars from 'react-rating-stars-component';

const Rating = ({ rating,onChange }) => {

  

  return (
    <Container>
      <Row>
        <Col>
          <RatingStars
            count={5} 
            size={30} 
            activeColor="#ffd700" 
            value={rating} 
            onChange={onChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Rating;
