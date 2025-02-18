import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { Link } from 'react-router-dom'

const ShowProduct = () => {
  const { products, filterData, addToCart } = useContext(AppContext);

  return (
    <>
      <div className="container-fluid text-center">
        <div className="row my-5 justify-content-center">
          {filterData?.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 my-3 d-flex justify-content-center align-items-center">
              <div className="card bg-dark text-light text-center my-3" style={{ width: "18rem" }}>
                <Link to={`/product/${product._id}`} className='d-flex justify-content-center align-items-center p-3'>
                  <img 
                    src={product?.imgSrc} 
                    className="card-img-top" 
                    alt={product?.title} 
                    style={{ width: "200px", height: "200px", borderRadius: "10px", border: "2px solid yellow" }} 
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product?.title}</h5>
                  <div className='my-3'>
                    <button className="btn btn-primary mx-3">Rs.{product?.price}</button>
                    <button 
                      className="btn btn-warning" 
                      onClick={() => 
                        addToCart(
                          product._id, 
                          product.title, 
                          product.price, 
                          1, 
                          product.imgSrc
                        )
                      }
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ShowProduct;
