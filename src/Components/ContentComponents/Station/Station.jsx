import React, { Component } from "react";
import "./Station.scss";
import { connect } from "react-redux";
import { radioMusic } from "../../../Actions";

class Station extends Component {
  componentDidMount() {
    this.radioMusic();
  }
  radioMusic = () => {
    this.props.radioMusic();
  };
  render() {
    return (
      <div>
        <h1 className="genres-heading">Radio Stations</h1>
        <div className="row align-items-end">
          <span className="col-6 font-weight-bold">
            {this.props.radioData.length + "  Results"}
          </span>
          <div className="col-12">
            <hr />
          </div>
        </div>
        <div className="row">
          {this.props.radioData &&
            this.props.radioData.map((data, index) => {
              return (
                <div className="col-xl-2 col-lg-3 col-sm-4 col-6 pb-4">
                  <div className="custom-card">
                    <div className="custom-card--img">
                      <div>
                        <img
                          src={data.radioImage}
                          alt="artist-img"
                          className="art-image"
                        />
                      </div>
                      <div className="custom-card--link mt-2">
                        <h6 className="mb-0 artist-font">{data.radioName}</h6>
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
  radioData: state.home.radioMusic,
});

export default connect(MapStateToProps, {
  radioMusic,
})(Station);
