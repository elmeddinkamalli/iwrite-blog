import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Page404 from "../pages/Page404";
import Blog from "../pages/Blog";
export default class UserPanelRoutes extends Component {
  render() {
    return (
      <div className="contents px-2 px-sm-4">
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/blogs/:id"} element={<Blog />} />
          <Route path={"/*"} element={<Page404 />} />
        </Routes>
      </div>
    );
  }
}
