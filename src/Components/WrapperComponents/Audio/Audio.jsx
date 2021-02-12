import React, { Component } from "react";
import "./Audio.scss";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import { Icon } from "@iconify/react";
// import musicalNote from "@iconify-icons/ion/musical-note";
import { connect } from "react-redux";
import { getActiveIndex, downloadSong } from "../../../Actions";
import axios from "axios";
import defaultImage from "../../../Assets/defaultSong.jpg";
import MobileAudioPlayer from "../MobileAudioPlayer/MobileAudioPlayer";

class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
    this.state = {
      dropdownExpand: false,
      volumeSlider: false,
      closeAudioControl: false,
      index: 0,
      onPlay: "",
      songName: "",
      songArtist: "",
      songImage: defaultImage,
      songUrl: "",
      shuffle: false,
      playSongs: [],
      prevIndex: [],
      shuffleIndex: 1,
      incrementShuffle: 0,
      openMobilePlayer: false,
      width: parseInt(JSON.stringify(window.innerWidth)),
      songAction: false,
      playLoader: false,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({
        width: parseInt(JSON.stringify(window.innerWidth)),
      });
    });
  }

  handleDropdownChange = () => {
    this.setState({
      dropdownExpand: !this.state.dropdownExpand,
    });
  };
  openVolumeSlider = () => {
    this.setState({
      volumeSlider: !this.state.volumeSlider,
    });
  };
  componentWillMount() {
    document.addEventListener("mousedown", this.popupActionClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.popupActionClick, false);
  }
  popupActionClick = (e) => {
    if (this.node && this.node.contains(e.target)) {
      this.setState({
        closeAudioControl: true,
      });
      return true;
    }
    this.setState({
      closeAudioControl: false,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.currentIndex !== nextProps.currentIndex) {
      this.getSongsData(nextProps);
    }
    if (nextProps.queueList.length === 0) {
      this.clearSongsData();
    }
  }
  clearSongsData = () => {
    this.setState({
      onPlay: "",
      songName: "",
      songArtist: "",
      songImage: defaultImage,
      songUrl: "",
      songAction: false,
    });
  };

  getSongsData = (nextProps) => {
    if (nextProps.currentIndex) {
      this.setState(
        {
          playSongs: nextProps.currentSongData,
          index: nextProps.currentIndex,
        },
        () => {
          var target = this.state.playSongs.find(
            (temp) => temp._id === this.state.index
          );
          this.setSongData(target);
          this.props.getActiveIndex(this.state.index, this.state.playSongs);
        }
      );
    } else {
      this.setState(
        {
          playSongs: nextProps.currentSongData,
          index: nextProps.currentSongData[0]._id,
        },
        () => {
          var target = nextProps.currentSongData.find(
            (temp) => temp._id === this.state.index
          );
          this.setSongData(target);
          this.props.getActiveIndex(this.state.index, this.state.playSongs);
        }
      );
    }
  };

  setSongData = (target) => {
    this.setState({
      onPlay: target.songUrl,
      songName: target.songName,
      songArtist: target.artistName,
      songImage: target.songImage,
      songUrl: target._id,
      songAction: true,
      playLoader: true,
    });
  };

  nextSong = () => {
    if (this.state.shuffle) {
      let shuffleValue = Math.floor(
        Math.random(0, this.props.queueList.length) * 10
      );

      if (!this.state.prevIndex.includes(shuffleValue)) {
        this.setState(
          {
            prevIndex: this.state.prevIndex.concat(shuffleValue),
          },
          () => {
            this.setState(
              {
                index: this.props.queueList[shuffleValue]._id,
              },
              () => {
                var target = this.props.queueList.find(
                  (temp) => temp._id === this.state.index
                );
                this.setSongData(target);
                this.props.getActiveIndex(
                  this.state.index,
                  this.props.queueList
                );
              }
            );
          }
        );
      }
    } else {
      const songIndex = this.props.queueList.findIndex((element, index) => {
        if (element._id === this.state.index) {
          return true;
        }
      });
      if (this.props.queueList.length === songIndex + 1) {
        this.setState(
          {
            index: this.props.queueList[0]._id,
          },
          () => {
            var target = this.props.queueList.find(
              (temp) => temp._id === this.state.index
            );
            this.setSongData(target);
            this.props.getActiveIndex(this.state.index, this.props.queueList);
          }
        );
      } else {
        let nextIndex;
        const songIndex = this.props.queueList.findIndex((element, index) => {
          if (element._id === this.state.index) {
            return true;
          }
        });
        nextIndex = this.props.queueList[songIndex + 1]._id;
        this.setState(
          {
            index: nextIndex,
          },
          () => {
            var target = this.props.queueList.find(
              (temp) => temp._id === this.state.index
            );
            this.setSongData(target);
            this.props.getActiveIndex(this.state.index, this.props.queueList);
          }
        );
      }
    }
  };

  previousSong = () => {
    if (this.state.shuffle) {
      this.setState(
        {
          index: this.state.incrementShuffle,
        },
        () => {
          this.setState(
            {
              onPlay: this.props.queueList[
                this.state.prevIndex[this.state.index]
              ].songUrl,
              songName: this.props.queueList[
                this.state.prevIndex[this.state.index]
              ].songName,
              songArtist: this.props.queueList[
                this.state.prevIndex[this.state.index]
              ].artistName,
              songImage: this.props.queueList[
                this.state.prevIndex[this.state.index]
              ].songImage,
              songUrl: this.props.queueList[
                this.state.prevIndex[this.state.index]
              ]._id,
            },
            () => {
              if (
                this.state.incrementShuffle <
                this.state.prevIndex.length - 1
              ) {
                this.setState({
                  incrementShuffle: this.state.incrementShuffle + 1,
                });
              }

              let indexData = this.props.queueList[
                this.state.prevIndex[this.state.index]
              ]._id;
              this.props.getActiveIndex(indexData, this.props.queueList);
            }
          );
        }
      );
    } else {
      if (this.state.index === this.props.queueList[0]._id) {
        this.setState(
          {
            index: this.props.queueList[0]._id,
          },
          () => {
            var target = this.props.queueList.find(
              (temp) => temp._id === this.state.index
            );
            this.setSongData(target);
            this.props.getActiveIndex(this.state.index, this.props.queueList);
          }
        );
      } else {
        let nextIndex;
        const songIndex = this.props.queueList.findIndex((element, index) => {
          if (element._id === this.state.index) {
            return true;
          }
        });
        nextIndex = this.props.queueList[songIndex - 1]._id;
        this.setState(
          {
            index: nextIndex,
          },
          () => {
            var target = this.props.queueList.find(
              (temp) => temp._id === this.state.index
            );
            this.setSongData(target);
            this.props.getActiveIndex(this.state.index, this.props.queueList);
          }
        );
      }
    }
  };

  shuffleStart = () => {
    this.setState({
      shuffle: !this.state.shuffle,
    });
  };

  downloadSong = () => {
    const url =
      "https://music-player-app26.herokuapp.com/songs/download/" +
      this.state.songUrl;
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
        a.download = this.state.songName + ".mp3";
        a.click();
      });
  };

  songAction = () => {
    this.setState(
      {
        songAction: !this.state.songAction,
      },
      () => {
        if (this.state.songAction === false) {
          this.player.current.audio.current.pause();
        } else {
          this.player.current.audio.current.play();
        }
      }
    );
  };

  hideLoader = () => {
    this.setState({
      playLoader: false,
    });
  };

  render() {
    const {
      volumeSlider,
      onPlay,
      songName,
      songArtist,
      songImage,
      closeAudioControl,
      loopSong,
      width,
    } = this.state;
    const loop = loopSong;
    const fullWidth = this.props;
    let audioClass;
    if (fullWidth.fullWidth) {
      audioClass = "audioPlayer long-player";
    } else {
      audioClass = "audioPlayer";
    }

    return this.props.openPlayer ? (
      <div
        className="mobile-audio"
        onChange={width > 446 ? this.props.openMobilePlayer() : undefined}
      >
        <div className="mobile-player-root"></div>
        <div className="mobile-audio-controls">
          <div className="audio-controls--left d-flex mr-auto">
            <AudioPlayer
              onCanPlayThrough={this.hideLoader}
              ref={this.player}
              loop={loop}
              src={onPlay}
              onClickNext={this.nextSong}
              onClickPrevious={this.previousSong}
              onPlay={this.playSongs}
              onPause={this.pauseSongs}
              showSkipControls={true}
              showJumpControls={false}
              customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
              customControlsSection={[
                RHAP_UI.LOOP,
                <button
                  className="btn btn-icon-only"
                  onClick={() => this.previousSong()}
                >
                  <span className="audio-player-icon">
                    <i
                      className="fas fa-step-backward"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </span>
                </button>,

                <button
                  className="btn btn-icon-only "
                  onClick={this.songAction}
                >
                  <span className="audio-player-icon">
                    {this.state.playLoader ? (
                      <i
                        className="fas fa-circle-notch fa-spin"
                        style={{ color: "#753fdc", fontSize: "2.3rem" }}
                      ></i>
                    ) : (
                      <i
                        style={{ color: "#753fdc", fontSize: "2.3rem" }}
                        className={
                          !this.state.songAction
                            ? "fas fa-play"
                            : "fas fa-pause"
                        }
                      ></i>
                    )}
                  </span>
                </button>,

                <button
                  className="btn btn-icon-only "
                  onClick={() => this.nextSong()}
                >
                  <span className="audio-player-icon">
                    <i
                      className="fas fa-step-forward"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </span>
                </button>,

                <button
                  className="btn btn-icon-only amplitude-shuffle amplitude-shuffle-on"
                  onClick={() => this.shuffleStart()}
                >
                  <span className="audio-player-icon ">
                    <i
                      className={
                        this.state.shuffle
                          ? "fas fa-random set-active"
                          : "fas fa-random"
                      }
                      style={{ fontSize: "1.4rem" }}
                    ></i>
                  </span>
                </button>,

                RHAP_UI.CURRENT_TIME,
                <div className="or-arrow"> / </div>,
                RHAP_UI.DURATION,
              ]}
            />
          </div>
        </div>
      </div>
    ) : (
      <div className={audioClass}>
        <div
          className="audio"
          onClick={width <= 446 ? this.props.openMobilePlayer : null}
        >
          <div className="song-image">
            <img src={songImage} alt="current-song" className="song-img" />
          </div>
          <div className="song-info pl-3">
            <span className="song-title">{songName}</span>
            <span className="song-artist">{songArtist}</span>
          </div>
        </div>
        <div className="audio-controls">
          <div className="audio-controls--left d-flex mr-auto">
            <AudioPlayer
              onCanPlayThrough={this.hideLoader}
              ref={this.player}
              loop={loop}
              src={onPlay}
              onClickNext={this.nextSong}
              onClickPrevious={this.previousSong}
              onPlay={this.playSongs}
              onPause={this.pauseSongs}
              showSkipControls={true}
              showJumpControls={false}
              customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
              customVolumeControls={[
                closeAudioControl && volumeSlider ? RHAP_UI.VOLUME : "",
                <button
                  ref={(node) => (this.node = node)}
                  className="btn btn-icon-only"
                  onClick={() => this.openVolumeSlider()}
                  style={{ position: "absolute", right: "105px" }}
                >
                  <span
                    className="iconify audio-player-icon"
                    data-icon="ion-md-volume-low"
                    data-inline="false"
                  ></span>
                </button>,
              ]}
              customControlsSection={[
                RHAP_UI.LOOP,
                // RHAP_UI.MAIN_CONTROLS,
                <button
                  className="btn btn-icon-only previous-btn"
                  onClick={() => this.previousSong()}
                >
                  <span className="audio-player-icon">
                    <i
                      className="fas fa-step-backward"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </span>
                </button>,

                <button
                  className="btn btn-icon-only play-btn"
                  onClick={this.songAction}
                >
                  <span className="audio-player-icon">
                    {this.state.playLoader ? (
                      <i
                        className="fas fa-circle-notch fa-spin"
                        style={{ color: "#753fdc", fontSize: "2.3rem" }}
                      ></i>
                    ) : (
                      <i
                        style={{ color: "#753fdc", fontSize: "2.3rem" }}
                        className={
                          !this.state.songAction
                            ? "fas fa-play"
                            : "fas fa-pause"
                        }
                      ></i>
                    )}
                  </span>
                </button>,

                <button
                  className="btn btn-icon-only next-btn"
                  onClick={() => this.nextSong()}
                >
                  <span className="audio-player-icon">
                    <i
                      className="fas fa-step-forward"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </span>
                </button>,

                <button
                  className="btn btn-icon-only amplitude-shuffle amplitude-shuffle-on media-shuffle"
                  onClick={() => this.shuffleStart()}
                >
                  <span className="audio-player-icon ">
                    <i
                      className={
                        this.state.shuffle
                          ? "fas fa-random set-active"
                          : "fas fa-random"
                      }
                      style={{ fontSize: "1.4rem" }}
                    ></i>
                  </span>
                </button>,

                RHAP_UI.CURRENT_TIME,
                <div className="or-arrow"> / </div>,
                RHAP_UI.DURATION,
                RHAP_UI.VOLUME_CONTROLS,
              ]}
            />
          </div>
        </div>
        <div className="audio-info">
          <div className="dropleft">
            <button
              className="btn btn-icon-only"
              onClick={() => this.downloadSong()}
            >
              <span style={{ color: "white" }}>
                <i
                  className="fas fa-download"
                  style={{ fontSize: "1.3rem" }}
                ></i>
              </span>
              {/* <span
                className="iconify audio-player-icon"
                data-icon="bx:bxs-download"
                data-inline="false"
              ></span> */}
            </button>
            {/* <button
              className="btn btn-icon-only"
              onClick={this.handleDropdownChange}
            >
              <span
                className="iconify audio-player-icon"
                data-icon="fe:elipsis-v"
                data-inline="false"
              ></span>
            </button>
            <ActionPopover
              dropdownExpand={dropdownExpand}
              transform="translate3d(-162px, -143px, 0px)"
            /> */}
          </div>
          <button
            className="btn btn-icon-only"
            onClick={() => this.props.handleOpenQueue()}
          >
            <span
              className="iconify music-icon"
              data-icon="bi:music-note-list"
              data-inline="false"
            ></span>

            {/* <Icon className="music-icon" icon={musicalNote} /> */}
          </button>
        </div>
      </div>
    );
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    getActiveIndex: (index, playsongs) => {
      dispatch(getActiveIndex(index, playsongs));
    },
    downloadSong: () => {
      dispatch(downloadSong());
    },
  };
};

const mapStateToProps = (state) => ({
  currentSongData: state.home.songData,
  currentIndex: state.home.index,
  queueList: state.home.queueSongs,
});

export default connect(mapStateToProps, MapDispatchToProps)(Audio);
