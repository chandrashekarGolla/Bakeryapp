import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Cupcake from '../Images/Cupcake.jpeg';
import BiscuitAll from '../Images/BiscuitAll.jpg';
import cake from '../Images/cake.jpeg';
import Icecream from '../Images/Icecream.jpeg';
import Pastry from '../Images/Pastry.jpeg';
import Chocolate from '../Images/Chocolate.jpeg';
import './Categories.css';

const Categories = () => {
  const imagesData = [
    { id: 1, path: Cupcake, name: 'Cup Cakes', type: 'Cupcake' },
    { id: 2, path: BiscuitAll, name: 'Biscuits', type: 'Biscuit' },
    { id: 3, path: cake, name: 'Cakes', type: 'Cake' },
    { id: 4, path: Pastry, name: 'Pastries', type: 'Pastry' },
    { id: 5, path: Chocolate, name: 'Chocolates', type: 'Chocolate' },
    { id: 6, path: Icecream, name: 'Icecreams', type: 'Icecream' }
  ];

  return (
    <div className='container'>
      <div className='category mt-4'>
        <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 ml-2 p-3'>
          {imagesData.map((obj) => (
            <div className='col m-2 card-item' key={obj.id}>
              <div className='card-body content'>
                <div className='image-bodys'>
                  <Link to={`/categoryItems/${obj.type}`}>
                    <img
                      src={obj.path}
                      className='enlarge-image'
                      alt='not available'
                      title={obj.type}
                      style={{
                        width: '300px',
                        height: '300px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                      }}
                    />
                  </Link>
                </div>
                <h5 className='text-center p-2'>{obj.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Categories;
