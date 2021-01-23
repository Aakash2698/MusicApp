import React, { Component } from "react";
import "./Music.scss";
import { connect } from "react-redux";
import { AllSongs, setMusicData, showLoader } from "../../../Actions";
class Music extends Component {
  componentDidMount() {
    this.props.showLoader();
    this.AllSongs();
  }
  AllSongs = () => {
    this.props.AllSongs();
  };
  getData = (songData, index) => {
    this.props.setMusicData(songData, index);
  };
  render() {
    return (
      <div>
        <h1 className="genres-heading">Free Music</h1>
        <div className="row align-items-end">
          <span className="col-6 font-weight-bold">
            {this.props.songsData.length + " Results"}
          </span>
          <div className="col-12">
            <hr />
          </div>
        </div>
        <div className="section">
          <div className="custom-list ">
            {this.props.songsData &&
              this.props.songsData.map((data, index) => {
                return (
                  <div
                    className="custom-list--item "
                    onClick={(e) =>
                      this.getData(this.props.songsData, data._id)
                    }
                  >
                    <div className="text-dark custom-card--inline">
                      <div className="custom-card--inline-img">
                        <img
                          src={data.songImage}
                          alt="song-image"
                          className="card-img--radius-sm"
                          height="40px"
                          width="40px"
                        />
                      </div>
                      <div className="custom-card--inline-desc">
                        <p className="text-truncate mb-0 song-color pd-11 web-bold">
                          {data.songName}
                        </p>
                        <p className="text-truncate text-muted font-sm">
                          {data.artistName}
                        </p>
                      </div>
                    </div>
                    <div className="custom-card--labels d-flex ml-auto web-bold">
                      <p style={{ color: "#adb5bd" }}> {data.duration}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
const MapStateToProps = (state) => ({
  songsData: state.home.allSongs,
});

export default connect(MapStateToProps, {
  AllSongs,
  setMusicData,
  showLoader,
})(Music);
