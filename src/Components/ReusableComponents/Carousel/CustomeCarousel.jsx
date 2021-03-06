import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Carousel.scss";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setMusicData, showLoader } from "../../../Actions";
import defaultSong from "../../../Assets/defaultssong.jpg";
import ReactImageAppear from "react-image-appear";

class Carousel extends Component {
  state = {
    openPopover: false,
    songName: "",
    artist: "",
    songImage: "",
    songUrl: "",
  };
  handleOpenPopover = () => {
    this.setState({
      openPopover: !this.state.openPopover,
    });
  };

  getSongData = (songData, index) => {
    this.props.setMusicData(songData, index);
  };
  render() {
    const navTest = [
      '<span class="la la-angle-left font-width"></span>',
      '<span class="la la-angle-right "></span>',
    ];
    const imagePath = this.props.imagePath;

    return (
      <div className="container-fluid pd-0">
        <OwlCarousel
          items={this.props.items}
          nav={true}
          margin={this.props.margin}
          autoplay={this.props.autoplay}
          responsiveClass={true}
          responsive={this.props.responsive}
          navText={navTest}
          dots={false}
        >
          {imagePath &&
            imagePath.map((data, index) => {
              return (
                <div
                  className={this.props.imageSize}
                  onClick={() =>
                    data.songUrl
                      ? (e) => this.getSongData(imagePath, data._id)
                      : ""
                  }
                >
                  {data.artistImage ||
                  data.chartImage ||
                  data.genresImage ||
                  data.hitsArtistImage ? (
                    <NavLink
                      onClick={(e) => this.props.showLoader()}
                      to={
                        (data.artistName && `/artistData/${data.artistName}`) ||
                        (data.chartName && `/chartsData/${data.chartName}`) ||
                        (data.genresName && `/genresData/${data.genresName}`) ||
                        (data.hitsArtistName &&
                          `/hitsArtistData/${data.hitsArtistName}`)
                      }
                    >
                      <img
                        src={
                          data.songImage ||
                          data.radioImage ||
                          data.artistImage ||
                          data.chartImage ||
                          data.genresImage ||
                          data.hitsArtistImage
                        }
                        alt="all-song"
                        className={this.props.imageSize}
                        key={index}
                      />
                    </NavLink>
                  ) : (
                    <img
                      src={
                        data.songImage ||
                        data.radioImage ||
                        data.artistImage ||
                        data.chartImage ||
                        data.genresImage ||
                        data.hitsArtistImage
                      }
                      alt="all-song"
                      className={this.props.imageSize}
                      key={index}
                    />
                  )}

                  {this.props.showPlaylist ? (
                    <span className="bg-blur">{data.genresName}</span>
                  ) : (
                    ""
                  )}
                  {this.props.backgroundBlur ? (
                    <span className="bg-blur">{data.genresName}</span>
                  ) : (
                    ""
                  )}

                  {/* {this.props.showPopover ? (
                    <div
                      className="three-dot-dropdown"
                      onClick={this.handleOpenPopover}
                    >
                      <span
                        className="iconify caursol-three-dotes"
                        data-icon="fe-elipsis-v"
                        data-inline="false"
                      ></span>
                      {openPopover ? <ImagePopover /> : ""}
                    </div>
                  ) : (
                    ""
                  )} */}
                  <div className="custom-card--link mt-2">
                    <h6 className="song-name">
                      {data.songName ||
                        data.radioName ||
                        data.artistName ||
                        data.chartName ||
                        data.hitsArtistName}
                    </h6>
                    <p className="artist">{data.artist}</p>
                  </div>
                </div>
              );
            })}
        </OwlCarousel>
      </div>
    );
  }
}

export default withRouter(
  connect(null, { setMusicData, showLoader })(Carousel)
);
