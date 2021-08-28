import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import PendingSeller from "./components/AccountManagement/PendingSeller/PendingSeller";
import AccountEdit from "./components/AccountManagement/AccountEdit/AccountEdit";
import Marketplace from "./components/Market_Place/Marketplace.js";

function App() {
  const isAdmin = true;
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
