import axios from 'axios';

const OrdersSrv = {
  createOrder: async (order, userInfo) => {
    const { data } = await axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

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
  payOrder: async (order, paymentResult, userInfo) => {
    const { data } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    return data;
  }
}

export default OrdersSrv;
