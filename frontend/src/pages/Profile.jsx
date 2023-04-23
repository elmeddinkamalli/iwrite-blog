import React, { Component } from "react";
import GridLayout from "../components/page-contents/GridLayout";
import $axios from "../helpers/axios";
import { ReactComponent as ShareIcon } from "../assets/static/share.svg";
import { connect } from "react-redux";
import { toggleModal } from "../redux/actions/ModalActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderData: null,
      user: props.user,
    };
  }

  componentDidUpdate() {
    if (!this.props.user && this.props.fetchUser) {
      window.location = "/login";
    }
    if (this.props.user != this.state.user) {
      this.setState(
        {
          user: this.props.user,
        },
        () => {
          this.getUserPosts();
        }
      );
    }
  }

  componentDidMount() {
    if (!this.props.user && this.props.fetchUser) {
      window.location = "/login";
    }
    console.log(this.state);
    this.getUserPosts();
  }

  getUserPosts() {
    if (this.state.user) {
      $axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/blogs?userId=${this.state.user?.id}`
        )
        .then((res) => {
          this.setState({
            sliderData: res.data,
          });
        });
    }
  }

  render() {
    return (
      <div className="container-fluid profile">
        <div className="row w-100">
          <div className="p-5 m-sm-5">
            <div className="row align-items-center">
              <div className="col-md-3 col-12">
                <img
                  src="static/default-avatar.png"
                  className="img-thumbnail rounded-circle"
                  alt=""
                />
              </div>
              <div className="col-md-9 col-12">
                <h5>{this.state.user?.fullName}</h5>
                <small>@{this.state.user?.username}</small>
                <button
                  onClick={this.props.toggleModal}
                  className="d-block mt-2 btn btn-primary"
                >
                  <ShareIcon /> Share Blog
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h5>My Blogs</h5>
          {this.state.sliderData && this.state.sliderData.length ? (
            <GridLayout data={this.state.sliderData} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
