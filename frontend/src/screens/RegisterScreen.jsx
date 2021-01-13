import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';

export default function RegisterScreen(props) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';


  const dispatch = useDispatch();

  const submitHandler = e => {
    e?.preventDefault();

    if (confirmPassword !== password) {
      alert('Password and confirm password are not a match!');
    } else {
      dispatch(register(name, email, password));
    }
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
            Create account
          </h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder="Name" onChange={e => setName(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" name="" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="confirmPpassword">Confirm password</label>
          <input type="password" name="" id="confirmPpassword" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)} required/>
        </div>

        <div>
          <label />
          <button type="submit" className="primary">Register</button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? { ' ' }
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
