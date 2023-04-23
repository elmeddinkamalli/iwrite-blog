import React, { Component } from "react";
import $axios from "../helpers/axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: null,
      password: null,
    };

    this.login = this.login.bind(this);
  }

  componentDidUpdate() {
    if (this.props.user) {
      window.location = "/";
    }
  }

  login() {
    $axios
      .post("/users/login", {
        usernameOrEmail: this.state.usernameOrEmail,
        password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        location.reload();
      });
  }

  render() {
    return (
      <div className="container-fluid login">
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="my-5 py-5">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username/email
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                required
                onChange={(e) => {
                  this.setState({
                    usernameOrEmail: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <button className="btn btn-primary" onClick={this.login}>
              Login
            </button>
            <div className="text-center mt-3">
              <p>
                Don't have an account? <Link to={"/signup"}>Sign up here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     instance: () => dispatch(selectInstance()),
//   };
// };

export default connect(mapStateToProps, null)(Login);
