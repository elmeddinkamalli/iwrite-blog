import React, { Component } from "react";
import { Link } from "react-router-dom";
import $axios from "../helpers/axios";
import { connect } from "react-redux";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      passwordConfirmation: null,
    };

    this.register = this.register.bind(this);
  }

  componentDidUpdate() {
    if (this.props.user) {
      window.location = "/";
    }
  }

  register() {
    $axios
      .post("/users/register", {
        username: this.state.username,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        window.location = "/login"
      });
  }

  render() {
    return (
      <div className="container-fluid signup">
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username*
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                required
                onChange={(e) => {
                  this.setState({
                    username: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email*
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                onChange={(e) => {
                  this.setState({
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                onChange={(e) => {
                  this.setState({
                    firstName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                onChange={(e) => {
                  this.setState({
                    lastName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password*
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
            <div className="mb-3">
              <label htmlFor="password-confirm" className="form-label">
                Confirm Password*
              </label>
              <input
                type="password"
                className="form-control"
                id="password-confirm"
                name="password-confirm"
                required
                onChange={(e) => {
                  this.setState({
                    passwordConfirmation: e.target.value,
                  });
                }}
              />
            </div>
            <button className="btn btn-primary" onClick={this.register}>
              Sign Up
            </button>
            <div className="text-center mt-3">
              <p>
                Already have an account? <Link to={"/login"}>Login here</Link>
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

export default connect(mapStateToProps, null)(Signup);
