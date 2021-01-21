import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updateUserProfile, userDetails } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox/LoadingBox'
import MessageBox from '../components/MessageBox/MessageBox'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant';


export default function ProfileScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userSignin = useSelector(state => state.userSignIn);
  const {userInfo} = userSignin;

  const userDetail = useSelector(state => state.userDetails);
  const {loading, error, user} = userDetail;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({type: USER_UPDATE_PROFILE_RESET});
      dispatch(userDetails(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = e => {
    e?.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords are not a match!');
    } else {
      dispatch(updateUserProfile({userId: user._id, name, email, password}));
    }
  }

  return (
    <div>
      <form action="" className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {
          loading ? <LoadingBox></LoadingBox> :
          error ? <MessageBox variant="danger">{error}</MessageBox> :
          (
            <>
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
              {successUpdate && <MessageBox variant="success">Profile updated successfully!</MessageBox>}
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)}/>
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)}/>
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)}/>
              </div>

              <div>
                <label htmlFor=""></label>
                <button className="primary" type="submit">Update</button>
              </div>
            </>
          )
        }
      </form>
    </div>

  )
}
