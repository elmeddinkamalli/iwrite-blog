import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardSlider from "../components/page-contents/DashboardSlider";
import $axios from "../helpers/axios";
import GridLayout from "../components/page-contents/GridLayout";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderData: null,
    };
  }

  componentDidMount() {
    $axios.get(`${process.env.REACT_APP_API_BASE_URL}/blogs`).then((res) => {
      this.setState({
        sliderData: res.data,
      });
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mb-5">
          {this.state.sliderData && this.state.sliderData.length ? (
            <DashboardSlider data={this.state.sliderData} />
          ) : (
            ""
          )}
        </div>
        <div className="row my-5 pt-5">
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

const mapStateToProps = (state) => {
  return {
    user: state.user.user?.body,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
