import React, { useState, useEffect } from 'react'
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import Product from '../components/Product/Product';
// import data from '../../../backend/data';
import ProductSrv from '../services/ProductsSrv';

export default function HomeScreen() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);

      const products = await ProductSrv.getProducts();

      setProducts(products);

      setLoading(false);

    } catch(err) {
      setError(err.message);
      setLoading(false);
    }
  };


  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {
        loading ? (<LoadingBox></LoadingBox>)
        :
        error ? (<MessageBox variant="danger">{error}</MessageBox>)
        : (
        <div className="row center">
          {
            products.map(product => (
              <Product key={product._id} product={product}></Product>
            ))
          }
        </div>
        )
      }
    </div>

  )
}
