import React, { useState, useEffect } from 'react'
import Rating from '../components/Rating/Rating';
import { Link } from 'react-router-dom';
import ProductsSrv from '../services/ProductsSrv';

export default function ProductScreen(props) {
  let finalProduct;
  const [product, setProducts] = useState([]);

  const getProducts = async () => {
    finalProduct = await ProductsSrv.getProducts();
    finalProduct = finalProduct.find(product => product._id === props.match.params.id);

    setProducts(finalProduct);
  };


  useEffect(() => {
    getProducts();
  }, []);

  if (!product) {
    return <div>Product not found!</div>
  }

  return (
    <div>
        <Link to="/">Back to results </Link>
        <div className="row top">
          <div className="col-2">
            <img className="large" src={product.image} alt={product.image}/>
          </div>
          <div className="col-1">
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
              </li>
              <li>
                Description:
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="add-to-cart-container">
              <ul>
                <li>
                  <div className="row">
                    <div>Price</div>
                    <div>${product.price}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? (<span className="success">In Stock!</span>) : (<span className="error">Unavailable</span>)}
                    </div>
                  </div>
                </li>
                <li>
                  <button className="primary block">Add to Cart</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}
