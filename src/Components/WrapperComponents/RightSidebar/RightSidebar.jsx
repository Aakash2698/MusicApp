import React, { Component } from "react";
import Audio from "../Audio/Audio";
import "./RightSidebar.scss";
import { connect } from "react-redux";
import { setMusicData, clearQueue, deleteQueueSong } from "../../../Actions";
import axios from "axios";

class RightSidebar extends Component {
  constructor(props) {
    super(props);
    this.howItWorks = React.createRef();
  }
  state = {
    scrollTop: 0,
    openRightSidebar: false,
    rightSideAction: false,
    positionIndex: 0,
    scrollId: null,
  };

  handleDropdownChange = (index) => {
    this.setState({
      rightSideAction: !this.state.rightSideAction,
      positionIndex: index,
    });
  };

  handleOpenQueue = () => {
    this.setState({
      openRightSidebar: !this.state.openRightSidebar,
    });
  };
  // handleCloseQueue = () => {
  //   this.setState({
  //     openRightSidebar: false,
  //   });
  // };

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeSongIndex) {
      this.setState(
        {
          scrollId: nextProps.activeSongIndex,
        },
        () => {
          this.getScrollLocations(this.state.scrollId);
        }
      );
    }
  }

  clearQueueData = () => {
    this.props.clearQueue();
    window.setTimeout(() => {
      this.handleOpenQueue();
    }, 500);
  };

  getData = (songData, index) => {
    this.getScrollLocations(index);
    this.props.setMusicData(songData, index);
  };

  downloadSong = (id, songName) => {
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

  queueDelete = (id) => {
    console.log(id);
    this.props.deleteQueueSong(id);
  };

  getScrollLocations = (id) => {
    let whatIDo = document.getElementById(id);
    whatIDo &&
      whatIDo.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "end",
      });
  };

  render() {
    const {
      openRightSidebar,

      positionIndex,
    } = this.state;

    // const transform = null;

    let sliceSongsIndex = this.props.queue;

    // if (positionIndex === 0) {
    //   transform = "translate3d(137px, 18px, 0px)";
    // } else if (positionIndex === 1) {
    //   transform = "translate3d(137px, 83px, 0px)";
    // } else if (positionIndex === 2) {
    //   transform = "translate3d(137px, 148px, 0px)";
    // } else if (positionIndex === 3) {
    //   transform = "translate3d(137px, 213px, 0px)";
    // } else if (positionIndex === 4) {
    //   transform = "translate3d(137px, 213px, 0px)";
    // }
    return (
      <div
        className={
          !openRightSidebar ? "minimize-sidebar right-sidebar" : "right-sidebar"
        }
      >
        <div className="right-sidebar-header top-title-sidebar ">
          <div style={{ width: "85%" }}>Queue</div>
          <div onClick={() => this.clearQueueData()}> Clear</div>
        </div>
        <div
          className="right-sidebar-body ps ps--active-y"
          data-scrollable="true"
        >
          <ul
            className="list-group list-group-flush"
            style={{ flexDirection: "column" }}
          >
            {this.props.queue &&
              this.props.queue.map((data, index) => {
                return (
                  <li
                    className={
                      this.props.activeSongIndex === data._id
                        ? "active-song custom-list--item list-group-item d-flex"
                        : "custom-list--item list-group-item d-flex"
                    }
                    key={index}
                    id={data._id}
                    // onClick={(e) => this.getScrollLocations(data._id)}
                  >
                    <div
                      className="text-dark custom-card--inline amplitude-song-container amplitude-play-pause amplitude-paused"
                      onClick={() => this.getData(sliceSongsIndex, data._id)}
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
                        <p className="text-truncate mb-0">{data.songName}</p>
                        <p className="text-truncate text-muted font-sm">
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
            {/* <ActionPopover
              dropdownExpand={rightSideAction}
              transform={transform}
            /> */}
          </ul>
        </div>
        <Audio
          handleOpenQueue={this.handleOpenQueue}
          fullWidth={this.props.fullWidth}
          handleCloseQueue={this.handleCloseQueue}
        />
      </div>
    );
  }
}
const MapStateToProps = (state) => ({
  currentPlay: state.home.playSong,
  queue: state.home.queueSongs,
  activeSongIndex: state.home.activeIndex,
});
export default connect(MapStateToProps, {
  setMusicData,
  clearQueue,
  deleteQueueSong,
})(RightSidebar);
