import React, { useState, useEffect } from 'react'
import { login } from '../../actions/securityActions';
import {useDispatch} from 'react-redux'
import { increment } from '../../actions/userActions';
function Login(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  })
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user, props.history));
  }
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <form action="dashboard.html">
              <div className="form-group">
                <input
                  type="username"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="username"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
                />
              </div>
              <input type="submit" onClick={onSubmit} className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login