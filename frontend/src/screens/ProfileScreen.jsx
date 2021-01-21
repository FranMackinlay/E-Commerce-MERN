import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { userDetails } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox/LoadingBox'
import MessageBox from '../components/MessageBox/MessageBox'


export default function ProfileScreen(props) {

  const userSignin = useSelector(state => state.userSignIn);

  const userDetail = useSelector(state => state.userDetails);

  const {loading, error, user} = userDetail;

  const {userInfo} = userSignin;
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userDetails(userInfo._id));
  }, [dispatch, userInfo._id]);

  const submitHandler = e => {
    e?.preventDefault();
    // dispatch user update
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
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Enter name" value={user.name}/>
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter email" value={user.email}/>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Enter password"/>
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password"/>
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
