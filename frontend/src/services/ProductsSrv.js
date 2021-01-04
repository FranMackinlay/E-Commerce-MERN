import axios from 'axios';

const ProductsSrv = {
  getProducts: async () => {
    const { data } = await axios.get('/api/products');
    return data;
  }
}

export default ProductsSrv;
