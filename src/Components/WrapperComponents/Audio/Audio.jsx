import React, { Component } from "react";
import "./Audio.scss";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ReactAudioPlayer from "react-audio-player";
import songImage from "../../../Assets/image/sliderImage/1.jpg";
import { Icon, InlineIcon } from "@iconify/react";
import mdPlay from "@iconify-icons/ion/md-play";
import mdSync from "@iconify-icons/ion/md-sync";
import musicalNote from "@iconify-icons/ion/musical-note";
import music from "../../../Assets/Musics/test.mp3";
import mdVolumeLow from "@iconify-icons/ion/md-volume-low";
import ActionPopover from "../../ReusableComponents/ActionPopover/ActionPopover";
import { connect } from "react-redux";
import { normalizeUnits } from "moment";
import { getActiveIndex, downloadSong } from "../../../Actions";
import logger from "redux-logger";

class Audio extends Component {
  state = {
    dropdownExpand: false,
    volumeSlider: false,
    closeAudioControl: false,
    index: 0,
    onPlay: "http://localhost:4000/uploads/1608011825737.mp3",
    songName: "Ek Tarfa(Reprise)",
    songArtist: "Darshan Raval",
    songImage: "http://localhost:4000/uploads/1608114760948.jpg",
    songDownload: "5fe08ecd205bf820e2cf8f1f",
    shuffle: false,
    playSongs: [],
    prevIndex: [],
    shuffleIndex: 1,
  };
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
    if (this.node.contains(e.target)) {
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
    if (nextProps.currentIndex) {
      this.setState(
        {
          playSongs: nextProps.currentSongData,
          index: nextProps.currentIndex,
        },
        () => {
          this.setState(
            {
              onPlay: nextProps.currentSongData[this.state.index].songUrl,
              songName: nextProps.currentSongData[this.state.index].songName,
              songArtist:
                nextProps.currentSongData[this.state.index].artistName,
              songImage: nextProps.currentSongData[this.state.index].songImage,
              songDownload: nextProps.currentSongData[this.state.index]._id,
            },
            () => {
              this.props.getActiveIndex(this.state.index);
            }
          );
        }
      );
    } else {
      this.setState(
        {
          playSongs: nextProps.currentSongData,
          index: 0,
        },
        () => {
          this.setState(
            {
              onPlay: nextProps.currentSongData[this.state.index].songUrl,
              songName: nextProps.currentSongData[this.state.index].songName,
              songArtist:
                nextProps.currentSongData[this.state.index].artistName,
              songImage: nextProps.currentSongData[this.state.index].songImage,
              songDownload: nextProps.currentSongData[this.state.index]._id,
            },
            () => {
              this.props.getActiveIndex(this.state.index);
            }
          );
        }
      );
    }
  }

  nextSong = () => {
    if (this.state.shuffle) {
      const shuffleValue = Math.floor(
        Math.random(0, this.state.playSongs.length) * 10
      );

      this.setState(
        {
          prevIndex: this.state.prevIndex.concat(this.state.index),
        },
        () => {
          this.setState(
            {
              index: shuffleValue,
            },
            () => {
              this.setState(
                {
                  onPlay: this.state.playSongs[this.state.index].songUrl,
                  songName: this.state.playSongs[this.state.index].songName,
                  songArtist: this.state.playSongs[this.state.index].artistName,
                  songImage: this.state.playSongs[this.state.index].songImage,
                },
                () => {
                  this.props.getActiveIndex(this.state.index);
                }
              );
            }
          );
        }
      );
    } else {
      if (this.state.index === this.state.playSongs.length - 1) {
        this.setState(
          {
            index: 0,
          },
          () => {
            this.setState(
              {
                onPlay: this.state.playSongs[this.state.index].songUrl,
                songName: this.state.playSongs[this.state.index].songName,
                songArtist: this.state.playSongs[this.state.index].artistName,
                songImage: this.state.playSongs[this.state.index].songImage,
              },
              () => {
                this.props.getActiveIndex(this.state.index);
              }
            );
          }
        );
      } else {
        this.setState(
          {
            index: this.state.index + 1,
          },
          () => {
            this.setState(
              {
                onPlay: this.state.playSongs[this.state.index].songUrl,
                songName: this.state.playSongs[this.state.index].songName,
                songArtist: this.state.playSongs[this.state.index].artistName,
                songImage: this.state.playSongs[this.state.index].songImage,
              },
              () => {
                this.props.getActiveIndex(this.state.index);
              }
            );
          }
        );
      }
    }
  };

  previousSong = () => {
    if (this.state.shuffle) {
      this.setState(
        {
          index: this.state.prevIndex.length--,
        },
        () => {
          this.setState(
            {
              onPlay: this.state.playSongs[this.state.index].songUrl,
              songName: this.state.playSongs[this.state.index].songName,
              songArtist: this.state.playSongs[this.state.index].artistName,
              songImage: this.state.playSongs[this.state.index].songImage,
            },
            () => {
              this.props.getActiveIndex(this.state.index);
            }
          );
        }
      );
    } else {
      if (this.state.index === 0) {
        this.setState(
          {
            index: 0,
          },
          () => {
            this.setState(
              {
                onPlay: this.state.playSongs[this.state.index].songUrl,
                songName: this.state.playSongs[this.state.index].songName,
                songArtist: this.state.playSongs[this.state.index].artistName,
                songImage: this.state.playSongs[this.state.index].songImage,
              },
              () => {
                this.props.getActiveIndex(this.state.index);
              }
            );
          }
        );
      } else {
        this.setState(
          {
            index: this.state.index - 1,
          },
          () => {
            this.setState(
              {
                onPlay: this.state.playSongs[this.state.index].songUrl,
                songName: this.state.playSongs[this.state.index].songName,
                songArtist: this.state.playSongs[this.state.index].artistName,
                songImage: this.state.playSongs[this.state.index].songImage,
              },
              () => {
                this.props.getActiveIndex(this.state.index);
              }
            );
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
    this.props.downloadSong(this.state.songDownload);
  };
  render() {
    const {
      dropdownExpand,
      volumeSlider,
      onPlay,
      songName,
      songArtist,
      songImage,
      closeAudioControl,
      loopSong,
      shuffle,
    } = this.state;
    const loop = loopSong;
    const fullWidth = this.props;

    let audioClass;
    if (fullWidth.fullWidth) {
      audioClass = "audioPlayer long-player";
    } else {
      audioClass = "audioPlayer";
    }
    return (
      <div className={audioClass}>
        <div className="audio">
          <div className="song-image">
            <img src={songImage} alt="song-image" className="song-img" />
          </div>
          <div className="song-info pl-3">
            <span className="song-title">{songName}</span>
            <span className="song-artist">{songArtist}</span>
          </div>
        </div>
        <div className="audio-controls">
          <div className="audio-controls--left d-flex mr-auto">
            <AudioPlayer
              loop={loop}
              src={onPlay}
              onClickNext={this.nextSong}
              onClickPrevious={this.previousSong}
              autoPlay={true}
              showSkipControls={true}
              showJumpControls={false}
              customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
              customVolumeControls={[
                closeAudioControl && volumeSlider ? RHAP_UI.VOLUME : "",
                <button
                  ref={(node) => (this.node = node)}
                  className="btn btn-icon-only"
                  onClick={this.openVolumeSlider}
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
                RHAP_UI.MAIN_CONTROLS,
                <button
                  className="btn btn-icon-only amplitude-shuffle amplitude-shuffle-on"
                  onClick={this.shuffleStart}
                >
                  <span
                    className={"audio-player-icon iconify"}
                    data-icon="ion-md-shuffle"
                    data-inline="false"
                  ></span>
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
            <button className="btn btn-icon-only" onClick={this.downloadSong}>
              <span
                className="iconify audio-player-icon"
                data-icon="bx:bxs-download"
                data-inline="false"
              ></span>
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
            onClick={this.props.handleOpenSidebar}
          >
            <Icon className="music-icon" icon={musicalNote} />
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentSongData: state.home.songData,
  currentIndex: state.home.index,
});

export default connect(mapStateToProps, { getActiveIndex, downloadSong })(
  Audio
);
