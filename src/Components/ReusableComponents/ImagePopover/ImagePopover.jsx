import React, { Component } from "react";

export default class ImagePopover extends Component {
  render() {
    return (
      <div>
        <ul
          className="drop-menu dropdown-menu-right"
          style={{
            position: "absolute",
            willChange: "transform",
            top: "0px",
            left: "0px",
            transform: "translate3d(-140px, 25px, 0px)",
          }}
        >
          <li className="drop-item ">
            <span className="dropdown-link">
              <i className="la la-heart-o popover-icons"></i>
            </span>
          </li>
          <li className="drop-item">
            <span className="dropdown-link">
              <i className="la la-plus popover-icons"></i>
            </span>
          </li>
          <li className="drop-item">
            <span className="dropdown-link">
              <i className="la la-download popover-icons"></i>
            </span>
          </li>
          <li className="drop-item">
            <span className="dropdown-link">
              <i className="la la-share-alt popover-icons"></i>
            </span>
          </li>
        </ul>
      </div>
    );
  }
}
