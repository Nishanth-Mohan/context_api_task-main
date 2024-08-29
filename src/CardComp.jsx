import React, { useContext, useState } from 'react';
import { myContext } from './App';
import './style/Card.css';
import { Carousel } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { BiPlus, BiMinus } from 'react-icons/bi';

const CardComp = () => {
  const [data, setData] = useContext(myContext);
  const [cartStatus, setCartStatus] = useState(false);

  const cartAdd = () => {
    setCartStatus(true);
  };

  const cartRemove = (id) => {
    setData(prevData => prevData.map(item =>
      item.id === id ? { ...item, quantity: 0 } : item
    ));
  };

  const handleIncrease = (id) => {
    setData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          return { ...item, quantity: (item.quantity || 0) + 1 };
        }
        return item;
      })
    );
  };

  const handleDecrease = (id) => {
    setData(prevData =>
      prevData.map(item => {
        if (item.id === id && (item.quantity || 0) > 0) {
          return { ...item, quantity: (item.quantity || 0) - 1 };
        }
        return item;
      })
    );
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index} style={{ margin: "2em 0em" }}>
          <div className="card p-5 mb-5" id='card-w'>
            <div className="row g-0">
              <div className="col-md-4">
                <Carousel id={`carouselExample${index}`}>
                  {item.images.map((image, i) => (
                    <Carousel.Item key={i}>
                      <img src={image} className="d-block w-100" alt={`Slide ${i}`} id='carousel-img' />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title w-50">{item.title}</h4>
                    <h4 className="card-title">${item.price}</h4>
                  </div>
                  <div className="w-50">
                    <p className="card-text">{item.description}</p>
                    <p className="card-text"><b>Brand:</b> {item.brand}</p>
                    <p className="card-text" style={{ color: "red" }}><span className='stock'> In Stock: {item.stock}</span></p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="card-text"><b>Rating: {item.rating}</b></p>
                    <div className="d-flex align-items-center">
                      <button className="mx-2 quantity-btn p-2" onClick={() => handleIncrease(item.id)}><BiPlus /></button>
                      <h6 className="mx-2">{item.quantity || 0}</h6>
                      <button className="mx-2 quantity-btn p-2" onClick={() => handleDecrease(item.id)}><BiMinus /></button>
                    </div>
                  </div>
                  <div className="text-warning mb-2 small">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                  </div>
                  <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                  <div className="d-flex justify-content-end" id="btn-div">
                    <button className="btn btn-danger" id="btn" onClick={() => cartRemove(item.id)}>Remove from Cart</button>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComp;
