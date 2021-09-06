import React, { useEffect, useState } from "react";
import "./App.css";
//import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Route, Switch } from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";

import { logout, setUser } from "./actions/securityActions";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import PendingSeller from "./components/AccountManagement/PendingSeller/PendingSeller";
import AccountEdit from "./components/AccountManagement/AccountEdit/AccountEdit";
import SecuredRoute from "./securityUtils/SecureRoute";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import AdminDashboard from "./components/AdminDashboard";
import { Layout } from 'antd';
import NavBar from './components/Layout/NavBar';
import Home from "./components/Home";
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './actions/securityActions';
import Marketplace from "./components/Market_Place/Marketplace";
import BookDetails from "./components/Market_Place/BookDetails";
import Payment from "./components/Market_Place/Payment";
// import Marketplace from "./components/Market_Place/Marketplace.js";

function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const jwtToken = localStorage.jwtToken;
  const dispatch = useDispatch();
  const security = useSelector(state => state.security);
  useEffect(() => {
    if (jwtToken) {
      setJWTToken(jwtToken);
      const decoded_jwtToken = jwt_decode(jwtToken);
      console.log(decoded_jwtToken)
      dispatch(setUser(decoded_jwtToken));

      const currentTime = Date.now() / 1000;
      if (decoded_jwtToken.exp < currentTime) {
        dispatch(logout());
        window.location.href = "/";
      }
    }
  }, [])
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  useEffect(() => {
   security.user.userType === "admin" ? setIsAdmin(true):  setIsAdmin(false)
  }, [security])
  const { Header, Content, Footer } = Layout;
  const loadAdmin = () => {
    return (
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <NavBar  user={security.user} />
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <Switch>
            <Route exact path="/" component={AdminDashboard} />
            <Route exact path="/accountedit" component={AccountEdit} />
            <Route exact path="/pendingusers" component={PendingSeller} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>SEPT Bookeroo 2021</Footer>
      </Layout>
    )
  }
  const loadUser = () => {
    return (
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <NavBar user={security.user} />
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/buy" component={Marketplace} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/details" component={BookDetails} />
            <Route exact path="/payment" component={Payment} />
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>SEPT Bookeroo 2021</Footer>
      </Layout>
    )
  }
  return (
 
      isAdmin ? loadAdmin() : loadUser()

  );
}

export default App
