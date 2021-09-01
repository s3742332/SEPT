import React, { useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
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
import Marketplace from "./components/Market_Place/Marketplace.js";

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


  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            {
              //Public Routes
            }
            {
              isAdmin ?
                <Route exact path="/" component={Dashboard} />
                : <Route exact path="/" component={Landing} />
            }
            {isAdmin &&
              <Route exact path="/pendingusers" component={PendingSeller} />
              
            }
            {isAdmin && <Route exact path="/accountedit" component={AccountEdit} />}
            {/* {!isAdmin &&
              <Route exact path="/register" component={Register} />}
            <Route exact path="/register" component={Register} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/marketplace" component={Marketplace} />
            <Redirect to="/" />
          </Switch>


        </div>
      </Router>
    </Provider>
  );
}

export default App
