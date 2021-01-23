import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Home.scss";
import { connect } from "react-redux";
import {
  topChartMusic,
  newReleaseMusic,
  retroClassicMusic,
  radioMusic,
  featureArtists,
  genres,
  getSongsType,
  setMusicData,
  showLoader,
  hideLoader,
} from "../../../Actions";
import Carousel from "../../ReusableComponents/Carousel/CustomeCarousel";
import ActionPopover from "../../ReusableComponents/ActionPopover/ActionPopover";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabValue: "Recent",
      showPopover: false,
      currentIndex: 0,
      // topCharts: [
      //   {
      //     id: 1,
      //     songName: "I Love You Mummy",
      //     artist: "Arebica Luna",
      //     songImage: one,
      //   },
      //   {
      //     id: 2,
      //     songName: "Shack your butty",
      //     artist: "Gerrina Linda",
      //     songImage: two,
      //   },
      //   {
      //     id: 3,
      //     songName: "Do it your way(Female)",
      //     artist: "Zunira Willy & Nutty Nina",
      //     songImage: three,
      //   },
      //   {
      //     id: 4,
      //     songName: "Say yes",
      //     artist: "Johnny Marro",
      //     songImage: four,
      //   },
      //   {
      //     id: 5,
      //     songName: "Where is your letter",
      //     artist: "Jina Moore & Lenisa Gory",
      //     songImage: five,
      //   },
      //   {
      //     id: 6,
      //     songName: "Hey not me",
      //     artist: "Rasomi Pelina",
      //     songImage: six,
      //   },
      // ],
      responsive1: {
        0: {
          items: 1,
        },
        379: {
          items: 2,
        },
        639: {
          items: 3,
        },
        1199: {
          items: 4,
        },
        1439: {
          items: 5,
        },
      },
      responsive2: {
        0: {
          items: 1,
        },
        379: {
          items: 2,
        },
        639: {
          items: 4,
        },
        1199: {
          items: 5,
        },
        1439: {
          items: 6,
        },
      },
      responsive3: {
        0: {
          items: 1,
        },
        639: {
          items: 2,
        },
        1199: {
          items: 3,
        },
        1439: {
          items: 4,
        },
      },
      songData: [],
    };
  }

  handleShowPopOver = (index) => {
    this.setState({
      showPopover: !this.state.showPopover,
      currentIndex: index,
    });
  };

  componentDidMount() {
    this.props.showLoader();
    this.topChartMusic();
    this.newReleaseMusic();
    this.retroClassicMusic();
    this.radioMusic();
    this.featureArtist();
    this.genres();
    this.getSongs();
  }
  getSongs = () => {
    this.props.getSongsType("Recent");
  };

  handleTabChange = (tabName) => {
    this.setState(
      {
        tabValue: tabName,
      },
      () => {
        this.props.getSongsType(tabName);
      }
    );
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.songsType !== nextProps.songsType) {
      this.setState({
        songData: nextProps.songsType.songs,
      });
    }
  }

  topChartMusic = () => {
    this.props.topChartMusic();
  };
  newReleaseMusic = () => {
    this.props.newReleaseMusic();
  };
  retroClassicMusic = () => {
    this.props.retroClassicMusic();
  };
  radioMusic = () => {
    this.props.radioMusic();
  };
  featureArtist = () => {
    this.props.featureArtists();
  };
  genres = () => {
    this.props.genres();
  };
  getData = (songData, index) => {
    this.props.setMusicData(songData, index);
  };
  downloadSong = (id, filename) => {
    const url = "http://localhost:4000/songs/download/" + id;

    axios
      .get(url, {
        responseType: "blob",
        headers: {
          Accept: "*/*",
          "Content-Type": "audio/mpeg",
        },
      })
      .then((res) => {
        // fileDownload(res.data, filename);
        let url = window.URL.createObjectURL(res.data);

        let a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      });
  };

  render() {
    const {
      tabValue,
      songData,
      topCharts,
      showPopover,
      currentIndex,
      topChartsMusic,
      newReleasesMusic,
    } = this.state;
    let transform;
    if (currentIndex === 0) {
      transform = "translate3d(210px, 70px, 0px)";
    } else if (currentIndex === 1) {
      transform = "translate3d(210px, 125px, 0px)";
    } else if (currentIndex === 2) {
      transform = "translate3d(210px, 180px, 0px)";
    } else if (currentIndex === 3) {
      transform = "translate3d(210px, 235px, 0px)";
    } else if (currentIndex === 4) {
      transform = "translate3d(210px, 280px, 0px)";
    } else if (currentIndex === 5) {
      transform = "translate3d(210px, 335px, 0px)";
    }
    return (
      <div>
        <div className="section-1">
          <div className="top-header">
            <div className="d-flex flex-wrap align-items-end">
              <div className="flex-grow-1">
                <h4 className="top-charts">Top Charts</h4>
                <p className="listen-chart">Listen top charts</p>
              </div>
              <NavLink
                to="/music"
                className="btn btn-sm btn-pill btn-air btn-color"
              >
                View All
              </NavLink>
            </div>
            <hr />
          </div>
        </div>
        <div className="image-slide">
          <Carousel
            imagePath={this.props.topCharts}
            margin={30}
            imageSize="image-radius"
            responsive={this.state.responsive1}
            showPopover={true}
          />
        </div>
        <div className="row-music">
          <div className=" section col-xl-7 col-lg-6">
            <div className="row h-100">
              <div className="col-sm-5 pb-4">
                <div className="h-100 event event-v bg-img bg-img-radius-lg image-url"></div>
              </div>
              <div className="col-sm-7">
                <div className="h-50 pb-4">
                  <div className="h-100 event event-h bg-img bg-img-radius-lg back-img">
                    <div className="event-content p-4">
                      <h6 className="image-head">Dance with DJ Nowan</h6>
                      <p className="image-desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Beatae consectetur, ex explicabo.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="h-50 pb-4">
                  <div className="h-100 event event-h bg-img bg-img-radius-lg back-img2">
                    <div className="event-content p-4">
                      <h6 className="image-head">Move You's Legs</h6>
                      <p className="image-desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Beatae consectetur, ex explicabo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section col-xl-5 col-lg-6">
            <ul
              className="nav nav-tabs line-tabs line-tabs-primary text-uppercase mb-4 ul-cursor"
              id="songsList"
              role="tablist"
            >
              <li
                className="nav-item"
                onClick={() => this.handleTabChange("Recent")}
              >
                <a
                  className="nav-link link-color"
                  id="recent-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="recent"
                >
                  Recent
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => this.handleTabChange("Trending")}
              >
                <a
                  className="nav-link link-color"
                  id="trending-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="trending"
                >
                  Trending
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => this.handleTabChange("International")}
              >
                <a
                  className="nav-link link-color"
                  id="international-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="international"
                >
                  International
                </a>
              </li>
              <span
                className={
                  tabValue === "Recent"
                    ? "tabs-link-line recent-width"
                    : "tabs-link-line trending-width" &&
                      tabValue === "International"
                    ? "tabs-link-line international-width"
                    : "tabs-link-line trending-width"
                }
              ></span>
            </ul>
            <div className="tab-content" id="songsListContent">
              {tabValue === "Recent" && (
                <div
                  // className="tab-pane fade active show"
                  id="recent"
                  role="tabpanel"
                  aria-labelledby="recent-tab"
                >
                  <div className="custom-list">
                    {songData &&
                      songData.map((data, index) => {
                        return (
                          <div className="custom-item" key={index}>
                            <div
                              className="text-dark custom-card--inline"
                              onClick={(e) => this.getData(songData, data._id)}
                            >
                              <div className="custom-card--inline-img">
                                <img
                                  src={data.songImage}
                                  alt="song-image"
                                  className="card-img--radius-sm"
                                  style={{ height: "40px", width: "40px" }}
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
                            <ul className="custom-card--labels d-flex ml-auto">
                              <li
                                className="dropleft"
                                onClick={() =>
                                  this.downloadSong(
                                    data._id,
                                    data.songName + ".mp3"
                                  )
                                }
                              >
                                <button
                                  className="btn btn-icon-only"
                                  // onClick={(e) => this.handleShowPopOver(index)}
                                >
                                  <span style={{ color: "white" }}>
                                    <i
                                      className="fas fa-download"
                                      style={{ fontSize: "1.3rem" }}
                                    ></i>
                                  </span>
                                  {/* <span
                                    className="iconify three-dot-action"
                                    data-icon="fe-elipsis-h"
                                    data-inline="false"
                                  ></span> */}
                                </button>
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                  </div>
                  {/* <ActionPopover
                    dropdownExpand={showPopover}
                    transform={transform}
                  /> */}
                </div>
              )}
              {tabValue === "Trending" && (
                <div id="recent" role="tabpanel" aria-labelledby="recent-tab">
                  <div className="custom-list">
                    {songData &&
                      songData.map((data, index) => {
                        return (
                          <div className="custom-item" key={index}>
                            <div
                              className="text-dark custom-card--inline"
                              onClick={(e) => this.getData(songData, data._id)}
                            >
                              <div className="custom-card--inline-img">
                                <img
                                  src={data.songImage}
                                  alt="song-image"
                                  className="card-img--radius-sm"
                                  style={{ height: "40px", width: "40px" }}
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
                            <ul className="custom-card--labels d-flex ml-auto">
                              <li
                                className="dropleft"
                                onClick={() =>
                                  this.downloadSong(
                                    data._id,
                                    data.songName + ".mp3"
                                  )
                                }
                              >
                                <button
                                  className="btn btn-icon-only"
                                  // onClick={(e) => this.handleShowPopOver(index)}
                                >
                                  <span style={{ color: "white" }}>
                                    <i
                                      className="fas fa-download"
                                      style={{ fontSize: "1.3rem" }}
                                    ></i>
                                  </span>
                                  {/* <span
                                    className="iconify three-dot-action"
                                    data-icon="fe-elipsis-h"
                                    data-inline="false"
                                  ></span> */}
                                </button>
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                  </div>
                  {/* <ActionPopover
                    dropdownExpand={showPopover}
                    transform={transform}
                  /> */}
                </div>
              )}
              {tabValue === "International" && (
                <div
                  // className="tab-pane fade"
                  id="recent"
                  role="tabpanel"
                  aria-labelledby="recent-tab"
                >
                  <div className="custom-list">
                    {songData &&
                      songData.map((data, index) => {
                        return (
                          <div className="custom-item" key={index}>
                            <div
                              className="text-dark custom-card--inline"
                              onClick={(e) => this.getData(songData, data._id)}
                            >
                              <div className="custom-card--inline-img">
                                <img
                                  src={data.songImage}
                                  alt="song-image"
                                  className="card-img--radius-sm"
                                  style={{ height: "40px", width: "40px" }}
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
                            <ul className="custom-card--labels d-flex ml-auto">
                              <li
                                className="dropleft"
                                onClick={() =>
                                  this.downloadSong(
                                    data._id,
                                    data.songName + ".mp3"
                                  )
                                }
                              >
                                <button
                                  className="btn btn-icon-only"
                                  // onClick={(e) => this.handleShowPopOver(index)}
                                >
                                  <span style={{ color: "white" }}>
                                    <i
                                      className="fas fa-download"
                                      style={{ fontSize: "1.3rem" }}
                                    ></i>
                                  </span>
                                  {/* <span
                                    className="iconify three-dot-action"
                                    data-icon="fe-elipsis-h"
                                    data-inline="false"
                                  ></span> */}
                                </button>
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                  </div>
                  {/* <ActionPopover
                    dropdownExpand={showPopover}
                    transform={transform}
                  /> */}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="section-2">
          <div className="top-header">
            <div className="d-flex flex-wrap align-items-end">
              <div className="flex-grow-1">
                <h4 className="top-charts">New Releases</h4>
                <p className="listen-chart">Listen recently release music</p>
              </div>
              <NavLink
                to="/music"
                className="btn btn-sm btn-pill btn-air btn-color"
              >
                View All
              </NavLink>
            </div>
            <hr />
          </div>
        </div>
        <div className="image-slide">
          <Carousel
            imagePath={this.props.newReleases}
            margin={30}
            imageSize="image-radius"
            autoplay={true}
            responsive={this.state.responsive1}
            showPopover={true}
          />
        </div>
        <div className="section-3">
          <div className="top-header">
            <div className="d-flex flex-wrap align-items-end">
              <div className="flex-grow-1">
                <h4 className="top-charts">Featured Artists</h4>
                <p className="listen-chart">Select you best to listen</p>
              </div>
              <NavLink
                to="/artists"
                className="btn btn-sm btn-pill btn-air btn-color"
              >
                View All
              </NavLink>
            </div>
            <hr />
          </div>
        </div>
        <div className="image-slide">
          <Carousel
            imagePath={this.props.featureArtist}
            imageSize="image-radius image-size-181"
            margin={30}
            autoplay={true}
            responsive={this.state.responsive2}
          />
        </div>
        <div className="section-4">
          <div className="top-header">
            <div className="d-flex flex-wrap align-items-end">
              <div className="flex-grow-1">
                <h4 className="top-charts">Your Playlist</h4>
                <p className="listen-chart">You best to listen</p>
              </div>
              <NavLink
                to={`/homej`}
                className="btn btn-sm btn-pill btn-air btn-color"
              >
                View All
              </NavLink>
            </div>
            <hr />
          </div>
        </div>
        <div className="image-slide">
          <Carousel
            imagePath={this.props.genresData}
            imageSize="image-radius image-size-321"
            margin={30}
            autoplay={true}
            responsive={this.state.responsive3}
            showPlaylist={true}
          />
        </div>
        <div className="section-5">
          <div className="top-header">
            <div className="d-flex flex-wrap align-items-end">
              <div className="flex-grow-1">
                <h4 className="top-charts">Retro Classic</h4>
                <p className="listen-chart">Old is gold</p>
              </div>
              <NavLink
                to={`/homej`}
                className="btn btn-sm btn-pill btn-air btn-color"
              >
                View All
              </NavLink>
            </div>
            <hr />
          </div>
        </div>
        <div className="image-slide">
          <Carousel
            imagePath={this.props.retroClassic}
            imageSize="image-radius image-size-181"
            margin={30}
            autoplay={true}
            responsive={this.state.responsive2}
            showPopover={true}
          />
        </div>
        <div className="section-6">
          <div className="top-header">
            <div className="d-flex flex-wrap align-items-end">
              <div className="flex-grow-1">
                <h4 className="top-charts">Radio</h4>
                <p className="listen-chart">Listen live now</p>
              </div>
              <NavLink
                to="/stations"
                className="btn btn-sm btn-pill btn-air btn-color"
              >
                View All
              </NavLink>
            </div>
            <hr />
          </div>
        </div>
        <div className="image-slide">
          <Carousel
            imagePath={this.props.radio}
            imageSize="image-radius image-size-181"
            margin={30}
            autoplay={true}
            responsive={this.state.responsive2}
          />
        </div>
        <div className="section-7">
          <div className="top-header">
            <div className="d-flex flex-wrap align-items-end">
              <div className="flex-grow-1">
                <h4 className="top-charts">Genres</h4>
                <p className="listen-chart">Select you genre</p>
              </div>
              <NavLink
                to="/genres"
                className="btn btn-sm btn-pill btn-air btn-color"
              >
                View All
              </NavLink>
            </div>
            <hr />
          </div>
        </div>
        <div className="image-slide">
          <Carousel
            imagePath={this.props.genresData}
            imageSize="image-radius image-size-180"
            margin={30}
            autoplay={true}
            responsive={this.state.responsive2}
            backgroundBlur={true}
          />
        </div>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  topCharts: state.home.topChartsData,
  newReleases: state.home.newReleases,
  retroClassic: state.home.retroClassic,
  radio: state.home.radioMusic,
  featureArtist: state.home.featureArtists,
  genresData: state.home.genres,
  songsType: state.home.songsTypeData,
});

export default connect(MapStateToProps, {
  topChartMusic,
  newReleaseMusic,
  retroClassicMusic,
  radioMusic,
  featureArtists,
  genres,
  getSongsType,
  showLoader,
  hideLoader,
  setMusicData,
})(Home);
