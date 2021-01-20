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
  getOrderDetails: async (orderId, userInfo) => {
    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    return data;
  },


}

export default OrdersSrv;
