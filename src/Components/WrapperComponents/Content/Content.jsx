import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "../../ContentComponents/Home";
import Artists from "../../ContentComponents/Artists";
import Genres from "../../ContentComponents/Genres";
import Station from "../../ContentComponents/Station";
import Music from "../../ContentComponents/Music";
import "./Content.scss";
import Footer from "../Footer/Footer";
import ArtistDetails from "../../ContentComponents/ArtistDetails";
import Profile from "../../ContentComponents/Profile";
import { connect } from "react-redux";
import SearchPage from "../../ContentComponents/SearchPage";

class Content extends Component {
  render() {
    let banner;
    if (this.props.location.pathname === "/home") {
      banner = "banner bg-home";
    } else if (this.props.location.pathname === "/genres") {
      banner = "banner bg-genres";
    } else if (this.props.location.pathname === "/music") {
      banner = "banner bg-music";
    } else if (this.props.location.pathname === "/artists") {
      banner = "banner bg-artists";
    } else if (this.props.location.pathname === "/stations") {
      banner = "banner bg-stations";
    } else {
      banner = "banner bg-home";
    }
    return (
      <div>
        <div className={banner}></div>
        <div className="main-container">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/artists" component={Artists} />
            <Route path="/genres" component={Genres} />
            <Route path="/stations" component={Station} />
            <Route path="/music" component={Music} />
            <Route path="/:type/:musics" component={ArtistDetails} />
            <Route path="/profile" component={Profile} />
            <Route path="/:key" component={SearchPage} />
          </Switch>
        </div>
        <Footer />
        {/* <Audio fullWidth={this.props.fullWidth} /> */}
      </div>
    );
  }
}
export default withRouter(connect(null)(Content));
