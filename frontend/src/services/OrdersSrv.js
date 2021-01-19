import axios from 'axios';

const OrdersSrv = {
  createOrder: async (order, userInfo) => {
    const { data } = await axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    console.log('DATA', data);
    return data;
  },
}

export default OrdersSrv;
