import React, { Component } from "react";
import "./FullPageLoader.scss";

class FullPageLoader extends Component {
  render() {
    return (
      <div class="loader-container">
        <div class="loader loader-1">
          <div class="loader-inner"></div>
        </div>
      </div>
    );
  }
}

export default FullPageLoader;
