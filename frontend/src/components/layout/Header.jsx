import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/static/search.svg";
import { ReactComponent as BellIcon } from "../../assets/static/bell.svg";
import { ReactComponent as XIcon } from "../../assets/static/X.svg";
import { Link, useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import _ from "underscore";

const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <header className={`header d-block`}>
      <div className="align-items-center d-none flex-row h-100 justify-content-between px-5 header_left row d-md-flex">
        <div className="col-6 col-lg-4">
          <div className="header_search-box d-inline">
            <input
              type="text"
              placeholder="Type something for search"
              className="border-color-main pl-4 pr-5 py-2 text-left search-input"
              onInput={(e) => setSearch(e.target.value)}
              defaultValue={new URLSearchParams(window.location.search).get(
                "search"
              )}
            />
            <SearchIcon
              onClick={() => {
                search
                  ? (() => {
                      window.history.pushState(
                        window.location.origin,
                        "",
                        `/find?search=${search}`
                      );
                      window.location.reload();
                    })()
                  : false;
              }}
            />
          </div>
        </div>
        <div className="align-items-center d-flex flex-row justify-content-end header_right col-xl-4 col-6">
          <div className="d-flex align-items-center">
            <img
              className="mr-2"
              width="16px"
              height="16px"
              src="data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9.3256 0.750121C11.6616 1.61973 13.3784 3.76153 13.6337 6.33325H10.9862C10.8785 3.74603 10.1504 1.93044 9.32938 0.751537L9.3256 0.750121ZM7 0.333252C4.9715 1.29457 4.4075 4.38982 4.31894 6.33325H9.65166C9.55905 4.30096 8.98224 1.43162 7 0.333252ZM4.63085 0.766477C3.81406 1.94573 3.09163 3.75694 2.98436 6.33325H0.366211C0.61996 3.7775 2.31706 1.64636 4.63085 0.766477ZM9.32576 13.2497C11.6617 12.3801 13.3785 10.2383 13.6339 7.66659H10.9864C10.8787 10.2538 10.1506 12.0694 9.32954 13.2483L9.32576 13.2497ZM7.00016 13.6666C4.97166 12.7053 4.40766 9.61002 4.31911 7.66659H9.65182C9.55921 9.69888 8.98241 12.5682 7.00016 13.6666ZM4.63101 13.2334C3.81422 12.0541 3.09179 10.2429 2.98452 7.66659H0.366374C0.620123 10.2223 2.31722 12.3535 4.63101 13.2334Z' fill='%232F80ED'/%3E%3C/svg%3E%0A"
              alt=""
            />
            <select className="localization form-select" defaultValue="en">
              <option value="en">English</option>
              <option value="az">Azerbaijani</option>
              <option value="ru">Russian</option>
            </select>
          </div>
          <div className="bell mx-4">
            <Link to={"/"} className={"hasNotf"}>
              <BellIcon />
            </Link>
          </div>
          <div>
            <div className="header_profile">
              <div
                className="overflow-hidden rounded-circle avatar cursor-pointer"
                onClick={() => {
                  navigate({
                    pathname: "/profile",
                  });
                }}
              >
                <img
                  src={user?.body?.photo ?? ""}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/static/default-avatar.png";
                  }}
                  alt="avatar"
                  className="w-100 h-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="align-items-center d-md-none flex-row h-100 justify-content-between px-4 header_mobile row d-flex">
        <div className="d-flex justify-content-start align-items-center col-8">
          <div className="cursor-pointer mr-3">
            <input id="menu-toggle" type="checkbox" className="d-none" />
            <label
              className="header_mobile-menu_button_container"
              htmlFor="menu-toggle"
            >
              <div className="header_mobile-menu_button"></div>
            </label>
          </div>
          <div className="py-2 d-flex align-items-center">
            <b className="text-white font-weight-bold font-20 nowrap">iWrite</b>
          </div>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          <div className="cursor-pointer header_mobile-search-toggle">
            <input id="search-toggle" type="checkbox" className="d-none" />
            <label htmlFor="search-toggle">
              <SearchIcon />
            </label>
          </div>
          <div
            className="header_mobile-user ml-3"
            onClick={() => {
              navigate({
                pathname: user ? "/profile" : "login",
              });
            }}
          >
            <img
              src={user?.body?.photo ?? ""}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/static/default-avatar.png";
              }}
              alt="avatar"
            />
          </div>
        </div>
      </div>
      <div className="header_mobile-search_bar d-md-none d-flex justify-content-center align-items-center pt-2 pb-4">
        <Link
          to={"/"}
          onClick={(e) => {
            e.preventDefault();
            search
              ? (() => {
                  window.history.pushState(
                    window.location.origin,
                    "",
                    `/find?search=${search}`
                  );
                  window.location.reload();
                })()
              : false;
          }}
        >
          <SearchIcon className="mx-4" />
        </Link>
        <input
          className="w-100 text-white font-16 search-input"
          type="text"
          placeholder="Type something for search..."
          onInput={(e) => {
            setSearch(e.target.value);
          }}
          defaultValue={new URLSearchParams(window.location.search).get(
            "search"
          )}
        />
        <XIcon className="mx-4" id="search-bar-close" />
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user?.body,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     instance: () => dispatch(selectInstance()),
//   };
// };

export default connect(mapStateToProps, null)(Header);
