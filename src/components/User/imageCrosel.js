import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function WorkspaceCarousel({ workSpace }) {
  const [index, setIndex] = React.useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}  >
      {workSpace.images &&
        workSpace.images.map((image, i) => (
          <Carousel.Item key={i} className={i === 0 ? 'active' : ''}  >
            <img src={image} className="d-block w-100" alt={`Slide ${i}`} style={{objectFit:"cover",width:"600px",height:"500px"}}  />
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default WorkspaceCarousel;
