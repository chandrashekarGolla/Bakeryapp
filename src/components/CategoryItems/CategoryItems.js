import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import imagesinfo from '../Imagesdata'
import { Link } from 'react-router-dom';
import './CategoryItems.css'
function CategoryItems() {

  const { categoryType } = useParams();

  const categoryData = imagesinfo.filter((item) => item.type === categoryType);

  return (
    <div className='center-items'>
      <div className='cards'>
      <div className="items-container">
        <div className='row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 ml-2 p-3'>
          {categoryData.map((item) => (
            <div className='col card-items m-2' key={item.id}>
              <div className='card-body'>
                <div className='image-body'>
                  <Link
                    to={`/price/${item.id}?image=${encodeURIComponent(item.path)}&price=${encodeURIComponent(item.price)}&name=${encodeURIComponent(item.name)}&type=${encodeURIComponent(item.type)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                  <img
                    className='card-image'
                    src={item.path}
                    alt='Card'
                    style={{
                      width: '210px',
                      height: '250px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                  </Link>
                
              </div>
              <h5>{item.name}</h5>
              <p className='fs-5 fw-semibold'>
                <FaRupeeSign size={17} /> {item.price}
              </p>
            </div>
            </div>
          ))}
      </div>
      </div>
    </div>
      
    </div >
  );
}

export default CategoryItems;
