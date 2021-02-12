import React, { Component } from "react";
import "./MobileAudioPlayer.scss";
// import "../RightSidebar/RightSidebar.scss";
import def from "../../../Assets/temp.jpg";
import Audio from "../Audio/Audio";
import { connect } from "react-redux";
import { setMusicData, clearQueue, deleteQueueSong } from "../../../Actions";
import axios from "axios";
class MobileAudioPlayer extends Component {
  state = {
    songIndex: "",
    songData: [],
    onPlay: "",
    songName: "",
    songArtist: "",
    songImage: "",
    songUrl: "",
  };
  componentDidMount() {
    if (this.props.currentIndex) {
      this.setIndex(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentIndex !== nextProps.currentIndex) {
      this.setIndex(nextProps);
    }
  }
  downloadSong = (id, songName) => {
    const url = "https://music-player-app26.herokuapp.com/songs/download/" + id;
    axios
      .get(url, {
        responseType: "blob",
        headers: {
          Accept: "*/*",
          "Content-Type": "audio/mpeg",
        },
      })
      .then((res) => {
        // let url = window.URL.createObjectURL(res.data);
        let a = document.createElement("a");
        a.href = res.config.url;
        a.download = songName + ".mp3";
        a.click();
      });
    this.setState({
      rightSideAction: !this.state.rightSideAction,
    });
  };

  setIndex = (nextProps) => {
    this.setState(
      {
        songIndex: nextProps.currentIndex,
        songData: nextProps.currentSongData,
      },
      () => {
        this.getScrollLocations(this.state.songIndex);
        var target = this.state.songData.find(
          (temp) => temp._id === this.state.songIndex
        );
        this.setState({
          onPlay: target.songUrl,
          songName: target.songName,
          songArtist: target.artistName,
          songImage: target.songImage,
          songUrl: target._id,
          songAction: true,
          playLoader: true,
        });
      }
    );
  };
  queueDelete = (id) => {
    this.props.deleteQueueSong(id);
  };

  getData = (songData, index) => {
    this.getScrollLocations(index);
    this.props.setMusicData(songData, index);
  };

  getScrollLocations = (id) => {
    let whatIDo = document.getElementById(id);
    console.log(whatIDo);
    whatIDo &&
      whatIDo.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "end",
      });
  };
  clearQueueData = () => {
    this.props.clearQueue();
    this.props.openMobilePlayer();
  };

  render() {
    let sliceSongsIndex = this.props.queueList;
    return (
      <div
        className={
          this.props.openPlayer
            ? "mobile-player-main showing"
            : "mobile-player-main"
        }
      >
        <div className="mobile-player-header">
          <div className="header-layout">
            <div className="layout-item" onClick={this.props.openMobilePlayer}>
              <span style={{ color: "#753fdc" }}>
                <i className="fas fa-times fa-2x"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="mobile-player-details" style={{ transform: "none" }}>
          <div className="mobile-player-songs">
            <div className="song-temp">
              <img
                src={this.state.songImage}
                alt="namee"
                className="layout-img"
              />
            </div>
            <div className="song-details">
              <section className="song-section">
                <div className="song-item-details">
                  <h2 className="songdata-name">{this.state.songName}</h2>
                  <h5 className="songdata-artist">{this.state.songArtist}</h5>
                </div>
              </section>
            </div>
          </div>

          <div className="mobile-player-queue">
            <h1 className="mobile-queue">Queue</h1>
            <div className="mobile-queue-action">
              <div className="px-4 py-2">
                <span
                  className="btn btn-sm btn-air btn-pill btn-danger"
                  onClick={this.clearQueueData}
                >
                  Clear
                </span>
              </div>
            </div>
          </div>
          <div
            className="right-sidebar-body ps ps--active-y"
            data-scrollable="true"
          >
            <ul
              className="list-group list-group-flush"
              style={{ flexDirection: "column" }}
            >
              {this.props.queueList &&
                this.props.queueList.map((data, index) => {
                  return (
                    <li
                      className={
                        this.state.songIndex === data._id
                          ? "active-song-col custom-list--item list-group-item d-flex item-color"
                          : "custom-list--item list-group-item d-flex item-color"
                      }
                      key={index}
                      id={data._id}
                      onClick={(e) => this.getScrollLocations(data._id)}
                    >
                      <div
                        className="text-dark custom-card--inline amplitude-song-container amplitude-play-pause amplitude-paused overwrite-inline"
                        onClick={() => this.getData(sliceSongsIndex, data._id)}
                      >
                        <div className="custom-card--inline-img">
                          <img
                            src={data.songImage}
                            alt="song-profile"
                            className="card-img--radius-sm"
                            style={{ height: "40px", width: "40px" }}
                          />
                        </div>
                        <div className="custom-card--inline-desc">
                          <p className="text-truncate mb-0 default-queue-color ">
                            {data.songName}
                          </p>
                          <p className="text-truncate text-muted font-sm default-queue-color ">
                            {data.artistName}
                          </p>
                        </div>
                      </div>
                      <ul className="custom-card--labels d-flex ml-auto">
                        <li className="dropleft hide-remove">
                          <button
                            className="btn btn-icon-only"
                            onClick={() => this.queueDelete(data._id)}
                          >
                            <span className="three-dot-action">
                              <i
                                className="fas fa-times-circle"
                                style={{ color: "white" }}
                              ></i>
                            </span>
                          </button>
                        </li>
                        <li className="dropleft">
                          <button
                            className="btn btn-icon-only"
                            onClick={() =>
                              this.downloadSong(data._id, data.songName)
                            }
                          >
                            <span className="three-dot-action">
                              <i
                                className="fas fa-download"
                                style={{ color: "white" }}
                              ></i>
                            </span>
                          </button>
                        </li>
                      </ul>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const MapStateToProps = (state) => ({
  currentSongData: state.home.songData,
  currentIndex: state.home.index,
  queueList: state.home.queueSongs,
});

export default connect(MapStateToProps, {
  setMusicData,
  clearQueue,
  deleteQueueSong,
})(MobileAudioPlayer);
