import React, { Component } from "react";
import { ReactComponent as SidebarDashboardIcon } from "../../assets/static/sidebar-dashboard-icon.svg";
import { ReactComponent as AboutUsIcon } from "../../assets/static/aboutus.svg";
import { ReactComponent as ShareIcon } from "../../assets/static/share.svg";
import { ReactComponent as LogoutIcon } from "../../assets/static/logout.svg";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { destroyUser } from "../../redux/features/userSlice";
import { toggleModal } from "../../redux/actions/ModalActions";
class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <aside className={`sidebar`}>
        <div className="h-100 py-3">
          <Link
            to={"/"}
            className="mb-5 px-4 d-block cursor-pointer d-flex align-items-center text-decoration-none text-white mt-1 nowrap"
          >
            <h1 className="font-weight-bold mb-0 ml-4">iWrite</h1>
          </Link>
          <div className="d-flex flex-column justify-content-md-between justify-content-start sidebar-menu-lists">
            <div>
              <div className="mb-4 mt-3">
                <div className="d-md-none px-4 d-flex sidebar-mobile-user-profile mb-3 align-items-center">
                  <div className="sidebar-mobile-user-profile-avatar mr-3">
                    <img
                      src={this.props.user?.photo ?? ""}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/static/default-avatar.png";
                      }}
                      alt="avatar"
                    />
                  </div>
                  <div className="text-white">
                    <h5>
                      {this.props.user?.firstName} {this.props.user?.lastName}
                    </h5>
                    <NavLink
                      to={"/"}
                      className="btn text-white font-14 p-0 border-0"
                      onClick={() => this.props.closeAllLayoutElements()}
                    >
                      Home
                    </NavLink>
                  </div>
                </div>
                <ul className="list-group">
                  <NavLink
                    to={"/"}
                    className="text-decoration-none px-4 list-group-item-link border-0 d-flex align-items-center"
                    onClick={() => this.props.closeAllLayoutElements()}
                  >
                    <SidebarDashboardIcon className="list-item-icon mr-4" />
                    <li
                      className={`bg-transparent text-sidebar-grayed list-group-item border-0`}
                    >
                      Home
                    </li>
                  </NavLink>
                  <NavLink
                    to={"/aboutus"}
                    className="text-decoration-none px-4 list-group-item-link border-0 d-flex align-items-center"
                    onClick={() => this.props.closeAllLayoutElements()}
                  >
                    <AboutUsIcon className="list-item-icon mr-4" />
                    <li
                      className={`bg-transparent text-sidebar-grayed list-group-item border-0`}
                    >
                      About us
                    </li>
                  </NavLink>
                </ul>
              </div>
              <div>
                <small className="text-sidebar-grayed ml-4 font-12">
                  My space
                </small>
                <ul className="list-group">
                  <a
                    className="text-decoration-none px-4 list-group-item-link border-0 d-flex align-items-center"
                    onClick={() => {
                      this.props.closeAllLayoutElements();
                      this.props.toggleShareModal();
                    }}
                  >
                    <ShareIcon className="list-item-icon mr-4" />
                    <li
                      className={`bg-transparent text-sidebar-grayed list-group-item border-0`}
                    >
                      Share blog
                    </li>
                  </a>
                </ul>
              </div>
            </div>
            <div>
              <ul className="list-group">
                <a
                  className="text-decoration-none px-4 list-group-item-link border-0 d-flex align-items-center"
                  onClick={() => this.props.logout()}
                >
                  <LogoutIcon className="list-item-icon mr-4" />
                  <li
                    className={`bg-transparent text-sidebar-grayed list-group-item border-0`}
                  >
                    Logout
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user?.body,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(destroyUser()),
    toggleShareModal: () => dispatch(toggleModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
