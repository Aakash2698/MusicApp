import React, { Component } from "react";
import "./Artists.scss";
import { connect } from "react-redux";
import { featureArtists, showLoader } from "../../../Actions";
import { NavLink } from "react-router-dom";

class Artists extends Component {
  componentDidMount() {
    this.props.showLoader();
    this.featureArtists();
  }
  featureArtists = () => {
    this.props.featureArtists();
  };
  render() {
    console.log(this.props.artistsData);
    return (
      <div>
        <h1 className="genres-heading">Artists</h1>
        <div className="row align-items-end">
          <span className="col-6 font-weight-bold">
            {this.props.artistsData.length + "  Results"}
          </span>
          <div className="col-12">
            <hr />
          </div>
        </div>
        <div className="row section">
          {this.props.artistsData &&
            this.props.artistsData.map((data, index) => {
              return (
                <div className="col-xl-3 col-lg-4 col-sm-6 pb-4">
                  <div className="custom-card">
                    <div className="custom-card--img">
                      <NavLink
                        to={data.artistName && `/artistData/${data.artistName}`}
                      >
                        <img
                          src={data.artistImage}
                          alt="artist-img"
                          className="art-image"
                        />
                      </NavLink>
                      <div className="custom-card--link mt-2">
                        <h6 className="mb-0 artist-font">{data.artistName}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
const MapStateToProps = (state) => ({
  artistsData: state.home.featureArtists,
});

export default connect(MapStateToProps, {
  featureArtists,
  showLoader,
})(Artists);
