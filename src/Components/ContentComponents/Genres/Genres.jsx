import React, { Component } from "react";
import { genres } from "../../../Actions";
import { connect } from "react-redux";
import "./Genres.scss";
import { NavLink } from "react-router-dom";
class Genres extends Component {
  componentDidMount() {
    this.genres();
  }
  genres = () => {
    this.props.genres();
  };
  render() {
    console.log(this.props.genresData);
    return (
      <div>
        <h1 className="genres-heading">Genres</h1>
        <div className="row align-items-end">
          <span className="col-6 font-weight-bold">
            {this.props.genresData.length + "  Results"}
          </span>
          <div className="col-12">
            <hr />
          </div>
        </div>
        <div className="section row-main">
          {this.props.genresData &&
            this.props.genresData.map((data, index) => {
              return (
                <div className="col-xl-3 col-lg-4 col-sm-6 pb-4">
                  <div className="custom-card">
                    <div className="custom-card--img">
                      <NavLink
                        to={data.genresName && `/genresData/${data.genresName}`}
                        className="image-radi"
                      >
                        <img
                          src={data.genresImage}
                          alt=""
                          className="card-img--radius-md"
                        />
                        <span className="bg-blur">{data.genresName}</span>
                      </NavLink>
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
  genresData: state.home.genres,
});

export default connect(MapStateToProps, {
  genres,
})(Genres);
