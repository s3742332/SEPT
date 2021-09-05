
import { Switch } from 'antd';
import React, { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { createNewUser } from "../../actions/securityActions";
function Register(props) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState()
  const [isBusiness, setIsBusiness] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: null,
    username: null,
    password: null,
    confirmPassword: null,
    phoneNumber: null,
    abn: null,
    userType: null,
    approved: null
  })

  useEffect(() => {
    console.log(props)
    // setErrors(props.errors)
  }, [props])

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createNewUser(newUser, props.history));
  }

  const onChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
    console.log(newUser)
  }
  const handleChange = (e) => {
    setIsBusiness(!isBusiness);
    console.log("handleChange", !isBusiness)
  }

  useEffect(() => {
    const user = {
      ...newUser,
      userType: isBusiness ? "seller" : "customer",
      approved: isBusiness ? null : true
    }
    setNewUser(user)
    console.log("useeffect", isBusiness)
  }, [isBusiness])
  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <form>
              <div className="form-group"> 
              <Switch onChange={handleChange} style={{marginRight: "1rem"}}/> 
              Representing a business?
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className={"form-control form-control-lg"}
                  placeholder={isBusiness? "Business Name" : "Full Name"}
                  name="fullName"
                  required
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="username"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Address"
                  name="address"
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
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={onChange}
                />
              </div>
              {isBusiness ? <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="ABN"
                  name="abn"
                  onChange={onChange}
                />
              </div> : null}
              <input type="submit" onClick={onSubmit} className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register
