import React, { Component } from "react";

export default class ActionPopover extends Component {
  render() {
    const { dropdownExpand, transform } = this.props;
    return (
      <div>
        <ul
          className={dropdownExpand ? "dropdown-menu show" : "dropdown-menu"}
          x-placement="left-start"
          style={{
            top: "0px",
            position: "absolute",
            willChange: "transform",
            left: "0px",
            transform: transform,
          }}
        >
          <li className="dropdown-item">
            <i className="la la-heart-o dropdown-icon"></i>
            <span>Favorite</span>
          </li>
          <li className="dropdown-item">
            <i className="la la-plus dropdown-icon"></i>
            <span>Add to Playlist</span>
          </li>
          <li className="dropdown-item">
            <i className="la la-download dropdown-icon"></i>
            <span>Download</span>
          </li>
          <li className="dropdown-item">
            <i className="la la-share-alt dropdown-icon"></i>
            <span>Share</span>
          </li>
          <li className="dropdown-item">
            <i className="la la-info-circle dropdown-icon"></i>
            <span>Song info</span>
          </li>
        </ul>
      </div>
    );
  }
}
