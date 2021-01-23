import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import logo from "../../../Assets/Logos/logo.svg";
import { withRouter } from "react-router-dom";
import Header from "../Header/Header";

class Sidebar extends Component {
  state = {
    sidebar: false,
  };

  setSideBar = (e, method) => {
    const { sidebar } = this.state;
    this.setState(
      {
        sidebar: !sidebar,
      },
      () => {
        this.props.handleWidthChange();
      }
    );
  };

  render() {
    const activeClass = this.props.location.pathname;
    const { sidebar } = this.state;
    return (
      <div className={sidebar ? "sidebar-main active" : "sidebar-main"}>
        <div className="sidebar-header d-flex align-items-center">
          {!sidebar ? <img src={logo} alt="main-logo" /> : ""}
          <button
            type="button"
            className={
              sidebar ? "btn toggle-menu margin-left" : "btn toggle-menu"
            }
            onClick={(e) => this.setSideBar(e)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <nav className="navbar">
          <ul className="navbar-nav ps ps--active-y" data-scrollable="true">
            <li
              className={
                !sidebar
                  ? "nav-item nav-header"
                  : "nav-item nav-header disp-none"
              }
            >
              Browse Music
            </li>
            <li className="nav-item">
              <NavLink
                to={`/home`}
                className={
                  activeClass === "/home" ? "nav-link show" : "nav-link"
                }
              >
                <i
                  className={
                    sidebar ? "la la-home big" : "la la-home icon-style"
                  }
                ></i>
                <span className={sidebar ? "disp-none" : ""}>Home</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to={`/genres`}
                className={
                  activeClass === "/genres" ? "nav-link show" : "nav-link"
                }
              >
                <i
                  className={
                    sidebar ? "la la-diamond big" : "la la-diamond icon-style"
                  }
                ></i>
                <span className={sidebar ? "disp-none" : ""}>Genres</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/music`}
                className={
                  activeClass === "/music" ? "nav-link show" : "nav-link"
                }
              >
                <i
                  className={
                    sidebar ? "la la-music big" : "la la-music icon-style"
                  }
                ></i>
                <span className={sidebar ? "disp-none" : ""}>Free Music</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/artists`}
                className={
                  activeClass === "/artists" ? "nav-link show" : "nav-link"
                }
              >
                <i
                  className={
                    sidebar
                      ? "la la-microphone big"
                      : "la la-microphone icon-style"
                  }
                ></i>
                <span className={sidebar ? "disp-none" : ""}>Artists</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={`/stations`}
                className={
                  activeClass === "/stations" ? "nav-link show" : "nav-link"
                }
              >
                <i
                  className={
                    sidebar ? "la la-bullseye big" : "la la-bullseye icon-style"
                  }
                ></i>
                <span className={sidebar ? "disp-none" : ""}>Stations</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default withRouter(Sidebar);
