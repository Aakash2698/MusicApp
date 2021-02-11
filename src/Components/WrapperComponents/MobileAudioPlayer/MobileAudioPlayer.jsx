import React, { Component } from "react";
import "./MobileAudioPlayer.scss";
import def from "../../../Assets/temp.jpg";
import Audio from "../Audio/Audio";
import { connect } from "react-redux";

class MobileAudioPlayer extends Component {
  componentDidMount() {
    console.log();
    console.log("djdsdusdub");
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props);
  }
  render() {
    return (
      <div className="mobile-player-main">
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
              <img src={def} alt="namee" className="layout-img" />
            </div>
            <div className="song-details">
              <section className="song-section">
                <div className="song-item-details">
                  <h2 className="song-des-name">Sanam Re</h2>
                  <h5 className="song-des-name">Pritam</h5>
                </div>
              </section>
            </div>
          </div>
          <div className="mobile-player-queue"></div>
        </div>
        <div>
          <Audio />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentSongData: state.home.songData,
  currentIndex: state.home.index,
  queueList: state.home.queueSongs,
});

export default connect(mapStateToProps, null)(MobileAudioPlayer);
