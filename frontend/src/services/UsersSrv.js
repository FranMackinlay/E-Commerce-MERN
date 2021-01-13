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
  }
}
// const signIn = async () => {
//   const res = await UsersSrv.userSignIn('admin@amazona.com', '1234');
//   console.log('RES', res);
// }

// signIn();

export default UsersSrv;
