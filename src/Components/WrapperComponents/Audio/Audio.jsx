import React, { Component } from "react";
import "./Audio.scss";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Icon } from "@iconify/react";
import musicalNote from "@iconify-icons/ion/musical-note";
import ActionPopover from "../../ReusableComponents/ActionPopover/ActionPopover";
import { connect } from "react-redux";
class Audio extends Component {
  state = {
    dropdownExpand: false,
    volumeSlider: false,
    onPlay: "http://localhost:4000/uploads/1608011825737.mp3",
    songName: "Ek Tarfa(Reprise)",
    songArtist: "Darshan Raval",
    songImage: "http://localhost:4000/uploads/1608114760948.jpg",
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
  componentWillReceiveProps(nextProps) {
    console.log(this.props);
    if (this.props.currentSongData !== nextProps.currentSongData) {
      nextProps.currentSongData.map((data, index) => {
        this.setState({
          onPlay: data.songUrl,
          songName: data.songName,
          songArtist: data.artist,
          songImage: data.songImage,
        });
      });
    }
  }

  render() {
    console.log(this.props.currentSongData);
    const {
      dropdownExpand,
      volumeSlider,
      onPlay,
      songName,
      songArtist,
      songImage,
    } = this.state;
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
              src={onPlay}
              showSkipControls={true}
              showJumpControls={false}
              customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
              customVolumeControls={[
                volumeSlider ? RHAP_UI.VOLUME : "",
                <button
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
                <button className="btn btn-icon-only">
                  <span
                    className="audio-player-icon iconify"
                    data-icon="ion-md-sync"
                    data-inline="false"
                  ></span>
                </button>,
                RHAP_UI.MAIN_CONTROLS,
                <button className="btn btn-icon-only amplitude-shuffle amplitude-shuffle-on">
                  <span
                    className="audio-player-icon iconify"
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
            <button
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
            />
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
});

export default connect(mapStateToProps)(Audio);
