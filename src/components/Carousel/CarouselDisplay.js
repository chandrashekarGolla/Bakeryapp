import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import cake from '../Images/cake.jpeg'
import chocolates from '../Images/chocolates.jpeg'
import icecreams from '../Images/icecreams.jpeg'
import './CarouselDisplay.css'
import { Link } from 'react-router-dom';
function CarouselDisplay() {
  return (
    <div className='carousel-container'>
       <Carousel className='carousel d-block '>
        <Carousel.Item interval={1500}>
          <div className='d-flex carousel-item'>
            <Link to='/categoryItems/Cake'>
              <img className="d-block  p-2  img" src={cake} alt="First slide" />
            </Link>
            <Link to='/categoryItems/Cake'>
              <img className="d-block  p-2 img " src={cake} alt="First slide" />
            </Link>
            <Link to='/categoryItems/Cake'>
              <img className="d-block p-2 img" src={cake} alt="First slide" />
            </Link>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <div className='d-flex carousel-item'>
            <Link to='/categoryItems/Chocolate'>
              <img className="d-block p-2 img" src={chocolates} alt="Second slide" />
            </Link>
            <Link to='/categoryItems/Chocolate'>
              <img className="d-block p-2 img" src={chocolates} alt="Second slide" />
            </Link>
            <Link to='/categoryItems/Chocolate'>
              <img className="d-block  p-2 img" src={chocolates} alt="Second slide" />
            </Link>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <div className='d-flex carousel-item'>
            <Link to="/categoryItems/Icecream">
              <img className="d-block p-2 img" src={icecreams} alt="Third slide" />
            </Link>
            <Link to="/categoryItems/Icecream">
              <img className="d-block p-2 img" src={icecreams} alt="Third slide" />
            </Link>
            <Link to="/categoryItems/Icecream">
              <img className="d-block p-2 img" src={icecreams} alt="Third slide" />
            </Link>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>

  )
}

export default CarouselDisplay

