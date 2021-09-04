import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import PendingSeller from "./AccountManagement/PendingSeller/PendingSeller";
import AccountEdit from "./AccountManagement/AccountEdit/AccountEdit";
import NavBar from './Layout/NavBar';
import Register from "./UserManagement/Register";
import Login from "./UserManagement/Login";
function AdminDashboard() {

  return (
    "Admin Dashboard"
  )
}

export default AdminDashboard
