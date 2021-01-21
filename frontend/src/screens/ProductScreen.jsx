import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating/Rating';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import { detailsProduct } from '../actions/productActions';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;

  const [qty, setQty] = useState(1);

  const productDetails = useSelector(state => state.productDetails);
  const {loading, error, product} = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId))
  }, [productId, dispatch]);

  const addToCartHandler = e => {
    e?.preventDefault();
    props.history.push(`/cart/${productId}?qty=${qty}`)
  }

  return (
    <div>
      {
        loading ? (<LoadingBox></LoadingBox>)
        :
        error ? (<MessageBox variant="danger">{error}</MessageBox>)
        : (
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
                    {
                      product.countInStock > 0 && (
                        <div>
                          <li>
                            <div className="row">
                              <div>Qty</div>
                              <div>
                                <select value={qty} onChange={e => setQty(e.target.value)}>
                                  {
                                    [...Array(product.countInStock).keys()].map(item => {
                                      const realCount = item + 1;
                                      return <option key={realCount} value={realCount}>{ realCount }</option>
                                    })
                                  }
                                </select>
                              </div>
                            </div>
                          </li>
                          <li>
                            <button onClick={() => addToCartHandler()} className="primary block">Add to Cart</button>
                          </li>
                        </div>
                      )
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      }
    </div>
  )
}
