import React, { useEffect } from "react";
import "./App.css";
import Dashboard from "./components/AdminDashboard";
//import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {  Redirect, Route, Switch } from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";
import { Provider } from "react-redux";
import store from "./store";
import { logout } from "./actions/securityActions";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import PendingSeller from "./components/AccountManagement/PendingSeller/PendingSeller";
import AccountEdit from "./components/AccountManagement/AccountEdit/AccountEdit";
import SecuredRoute from "./securityUtils/SecureRoute";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import AdminDashboard from "./components/AdminDashboard";
import { Layout, Menu, Breadcrumb } from 'antd';
import NavBar from './components/Layout/NavBar';
// import Marketplace from "./components/Market_Place/Marketplace.js";

function App() {
  const isAdmin = true;
  const jwtToken = localStorage.jwtToken;

  useEffect(() => {
    if (jwtToken) {
      setJWTToken(jwtToken);
      const decoded_jwtToken = jwt_decode(jwtToken);
      store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_jwtToken
      });

      const currentTime = Date.now() / 1000;
      if (decoded_jwtToken.exp < currentTime) {
        store.dispatch(logout());
        window.location.href = "/";
      }
    }
  }, [])
  const { Header, Content, Footer } = Layout;
  const loadAdmin = () => {
    return (
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <NavBar />
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: "100%" }}>
              <Switch>
                <Route exact path="/" component={AdminDashboard} />
                <Route exact path="/accountedit" component={AccountEdit} />
                <Route exact path="/pendingusers" component={PendingSeller} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Redirect to="/" />
              </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
  }
  return (
    <Provider store={store}>
      {isAdmin ? loadAdmin() : null}

    </Provider>
  );
}

export default App
