import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../Payment/banners1.jpg'
import image2 from '../Payment/banner2.jpg'
import image3 from '../Payment/banner4.jpg'
import image4 from '../Payment/banner5.jpg'
import image5 from '../Payment/banner3.jpg'
import image6 from '../Payment/banner6.jpg'
function HomeCarousel() {

    const imgSrc = [image1,image2,image3,image4,image5,image6]
  const [index, setIndex] = React.useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}  className='my-2 py-2 shadow-lg'>
      {
        imgSrc.map((image, i) => (
          <Carousel.Item key={i} className={i === 0 ? 'active' : ''}  >
            <img src={image} className="d-block w-100" alt={`Slide ${i}`} style={{objectFit:"cover",width:"600px",height:"500px"}}  />
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default HomeCarousel;
