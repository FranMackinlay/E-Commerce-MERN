import axios from 'axios';

const PaypalSrv = {
  getClientId: async (order, userInfo) => {
    const { data } = await axios.get('/api/config/paypal');

    return data;
  },
}

export default PaypalSrv;
