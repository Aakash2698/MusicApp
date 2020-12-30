import React, { Component } from "react";
import Audio from "../Audio/Audio";
import "./RightSidebar.scss";
import one from "../../../Assets/image/sliderImage/1.jpg";
import two from "../../../Assets/image/sliderImage/2.jpg";
import three from "../../../Assets/image/sliderImage/3.jpg";
import four from "../../../Assets/image/sliderImage/4.jpg";
import five from "../../../Assets/image/sliderImage/5.jpg";
import six from "../../../Assets/image/sliderImage/6.jpg";
import ActionPopover from "../../ReusableComponents/ActionPopover/ActionPopover";
import { connect } from "react-redux";
class RightSidebar extends Component {
  state = {
    openRightSidebar: false,
    rightSideAction: false,
    positionIndex: 0,
    topCharts: [
      {
        id: 1,
        songName: "I Love You Mummy",
        artist: "Arebica Luna",
        songImage: one,
      },
      {
        id: 2,
        songName: "Shack your butty",
        artist: "Gerrina Linda",
        songImage: two,
      },
      {
        id: 3,
        songName: "Do it your way(Female)",
        artist: "Zunira Willy & Nutty Nina",
        songImage: three,
      },
      {
        id: 4,
        songName: "Say yes",
        artist: "Johnny Marro",
        songImage: four,
      },
      {
        id: 5,
        songName: "Where is your letter",
        artist: "Jina Moore & Lenisa Gory",
        songImage: five,
      },
      {
        id: 6,
        songName: "Hey not me",
        artist: "Rasomi Pelina",
        songImage: six,
      },
    ],
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.currentPlay !== nextProps.currentPlay) {
    }
  }

  handleDropdownChange = (index) => {
    this.setState({
      rightSideAction: !this.state.rightSideAction,
      positionIndex: index,
    });
  };

  handleOpenSidebar = (e) => {
    e.preventDefault();
    const { openRightSidebar } = this.state;
    this.setState({
      openRightSidebar: !openRightSidebar,
    });
  };

  render() {
    const {
      openRightSidebar,
      topCharts,
      rightSideAction,
      positionIndex,
    } = this.state;
    let transform;

    if (positionIndex === 0) {
      transform = "translate3d(137px, 18px, 0px)";
    } else if (positionIndex === 1) {
      transform = "translate3d(137px, 83px, 0px)";
    } else if (positionIndex === 2) {
      transform = "translate3d(137px, 148px, 0px)";
    } else if (positionIndex === 3) {
      transform = "translate3d(137px, 213px, 0px)";
    } else if (positionIndex === 4) {
      transform = "translate3d(137px, 213px, 0px)";
    }
    return (
      <div
        className={
          !openRightSidebar ? "minimize-sidebar right-sidebar" : "right-sidebar"
        }
      >
        <div className="right-sidebar-header">Listen Special</div>
        <div
          className="right-sidebar-body ps ps--active-y"
          data-scrollable="true"
        >
          <ul
            className="list-group list-group-flush"
            style={{ flexDirection: "column" }}
          >
            {topCharts &&
              topCharts.map((data, index) => {
                return (
                  <li
                    className="custom-list--item list-group-item d-flex"
                    key={index}
                  >
                    <div className="text-dark custom-card--inline amplitude-song-container amplitude-play-pause amplitude-paused">
                      <div className="custom-card--inline-img">
                        <img
                          src={data.songImage}
                          alt="song-image"
                          className="card-img--radius-sm"
                          style={{ height: "40px", width: "40px" }}
                        />
                      </div>
                      <div className="custom-card--inline-desc">
                        <p className="text-truncate mb-0">{data.songName}</p>
                        <p className="text-truncate text-muted font-sm">
                          {data.artist}
                        </p>
                      </div>
                    </div>
                    <ul className="custom-card--labels d-flex ml-auto">
                      <li className="dropleft">
                        <button
                          className="btn btn-icon-only"
                          onClick={(e) => this.handleDropdownChange(index)}
                        >
                          <span
                            className="iconify three-dot-action"
                            data-icon="fe-elipsis-h"
                            data-inline="false"
                          ></span>
                        </button>
                      </li>
                    </ul>
                  </li>
                );
              })}
            <ActionPopover
              dropdownExpand={rightSideAction}
              transform={transform}
            />
          </ul>
        </div>
        <Audio
          handleOpenSidebar={this.handleOpenSidebar}
          fullWidth={this.props.fullWidth}
        />
      </div>
    );
  }
}
const MapStateToProps = (state) => ({
  currentPlay: state.home.playSong,
});
export default connect(MapStateToProps)(RightSidebar);
