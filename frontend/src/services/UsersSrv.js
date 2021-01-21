import axios from 'axios';
// const axios = require('axios');

const UsersSrv = {
  userSignIn: async (email, password) => {
    const res = await axios.post('/api/users/signin', { email, password });
    return res;
  },
  register: async (name, email, password) => {
    const res = await axios.post('/api/users/register', { name, email, password });
    return res;
  },
  getUserDetails: async userInfo => {
    const { data } = await axios.get(`/api/users/${userInfo._id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    });
    return data;
  },

  upsertUserDetails: async (user, userInfo) => {
    const { data } = await axios.put(`/api/users/profile`, user, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      }
    });
    return data;
  },
}

export default UsersSrv;
