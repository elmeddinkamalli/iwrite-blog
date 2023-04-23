import React, { Component } from "react";
import $axios from "../helpers/axios";
import { connect } from "react-redux";
import { toggleModal, togglePopUp } from "../redux/actions/ModalActions";
import { ReactComponent as XIcon } from "../assets/static/X.svg";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      id: window.location.pathname.split("/").pop(),
      blog: null,
    };

    this.deleteBlog = this.deleteBlog.bind(this);
  }

  componentDidMount() {
    this.getBlogData();
  }

  componentDidUpdate() {
    console.log(this.props);
    if (this.props.user != this.state.user) {
      this.setState({
        user: this.props.user,
      });
    }
  }

  getBlogData() {
    $axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/blogs/${this.state.id}`)
      .then((res) => {
        this.setState({
          blog: res.data,
        });
      });
  }

  deleteBlog() {
    $axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/blogs/${this.state.id}`)
      .then((res) => {
        window.location = "/";
      })
      .catch((err) => {
        this.togglePopUp(null);
      });
  }

  render() {
    return (
      <div className="container-fluid blog">
        <div className="row w-100">
          {this.state.blog ? (
            <>
              <div className="col">
                <img src={this.state.blog.image} alt="" />
              </div>
              <div className="col mt-3 details">
                {this.state.blog.userId == this.state.user?.id ? (
                  <XIcon
                    className="x-icon"
                    onClick={() => this.props.togglePopUp(this.deleteBlog)}
                  />
                ) : (
                  ""
                )}
                <h3>{this.state.blog.title}</h3>
                <p>{this.state.blog.description}</p>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  modal: state.modal,
  user: state.user.user,
  fetchUser: state.user.fetchUser,
});

const mapDispatchToProps = {
  toggleModal: toggleModal,
  togglePopUp: (handleConfirmation) => togglePopUp(handleConfirmation),
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
