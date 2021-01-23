import React, { Component } from "react";
import "./Footer.scss";

export default class Footer extends Component {
  render() {
    return (
      <footer id="footer" className="bg-img">
        <div className="footer-content">
          <a href="" className="email">
            info@listenapp.com
          </a>
        </div>
      </footer>
    );
  }
}
