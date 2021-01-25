import React, { Component } from "react";
import "./Header.scss";
// import { Icon } from "@iconify/react";
// import iosSearch from "@iconify-icons/ion/ios-search";
import translate from "../../../Assets/Logos/translate.svg";
import profile from "../../../Assets/image/profile.jpg";
import { Dialog } from "@material-ui/core";
import { connect } from "react-redux";
import {
  logoutUser,
  setMusicData,
  getSearchAll,
  getUserDetails,
} from "../../../Actions/index";
import { NavLink, withRouter } from "react-router-dom";
class Header extends Component {
  state = {
    firstName: "",
    profileImage: "",
    openProfile: false,
    openDialogBox: false,
    dropdownActionVisible: false,
    suggestionBox: false,
    searchText: "",
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
  componentDidMount() {
    let id = localStorage.getItem("id");
    this.loginData(id);
  }

  logoutUser = () => {
    this.props.logoutUser();
    this.props.history.push("/");
  };

  loginData = (id) => {
    this.props.getUserDetails(id);
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
  hidePopover = () => {
    this.handleOpenProfile();
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState(
        {
          firstName: nextProps.userData.firstName,
          profileImage: nextProps.userData.profileImage,
        },
        () => {
          console.log(this.state.firstName);
        }
      );
    }
  }
  componentWillMount() {
    document.addEventListener("mousedown", this.popupActionClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.popupActionClick, false);
  }
  popupActionClick = (e) => {
    if (this.node.contains(e.target)) {
      this.setState({
        dropdownActionVisible: true,
      });
      return true;
    }
    this.setState({
      dropdownActionVisible: false,
    });
  };
  getData = (songData, index) => {
    this.props.setMusicData(songData, index);
  };
  setSearchData = (key) => {
    this.setState(
      {
        searchText: key,
        suggestionBox: true,
      },
      () => {
        this.props.getSearchAll(this.state.searchText);
        if (this.state.searchText === "") {
          this.setState({
            suggestionBox: false,
          });
        }
      }
    );
  };

  openSuggestionBox = () => {
    this.setState({
      suggestionBox: false,
      searchText: "",
    });
  };

  submitForm = () => {
    this.props.history.push(`/${this.state.searchText}`);
  };
  render() {
    const {
      openProfile,
      openDialogBox,
      launguageData,
      dropdownActionVisible,
      suggestionBox,
      searchText,
    } = this.state;

    const filterArtist = this.props.searchArray.albumData;
    const filterTrack = this.props.searchArray.songData;

    const fullWidth = this.props.fullWidth;
    const scrollValue = this.props.scrollTop;

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
            onClick={() => this.props.setSideBar()}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <form action="#" id="searchForm" onSubmit={this.submitForm}>
            <button type="button" className="btn">
              <span
                className="iconify"
                data-icon="ion-ios-search-strong"
                data-inline="false"
              ></span>
              {/* <Icon icon={iosSearch} /> */}
            </button>
            <input
              type="text"
              placeholder="Search...."
              id="searchInput"
              className="form-control"
              value={searchText}
              onChange={(e) => this.setSearchData(e.target.value)}
            />
            {filterArtist &&
              filterTrack &&
              (filterArtist.length !== 0 || filterTrack.length !== 0) && (
                <div
                  className={
                    suggestionBox
                      ? "search-card ps ps--active-y open-search"
                      : "search-card ps ps--active-y "
                  }
                >
                  {filterArtist && filterArtist.length >= 1 ? (
                    <div className="mb-3">
                      <div className="d-flex">
                        <span className="text-uppercase mr-auto font-weight-bold text-dark color-import">
                          Artists
                        </span>
                        <NavLink to="/artists" className="color-import">
                          View All
                        </NavLink>
                      </div>
                      <hr />
                      <div className="row">
                        {filterArtist &&
                          filterArtist.map((data, index) => {
                            return (
                              <div className="col-xl-2 col-md-4 ">
                                <div className="custom-card mb-3">
                                  <NavLink
                                    to={
                                      data.artistName &&
                                      `/artistData/${data.artistName}`
                                    }
                                    onClick={() => this.openSuggestionBox()}
                                  >
                                    <img
                                      src={data.artistImage}
                                      alt=""
                                      className="card-img--radius-md"
                                    />
                                    <p className="text-truncate mt-2 color-import ">
                                      {data.artistName}
                                    </p>
                                  </NavLink>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {filterTrack && filterTrack.length >= 1 ? (
                    <div className="mb-3">
                      <div className="d-flex">
                        <span className="text-uppercase mr-auto font-weight-bold text-dark color-import">
                          Track
                        </span>
                        <NavLink to="/music" className="color-import">
                          View All
                        </NavLink>
                      </div>
                      <hr />
                      <div className="row">
                        {filterTrack &&
                          filterTrack.map((data, index) => {
                            return (
                              <div
                                className="col-xl-4 col-md-6"
                                onClick={(e) =>
                                  this.getData(filterTrack, data._id)
                                }
                              >
                                <div
                                  className="custom-card mb-3"
                                  onClick={() => this.openSuggestionBox()}
                                >
                                  <div className="text-dark custom-card--inline">
                                    <div className="custom-card--inline-img">
                                      <img
                                        src={data.songImage}
                                        alt="song-profile"
                                        className="card-img--radius-sm"
                                        style={{
                                          height: "40px",
                                          width: "40px",
                                        }}
                                      />
                                    </div>
                                    <div className="custom-card--inline-desc">
                                      <p className="text-truncate mb-0 song-color pd-11">
                                        {data.songName}
                                      </p>
                                      <p className="text-truncate text-muted font-sm">
                                        {data.artistName}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
          </form>

          <ul className="header-options d-flex align-items-center">
            {/* <li style={{ listStyle: "none", display: "flex" }}>
              <span
                className="header-launguage"
                onClick={() => this.handleClickOpen()}
              >
                Language
              </span>
              <img src={translate} alt="translate" className="launguage-img" />
            </li> */}

            <li className="dropdown fade-in" ref={(node) => (this.node = node)}>
              <span
                className="d-flex align-items-center py-2"
                onClick={() => this.handleOpenProfile()}
                style={{ cursor: "pointer" }}
              >
                <div className="avatar avatar-sm avatar-circle">
                  <img src={this.state.profileImage} alt="profile" />
                </div>
                <span className="pl-2">{this.state.firstName}</span>
              </span>
              {dropdownActionVisible && (
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
                    transform: "translate3d(-52px, 21px, 0px)",
                  }}
                >
                  <NavLink to={"/profile"} onClick={() => this.hidePopover()}>
                    <span className="dropdown-item">
                      <i
                        className="iconify dropdown-icon"
                        data-icon="ion-md-contact"
                        data-inline="false"
                      ></i>
                      <span>Profile</span>
                    </span>
                  </NavLink>

                  {/* <span className="dropdown-item">
                    <span
                      className="iconify dropdown-icon"
                      data-icon="ion-md-radio-button-off"
                      data-inline="false"
                    ></span>
                    <span>Your Plan</span>
                  </span> */}
                  {/* <span className="dropdown-item">
                    <span
                      className="iconify dropdown-icon"
                      data-icon="ion-md-settings"
                      data-inline="false"
                    ></span>
                    <span>Change Password</span>
                  </span> */}
                  <div className="dropdown-divider"> </div>
                  <div className="px-4 py-2">
                    <span
                      className="btn btn-sm btn-air btn-pill btn-danger"
                      onClick={() => this.logoutUser()}
                    >
                      Logout
                    </span>
                  </div>
                </div>
              )}
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
                onClick={() => this.handleClose()}
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

const MapStateToProps = (state) => ({
  searchArray: state.home.searchData,
  userData: state.auth.loginData,
});

export default withRouter(
  connect(MapStateToProps, {
    logoutUser,
    setMusicData,
    getSearchAll,
    getUserDetails,
  })(Header)
);
