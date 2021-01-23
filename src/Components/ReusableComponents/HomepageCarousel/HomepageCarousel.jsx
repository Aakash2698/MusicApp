import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./HomepageCarousel.scss";

export default class HomepageCarousel extends Component {
  state = {
    trendingResponsive: {
      0: {
        items: 1,
      },
      639: {
        items: 2,
      },
      1199: {
        items: 3,
      },
      1439: {
        items: 5,
      },
    },
  };
  render() {
    const imagePath = this.props.trendingArtist;
    return (
      <div className="container-fluid pd-0">
        <OwlCarousel
          items={5}
          autoplay={true}
          responsiveClass={true}
          responsive={this.state.trendingResponsive}
          dots={false}
        >
          {imagePath &&
            imagePath.map((data, index) => {
              return (
                <div>
                  <img
                    src={data.songImage}
                    alt="avatar"
                    className="avatar avatar-xl avatar-circle mx-auto width-initial"
                    key={index}
                  />
                  <h6 className="mb-0 mt-2 home-song-name">{data.artist}</h6>
                </div>
              );
            })}
        </OwlCarousel>
      </div>
    );
  }
}
