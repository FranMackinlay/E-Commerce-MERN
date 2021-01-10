import React, { useState } from 'react'
import {Link} from 'react-router-dom';

export default function SignInScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = e => {
    e?.preventDefault();
    // TODO: signin action
  }


  return (
    <div>
      <form action="" className="form" onSubmit={submitHandler}>
        <div>
          <h1>
            Sign In
          </h1>
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
