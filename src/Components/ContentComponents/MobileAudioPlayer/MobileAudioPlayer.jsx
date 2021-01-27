import React, { Component } from "react";
import "MobileAudioPlayer.scss";

export default class MobileAudioPlayer extends Component {
  render() {
    return (
      <div className="mobile-player-main">
        <div className="mobile-player-header">
          <div className="header-layout">
            <div className="layout-item">
              <span>
                <i className="o-icon-close"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
