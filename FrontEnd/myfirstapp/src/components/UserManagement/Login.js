import React, { useState, useEffect } from 'react'
import { login } from '../../actions/securityActions';
import { useDispatch, useSelector } from 'react-redux'
function Login(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  })
  const [errorMessage, setErrorMessage] = useState({})
  const error = useSelector(state => state.errors);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user, props.history));
  }
  const onChange = (e) => {
    console.log("THIS IS THE PLACE")
    setErrorMessage({});
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  }
  
  useEffect(() => {
    setErrorMessage(error.error)
  }, [error])
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
                 {errorMessage?.username && <p style={{ color: "red" }}>{errorMessage.username}</p>}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  onChange={onChange}
                />
                   {errorMessage?.password && <p style={{ color: "red" }}>{errorMessage.password}</p>}
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