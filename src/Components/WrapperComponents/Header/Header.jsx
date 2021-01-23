import React, { Component } from "react";
import "./Header.scss";
import { Icon } from "@iconify/react";
import iosSearch from "@iconify-icons/ion/ios-search";
import translate from "../../../Assets/Logos/translate.svg";
import profile from "../../../Assets/image/profile.jpg";
import { Dialog } from "@material-ui/core";
import { connect } from "react-redux";
import { logoutUser } from "../../../Actions/index";
class Header extends Component {
  state = {
    openProfile: false,
    openDialogBox: false,
    launguageData: [
      {
        launguageType: "Hindi",
        id: "ch1",
        checked: "checked",
      },
      {
        launguageType: "Punjabi",
        id: "ch2",
        checked: "checked",
      },
      {
        launguageType: "Tamil",
        id: "ch3",
      },
      {
        launguageType: "Bengali",
        id: "ch4",
      },
      {
        launguageType: "kannada",
        id: "ch5",
      },
      {
        launguageType: "Gujarati",
        id: "ch6",
      },
      {
        launguageType: "Urdu",
        id: "ch7",
      },
      {
        launguageType: "Rajasthani",
        id: "ch8",
      },
      {
        launguageType: "English",
        id: "ch9",
        checked: "checked",
      },
      {
        launguageType: "Telugu",
        id: "ch10",
      },
      {
        launguageType: "Bhojpuri",
        id: "ch11",
      },
      {
        launguageType: "Malayalam",
        id: "ch12",
      },
      {
        launguageType: "Marathi",
        id: "ch13",
      },
      {
        launguageType: "Haryanvi",
        id: "ch14",
      },
      {
        launguageType: "Assamese",
        id: "ch15",
      },
      {
        launguageType: "Odia",
        id: "ch16",
      },
    ],
  };
  logoutUser = () => {
    this.props.logoutUser();
    this.props.history.push("/home-page");
  };

  handleClickOpen = () => {
    this.setState({
      openDialogBox: true,
    });
  };

  handleClose = () => {
    this.setState({
      openDialogBox: false,
    });
  };

  handleOpenProfile = () => {
    this.setState({
      openProfile: !this.state.openProfile,
    });
  };
  render() {
    const { openProfile, openDialogBox, launguageData } = this.state;
    const fullWidth = this.props.fullWidth;
    const scrollValue = this.props.scrollTop;
    let header;
    let headerScroll;
    let headerLong;
    if (fullWidth) {
      if (scrollValue > 120) {
        headerLong = "blue-header long-search long-scrolled";
      } else {
        headerLong = "blue-header long-search";
      }
    } else {
      if (scrollValue > 120) {
        headerLong = "blue-header scrolled";
      } else {
        headerLong = "blue-header";
      }
    }

    return (
      <header className={headerLong}>
        <div className="d-flex align-items-center header-height">
          <button
            type="button"
            className="btn toggle-menu mr-3 btn-top"
            onClick={this.props.setSideBar}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <form action="#" id="searchForm">
            <button type="button" className="btn">
              <Icon icon={iosSearch} />
            </button>
            <input
              type="text"
              placeholder="Search...."
              id="searchInput"
              className="form-control"
            />
          </form>
          <ul className="header-options d-flex align-items-center">
            <li style={{ listStyle: "none", display: "flex" }}>
              <span className="header-launguage" onClick={this.handleClickOpen}>
                Language
              </span>
              <img src={translate} alt="translate" className="launguage-img" />
            </li>

            <li className="dropdown fade-in">
              <span
                className="d-flex align-items-center py-2"
                onClick={this.handleOpenProfile}
                style={{ cursor: "pointer" }}
              >
                <div className="avatar avatar-sm avatar-circle">
                  <img src={profile} alt="profile" />
                </div>
                <span className="pl-2">Halo Admin</span>
              </span>

              <div
                className={
                  !openProfile
                    ? "dropdown-menu dropdown-menu-right dropdown-hide"
                    : "dropdown-menu dropdown-menu-right"
                }
                x-placement="top-end"
                style={{
                  position: "absolute",
                  willChange: "transform",
                  top: "0px",
                  left: "0px",
                  transform: "translate3d(-44px, 18px, 0px)",
                }}
              >
                <span className="dropdown-item">
                  <i
                    className="iconify dropdown-icon"
                    data-icon="ion-md-contact"
                    data-inline="false"
                  ></i>
                  <span>Profile</span>
                </span>
                <span className="dropdown-item">
                  <span
                    className="iconify dropdown-icon"
                    data-icon="ion-md-radio-button-off"
                    data-inline="false"
                  ></span>
                  <span>Your Plan</span>
                </span>
                <span className="dropdown-item">
                  <span
                    className="iconify dropdown-icon"
                    data-icon="ion-md-settings"
                    data-inline="false"
                  ></span>
                  <span>Settings</span>
                </span>
                <div className="dropdown-divider"> </div>
                <div className="px-4 py-2">
                  <span
                    className="btn btn-sm btn-air btn-pill btn-danger"
                    onClick={this.logoutUser}
                  >
                    Logout
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Dialog open={openDialogBox} onClose={this.handleClose}>
          <div className="modal-content">
            <div className="dialog-header">
              <div>
                <h5 className="modal-title mb-1">Language</h5>
                <p className="text-muted">
                  Please select the language(s) of the music you listen to.
                </p>
              </div>
              <button
                style={{ outline: "none" }}
                type="button"
                className="close"
                onClick={this.handleClose}
              >
                <span>x</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="list-item-group row">
                {launguageData.map((data, index) => {
                  return (
                    <li
                      className="list-group-item border-0 col-sm-6 border-none"
                      key={index}
                    >
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={data.id}
                          checked={data.checked}
                        />
                        <label
                          htmlFor={data.id}
                          className="custom-control-label"
                        >
                          {data.launguageType}
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="modal-footer text-center d-block">
              <button type="button" className="btn btn-primary btn-pill">
                Apply
              </button>
            </div>
          </div>
        </Dialog>
      </header>
    );
  }
}
export default connect(null, { logoutUser })(Header);
