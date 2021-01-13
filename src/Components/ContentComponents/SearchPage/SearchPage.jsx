import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { getSearchAll, setMusicData } from "../../../Actions";

import "./SearchPage.scss";
class SearchPage extends Component {
  componentDidMount() {
    this.searchData();
  }

  searchData = () => {
    this.props.getSearchAll(this.props.match.params.key);
  };
  getData = (songData, index) => {
    this.props.setMusicData(songData, index);
  };
  render() {
    const filterTopCharts = this.props.searchArray.topChartsData;
    const filterArtist = this.props.searchArray.albumData;
    const filterTrack = this.props.searchArray.songData;
    const filterRetroClassic = this.props.searchArray.retroClassic;
    const filterRadio = this.props.searchArray.radioData;
    const filterGenres = this.props.searchArray.genresData;

    return (
      <div>
        <h4 className="genres-heading">
          Search Result for {this.props.match.params.key}
        </h4>
        <div className="row align-items-end"></div>
        {/* {filterTopCharts &&
        filterArtist &&
        filterTrack &&
        filterRetroClassic &&
        filterRadio &&
        filterGenres &&
        (filterTopCharts.length !== 0 ||
          filterArtist.length !== 0 ||
          filterTrack.length !== 0 ||
          filterRetroClassic.length !== 0 ||
          filterRadio.length !== 0 ||
          filterRadio.length !== 0 ||
          filterGenres.length !== 0) ? ( */}
        <div className="section">
          {filterTopCharts && filterTopCharts.length >= 1 ? (
            <div className="mb-3">
              <div className="d-flex">
                <span className="text-uppercase mr-auto font-weight-bold text-dark color-import">
                  Top Charts
                </span>
              </div>
              <hr />
              <div className="row">
                {filterTopCharts &&
                  filterTopCharts.map((data, index) => {
                    return (
                      <div className="col-xl-2 col-md-4 ">
                        <div className="custom-card mb-3">
                          <NavLink
                            to={
                              data.chartName && `/chartsData/${data.chartName}`
                            }
                          >
                            <img
                              src={data.chartImage}
                              alt=""
                              className="card-img--radius-md"
                            />
                            <p className="text-truncate mt-2 color-import ">
                              {data.chartName}
                            </p>
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            ""
          )}
          {filterArtist && filterArtist.length >= 1 ? (
            <div className="mb-3">
              <div className="d-flex">
                <span className="text-uppercase mr-auto font-weight-bold text-dark color-import">
                  Artists
                </span>
              </div>
              <hr />
              <div className="row">
                {filterArtist &&
                  filterArtist.map((data, index) => {
                    return (
                      <div className="col-xl-2 col-md-4 ">
                        <div className="custom-card mb-3">
                          <NavLink
                            to={
                              data.artistName &&
                              `/artistData/${data.artistName}`
                            }
                          >
                            <img
                              src={data.artistImage}
                              alt=""
                              className="card-img--radius-md"
                            />
                            <p className="text-truncate mt-2 color-import ">
                              {data.artistName}
                            </p>
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            ""
          )}

          {filterTrack && filterTrack.length >= 1 ? (
            <div className="mb-3">
              <div className="d-flex">
                <span className="text-uppercase mr-auto font-weight-bold text-dark color-import">
                  Songs
                </span>
              </div>
              <hr />
              <div className="row">
                {filterTrack &&
                  filterTrack.map((data, index) => {
                    return (
                      <div
                        className="col-xl-4 col-md-6"
                        onClick={(e) => this.getData(filterTrack, data._id)}
                      >
                        <div className="custom-card mb-3">
                          <div className="text-dark custom-card--inline">
                            <div className="custom-card--inline-img">
                              <img
                                src={data.songImage}
                                alt="song-image"
                                className="card-img--radius-sm"
                                style={{
                                  height: "40px",
                                  width: "40px",
                                }}
                              />
                            </div>
                            <div className="custom-card--inline-desc">
                              <p className="text-truncate mb-0 song-color pd-11">
                                {data.songName}
                              </p>
                              <p className="text-truncate text-muted font-sm">
                                {data.artistName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            ""
          )}
          {filterRetroClassic && filterRetroClassic.length >= 1 ? (
            <div className="mb-3">
              <div className="d-flex">
                <span className="text-uppercase mr-auto font-weight-bold text-dark color-import">
                  Retro Classic
                </span>
              </div>
              <hr />
              <div className="row">
                {filterRetroClassic &&
                  filterRetroClassic.map((data, index) => {
                    return (
                      <div className="col-xl-2 col-md-4 ">
                        <div className="custom-card mb-3">
                          <NavLink
                            to={
                              data.hitsArtistName &&
                              `/hitsArtistData/${data.hitsArtistName}`
                            }
                          >
                            <img
                              src={data.hitsArtistImage}
                              alt=""
                              className="card-img--radius-md"
                            />
                            <p className="text-truncate mt-2 color-import ">
                              {data.hitsArtistName}
                            </p>
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            ""
          )}

          {filterRadio && filterRadio.length >= 1 ? (
            <div className="mb-3">
              <div className="d-flex">
                <span className="text-uppercase mr-auto font-weight-bold text-dark color-import">
                  Radio
                </span>
              </div>
              <hr />
              <div className="row">
                {filterRadio &&
                  filterRadio.map((data, index) => {
                    return (
                      <div className="col-xl-2 col-md-4 ">
                        <div className="custom-card mb-3">
                          <img
                            src={data.radioImage}
                            alt=""
                            className="card-img--radius-md"
                          />
                          <p className="text-truncate mt-2 color-import ">
                            {data.radioName}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            ""
          )}
          {filterGenres && filterGenres.length >= 1 ? (
            <div className="mb-3">
              <div className="d-flex">
                <span className="text-uppercase mr-auto font-weight-bold text-dark color-import">
                  Radio
                </span>
              </div>
              <hr />
              <div className="row">
                {filterGenres &&
                  filterGenres.map((data, index) => {
                    return (
                      <div className="col-xl-2 col-md-4 ">
                        <div className="custom-card mb-3">
                          <NavLink
                            to={
                              data.genresName &&
                              `/genresData/${data.genresName}`
                            }
                          >
                            <img
                              src={data.genresImage}
                              alt=""
                              className="card-img--radius-md"
                            />
                            <p className="text-truncate mt-2 color-import ">
                              {data.genresName}
                            </p>
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* ) : (
        <div className="section">
          <div className="noresult">
            <span
              className="iconify music-size"
              data-icon="ic:sharp-music-off"
              data-inline="false"
            ></span>
            <div className="not-found">
              {" "}
              No results found for "{this.props.match.params.key}"
            </div>
            <div className="font-set">
              Please check your spelling or try with a different keyword
            </div>
          </div>
        </div>
        )} */}
      </div>
    );
  }
}
const MapStateToProps = (state) => ({
  searchArray: state.home.searchData,
});

export default withRouter(
  connect(MapStateToProps, { getSearchAll, setMusicData })(SearchPage)
);
