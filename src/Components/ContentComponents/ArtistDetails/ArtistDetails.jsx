import Axios from "axios";
import React, { Component } from "react";
import artistImage from "../../../Assets/image/sliderImage/1.jpg";
import "./ArtistDetails.scss";
import {
  artistsDetails,
  setMusicData,
  getChartDetails,
  genresMusic,
  genres,
  retroClassic,
} from "../../../Actions";
import { connect } from "react-redux";
class ArtistDetails extends Component {
  state = {
    tabValue: "topSongs",
    activeMusic: false,
  };
  componentDidMount() {
    console.log(this.props.match.params.musics);
    console.log(this.props.match.params.type);
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

  getData = (songName, songImage, artistName, songUrl) => {
    const songData = [
      {
        songName: songImage,
        songImage: songName,
        artist: artistName,
        songUrl: songUrl,
      },
    ];
    this.props.setMusicData(songData);
  };
  handleTabChange = (tabName) => {
    this.setState({
      tabValue: tabName,
    });
  };

  render() {
    console.log(this.props.currentState);
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
                <div className="row section text-centre text-md-left">
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
                          <button className="btn btn-pill btn-air btn-bold btn-danger play-all">
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
                    <i class="far fa-clock"></i>
                  </span>
                </li>
              </ul>
              <ul style={{ listStyle: "none", padding: "0" }}>
                {songsData &&
                  songsData.map((data, index) => {
                    return (
                      <li
                        key={index}
                        className={activeMusic ? "active-music" : "songs-row"}
                        onClick={(e) =>
                          this.getData(
                            data.songImage,
                            data.songName,
                            data.artistName,
                            data.songUrl
                          )
                        }
                      >
                        <ul className="a_l artworkload _cursor">
                          <li className="s_cnt p_cnt desktop">
                            <span className="_c sng_c">{index + 1}</span>
                          </li>
                          <li className="s_title p_title list loaded">
                            <div className="playlist-data">
                              <div className="playlist_thumb">
                                <img src={data.songImage} alt="song_image" />
                              </div>
                              <div className="playlist_thumb_det">
                                <span className="songs">{data.songName}</span>
                              </div>
                            </div>
                          </li>
                          <li className="s_artist p_artist desktop">
                            <div>
                              <span className="sng_c">{data.artistName}</span>
                            </div>
                          </li>
                          <li className="s_duration">
                            <span className="desktop sng_c">
                              {data.duration}
                            </span>
                          </li>
                        </ul>
                      </li>
                    );
                  })}
              </ul>
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
});

export default connect(MapStateToProps, {
  artistsDetails,
  setMusicData,
  getChartDetails,
  genresMusic,
  retroClassic,
})(ArtistDetails);
