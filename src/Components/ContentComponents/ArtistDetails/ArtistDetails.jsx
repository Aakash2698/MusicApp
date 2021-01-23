import Axios from "axios";
import React, { Component } from "react";
import artistImage from "../../../Assets/image/sliderImage/1.jpg";
import "./ArtistDetails.scss";
import ActionPopover from "../../ReusableComponents/ActionPopover/ActionPopover";
import {
  artistsDetails,
  setMusicData,
  getChartDetails,
  genresMusic,
  genres,
  retroClassic,
  hideLoader,
  downloadSong,
  getActiveIndex,
} from "../../../Actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import { exact } from "prop-types";
import axios from "axios";
class ArtistDetails extends Component {
  state = {
    tabValue: "topSongs",
    activeMusic: false,
    playIndex: null,
    rightSideAction: false,
    positionIndex: 0,
    songId: "",
    songName: "",
    allSongs: [],
  };
  componentDidMount() {
    if (this.props.match.params.type === "chartsData") {
      this.getChartDetails();
    }
    if (this.props.match.params.type === "artistData") {
      this.artistDetails();
    }
    if (this.props.match.params.type === "genresData") {
      this.genresMusic();
    }
    if (this.props.match.params.type === "hitsArtistData") {
      this.retroClassic();
    }
  }

  artistDetails = () => {
    this.props.artistsDetails(this.props.match.params.musics);
  };

  getChartDetails = () => {
    this.props.getChartDetails(this.props.match.params.musics);
  };

  genresMusic = () => {
    this.props.genresMusic(this.props.match.params.musics);
  };

  retroClassic = () => {
    this.props.retroClassic(this.props.match.params.musics);
  };

  getData = (songData, id) => {
    {
      this.props.setMusicData(songData, id);
    }
  };

  handleTabChange = (tabName) => {
    this.setState({
      tabValue: tabName,
    });
  };

  playAll = (allSongData) => {
    this.props.setMusicData(allSongData);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeSongIndex) {
      this.setState({
        playIndex: nextProps.activeSongIndex,
      });
    }
    if (nextProps.queueList.length === 0) {
      this.setState({
        playIndex: null,
      });
    }
  }

  downloadSong = () => {
    const url = "http://localhost:4000/songs/download/" + this.state.songId;
    axios
      .get(url, {
        responseType: "blob",
        headers: {
          Accept: "*/*",
          "Content-Type": "audio/mpeg",
        },
      })
      .then((res) => {
        let url = window.URL.createObjectURL(res.data);
        let a = document.createElement("a");
        a.href = res.config.url;
        a.download = this.state.songName + ".mp3";
        a.click();
      });
    this.setState({
      rightSideAction: !this.state.rightSideAction,
    });
  };

  handleDropdownChange = (index, songId, songName, wholeSongData) => {
    this.setState({
      rightSideAction: !this.state.rightSideAction,
      positionIndex: index,
      songId: songId,
      songName: songName,
      allSongs: wholeSongData,
    });
  };

  addQueue = () => {
    console.log(this.props.queueList.length, "ZZzzzzzzzzzzz");

    if (this.props.queueList.length === 0) {
      this.getData(this.state.allSongs, this.state.songId);
    }
    this.props.getActiveIndex(null, this.state.allSongs);
    this.setState({
      rightSideAction: !this.state.rightSideAction,
    });
  };

  render() {
    const { rightSideAction, positionIndex } = this.state;
    let transform;

    if (positionIndex === 0) {
      transform = "translate3d(775px, 234px, 0px)";
    } else if (positionIndex === 1) {
      transform = "translate3d(775px, 288px, 0px)";
    } else if (positionIndex === 2) {
      transform = "translate3d(775px, 342px, 0px)";
    } else if (positionIndex === 3) {
      transform = "translate3d(775px, 396px, 0px)";
    } else if (positionIndex === 4) {
      transform = "translate3d(775px, 450px, 0px)";
    } else if (positionIndex === 5) {
      transform = "translate3d(775px, 504px, 0px)";
    } else if (positionIndex === 6) {
      transform = "translate3d(775px, 558px, 0px)";
    } else if (positionIndex === 7) {
      transform = "translate3d(775px, 612px, 0px)";
    }

    let artistData, songsData;
    if (this.props.currentState === "topCharts") {
      artistData = this.props.topCharts.artists;
      songsData = this.props.topCharts.songs;
    } else if (this.props.currentState === "artistSongs") {
      artistData = this.props.artistDetails.artists;
      songsData = this.props.artistDetails.songs;
    } else if (this.props.currentState === "genresMusic") {
      artistData = this.props.genres.artists;
      songsData = this.props.genres.songs;
    } else if (this.props.currentState === "retroClassic") {
      artistData = this.props.retroClassics.artists;
      songsData = this.props.retroClassics.songs;
    }

    const { activeMusic } = this.state;

    return (
      <div>
        <div>
          {artistData &&
            artistData.map((data, index) => {
              return (
                <div
                  className="row section text-centre text-md-left"
                  key={index}
                >
                  <div className="col-xl-3 col-lg-4 col-sm-5 song-header-image">
                    <img
                      src={
                        data.artistImage ||
                        data.chartImage ||
                        data.genresImage ||
                        data.hitsArtistImage
                      }
                      alt="artist-image"
                      className="card-img--radius-lg"
                    />
                  </div>
                  <div className="col-xl-9 col-lg-8 col-sm-7">
                    <div className="row pt-4">
                      <div className="col-xl-8 col-lg-6">
                        <h5 className="artist-name">
                          {data.artistName ||
                            data.chartName ||
                            data.genresName ||
                            "Hits Of " + data.hitsArtistName}
                        </h5>
                        <div className="mt-4">
                          <button
                            className="btn btn-pill btn-air btn-bold btn-danger play-all"
                            onClick={(e) => this.playAll(songsData)}
                          >
                            Play all
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="section">
            <div className="custom-list">
              <ul className="s_l s_h desktopflex" style={{ margin: "0" }}>
                <li className="s_cnt">
                  <span className="row-head">#</span>
                </li>
                <li className="s_title">
                  <span className="row-head">Title</span>
                </li>
                <li className="s_artist">
                  <span className="row-head">Artists</span>
                </li>
                <li className="s_duration">
                  <span className="row-head">
                    Duration
                    {/* <i class="far fa-clock"></i> */}
                  </span>
                </li>
                <li className="s_download-icon">
                  <span className="row-head">
                    {/* <i class="fas fa-download"></i> */}
                  </span>
                </li>
              </ul>
              <ul style={{ listStyle: "none", padding: "0" }}>
                {songsData &&
                  songsData.map((data, index) => {
                    return (
                      <li
                        key={index}
                        className={
                          this.state.playIndex === data._id
                            ? "active-music"
                            : "songs-row"
                        }
                      >
                        <ul className="a_l artworkload _cursor">
                          <li
                            className="s_cnt p_cnt desktop"
                            onClick={(e) => this.getData(songsData, data._id)}
                          >
                            <span className="_c sng_c">{index + 1}</span>
                          </li>
                          <li
                            className="s_title p_title list loaded"
                            onClick={(e) => this.getData(songsData, data._id)}
                          >
                            <div className="playlist-data">
                              <div className="playlist_thumb">
                                <img src={data.songImage} alt="song_image" />
                              </div>
                              <div className="playlist_thumb_det">
                                <span className="songs">{data.songName}</span>
                              </div>
                            </div>
                          </li>
                          <li
                            className="s_artist p_artist desktop"
                            onClick={(e) => this.getData(songsData, data._id)}
                          >
                            <div>
                              <span className="sng_c">{data.artistName}</span>
                            </div>
                          </li>
                          <li
                            className="s_duration"
                            onClick={(e) => this.getData(songsData, data._id)}
                          >
                            <span
                              className="desktop sng_c"
                              style={{ width: "40%", textAlign: "center" }}
                            >
                              {data.duration}
                            </span>
                          </li>
                          <li
                            className="s_download-icon"
                            onClick={(e) =>
                              this.handleDropdownChange(
                                index,
                                data._id,
                                data.songName,
                                [data]
                              )
                            }
                            // onClick={() =>
                            //   this.downloadSong(data._id, data.songName)
                            // }
                          >
                            <span className="sng_c">
                              <i
                                className="fas fa-ellipsis-h"
                                style={{ fontSize: "1.3rem" }}
                              ></i>
                            </span>
                            {/* <span
                              className="sng_c"
                              style={{ width: "90%", textAlign: "center" }}
                            >
                              <i
                                className="fas fa-download"
                                style={{ fontSize: "1.3rem" }}
                              ></i>
                            </span> */}
                          </li>
                        </ul>
                      </li>
                    );
                  })}
              </ul>
              <ActionPopover
                dropdownExpand={rightSideAction}
                transform={transform}
                downloadSong={this.downloadSong}
                addQueue={this.addQueue}
                // download={this.downloadSong(
                //   this.state.songId,
                //   this.state.songName
                // )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const MapStateToProps = (state) => ({
  artistDetails: state.home.artistDetails,
  topCharts: state.home.topCharts,
  genres: state.home.genresMusic,
  currentState: state.home.currentData,
  retroClassics: state.home.retroClassicMusic,
  activeSongIndex: state.home.activeIndex,
  downloadUrl: state.home.downloadFile,
  queueList: state.home.queueSongs,
});

export default withRouter(
  connect(MapStateToProps, {
    artistsDetails,
    setMusicData,
    getChartDetails,
    genresMusic,
    retroClassic,
    hideLoader,
    downloadSong,
    getActiveIndex,
  })(ArtistDetails)
);
