import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';

export default function SignInScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';


  const dispatch = useDispatch();



  const submitHandler = e => {
    e?.preventDefault();
    dispatch(signin(email, password));
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    };
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form action="" className="form" onSubmit={submitHandler}>
        <div>
          <h1>
            Sign In
          </h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" name="" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
        </div>
        <div>
          <label />
          <button type="submit" className="primary">Sign In</button>
        </div>
        <div>
          <label />
          <div>
            New costumer? { ' ' }
            <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
