import React, { useEffect, useState } from "react";
import "./App.css";
//import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Route, Switch } from "react-router-dom";

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
import { Breadcrumb, Checkbox, Layout } from 'antd';
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
import Sell from "./components/Sell/Sell";
import Categories from "./components/Search/Categories";
import SearchResult from "./components/Marketplace/SearchResult";
import BookEdit from "./components/Books/BookEdit/BookEdit";
import PendingBook from "./components/Books/PendingBook/PendingBook";
import CustomerTransactions from "./components/Transactions/CustomerTransactions";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import CategoryResult from "./components/Marketplace/CategoryResult";
import Profile from "./components/Profile/Profile";
import SellerTransactions from "./components/Transactions/SellerTransactions";
import AdminBookReview from "./Review/AdminBookReview";
import TransactionReport from "./components/Reports/TransactionReport";
import Message from "./components/Messages/Message";
import ViewMessages from "./components/Messages/ViewMessages";
import SecureRoute from "./securityUtils/SecureRoute";
import Seller from "./components/Seller/Seller";
function App() {
  const [isAdmin, setIsAdmin] = useState(false)
  const jwtToken = localStorage.getItem("jwtToken");
  const dispatch = useDispatch();
  const security = useSelector(state => state.security);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (jwtToken) {
      setJWTToken(jwtToken);
      const decoded_jwtToken = jwt_decode(jwtToken);
      console.log("TOKEN", decoded_jwtToken)
      dispatch(setUser(decoded_jwtToken));

      const currentTime = Date.now() / 1000;
      if (decoded_jwtToken.exp < currentTime) {
        console.log("Logging Out");
        console.log("TOKEN TIME" , moment(decoded_jwtToken.exp).toDate().toISOString())
        dispatch(logout());
        window.location.href = "/";
      }
    }
    setLoading(false)
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
                <SecureRoute exact path="/users/edit" component={AccountEdit} />
                <SecureRoute exact path="/users/pending" component={PendingSeller} />
                <SecureRoute exact path="/books/pending" component={PendingBook} />
                <SecureRoute exact path="/books/edit" component={BookEdit} />
                <SecureRoute exact path="/login" component={Login} />
                <SecureRoute exact path="/register" component={Register} />
                <SecureRoute exact path="/moderation/bookreviews" component={AdminBookReview} />
                <SecureRoute exact path="/reports/transactions" component={TransactionReport} />
                <SecureRoute exact path="/view-messages" component={ViewMessages} />
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
            <Route exact path="/browse" component={Marketplace} />
            <Route exact path="/sell" component={Sell} />
            <Route exact path="/buy" component={BookDetails} />
            <Route exact path="/message" component={Message} />
            <SecureRoute exact path="/shoppingcart" component={ShoppingCart}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {security.user.userType === "customer"?
            <SecureRoute exact path="/transactions" component={CustomerTransactions} />: 
            <SecureRoute exact path="/transactions" component={SellerTransactions} />}

            <Route exact path="/details" component={BookDetails} />
            <SecureRoute exact path="/payment" component={Payment} />
            <SecureRoute exact path="/inventory" component={Inventory} />
            <Route exact path="/category" component={CategoryResult} />
            <Route exact path="/seller" component={Seller} />
            <SecureRoute exact path="/profile" component={Profile} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>SEPT Bookeroo 2021</Footer>
      </Layout>
    )
  }
  return (
!loading && 
    isAdmin ? loadAdmin() : loadUser()

  );
}

export default App
export { App };
