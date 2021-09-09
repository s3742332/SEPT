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
import { Breadcrumb, Layout } from 'antd';
import NavBar from './components/Layout/NavBar';
import Home from "./components/Home";
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './actions/securityActions';
import Marketplace from "./components/Marketplace/Marketplace";
import BookDetails from "./components/Marketplace/BookDetails";
import Payment from "./components/Marketplace/Payment";
import Inventory from "./components/Inventory/Inventory";


// import Marketplace from "./components/Marketplace/Marketplace.js";
import moment from "moment";
import AccountSettings from "./components/Layout/AccountSettings";
import AdminBreadcrumb from "./components/Layout/AdminBreadcrumb";
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

      // const currentTime = Date.now() / 1000;
      // if (decoded_jwtToken.exp < currentTime) {
      //   console.log("Logging Out");
      //   console.log("TOKEN TIME" , moment(decoded_jwtToken.exp).toDate().toISOString())
      //   dispatch(logout());
      //   window.location.href = "/";
      // }
    }
  }, [])
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  useEffect(() => {
    security.user.userType === "admin" ? setIsAdmin(true) : setIsAdmin(false)
  }, [security])
  const { Header, Content, Footer } = Layout;
  const loadAdmin = () => {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <NavBar user={security.user} />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: '0 50px', display: "flex" }}>
            <AccountSettings />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <AdminBreadcrumb />
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route exact path="/" component={AdminDashboard} />
                <Route exact path="/users/accountedit" component={AccountEdit} />
                <Route exact path="/users/pendingusers" component={PendingSeller} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>SEPT Bookeroo 2021</Footer>
        </Layout>
      </Layout>
    )
  }
  const loadUser = () => {
    return (
      <Layout style={{ height: "100%", overflow: "auto", }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <NavBar user={security.user} />
        </Header>
        <Content className="site-layout" style={{ marginTop: 64 }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/buy" component={Marketplace} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/details" component={BookDetails} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/inventory" component={Inventory} />
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
