import axios from 'axios';

const ProductsSrv = {
  getProducts: async () => {
    const { data } = await axios.get('/api/products');
    return data.products;
  },
  getProductDetails: async productId => {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data.product;
  }
}

export default ProductsSrv;
