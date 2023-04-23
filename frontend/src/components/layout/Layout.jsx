import React, { Component } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { createBrowserHistory } from "history";

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      history: createBrowserHistory(),
    };
  }

  componentDidMount() {
    document.addEventListener("change", (e) => {
      if (
        e.target &&
        (e.target.id == "menu-toggle-2" || e.target.id == "menu-toggle")
      ) {
        this.toggleMobileMenu(e.target.id);
      }
    });
    document
      .getElementById("search-toggle")
      .addEventListener("change", this.toggleSearchBar);
    document
      .getElementById("search-bar-close")
      .addEventListener("click", this.closeSearchBar);
  }

  toggleMobileMenu(toggle) {
    var toggle = document.getElementById(toggle);
    if (toggle.checked) {
      document.querySelector("aside.sidebar").classList.add("open");
    } else {
      document.querySelector("aside.sidebar").classList.remove("open");
    }
    document
      .querySelector(".header_mobile-search_bar")
      .classList.remove("open");
    document.getElementById("search-toggle").checked = false;
  }

  closeSearchBar() {
    document
      .querySelector(".header_mobile-search_bar")
      .classList.remove("open");
    document.getElementById("search-toggle").checked = false;
  }

  toggleSearchBar() {
    var toggle = document.getElementById("search-toggle");
    if (toggle.checked) {
      document.querySelector(".header_mobile-search_bar").classList.add("open");
    } else {
      document
        .querySelector(".header_mobile-search_bar")
        .classList.remove("open");
    }
    document.querySelector("aside.sidebar").classList.remove("open");
    document.getElementById("menu-toggle").checked = false;
  }

  closeAllLayoutElements() {
    document.querySelector("aside.sidebar").classList.remove("open");
    document.getElementById("menu-toggle").checked = false;
    document
      .querySelector(".header_mobile-search_bar")
      .classList.remove("open");
    document.getElementById("search-toggle").checked = false;
  }

  render() {
    return (
      <div className="layout">
        <Header />
        {this.props.children}
        <Sidebar closeAllLayoutElements={this.closeAllLayoutElements} />
      </div>
    );
  }
}
