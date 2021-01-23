import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../../ContentComponents/Home";
import Artists from "../../ContentComponents/Artists";
import Genres from "../../ContentComponents/Genres";
import Station from "../../ContentComponents/Station";
import Music from "../../ContentComponents/Music";
import "./Content.scss";
import Footer from "../Footer/Footer";
import ArtistDetails from "../../ContentComponents/ArtistDetails";

class Content extends Component {
  render() {
    return (
      <div>
        <div className="banner bg-home"></div>
        <div className="main-container">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/artists" component={Artists} />
            <Route path="/genres" component={Genres} />
            <Route path="/stations" component={Station} />
            <Route path="/music" component={Music} />
            <Route path="/:type/:musics" component={ArtistDetails} />
          </Switch>
        </div>
        <Footer />
        {/* <Audio fullWidth={this.props.fullWidth} /> */}
      </div>
    );
  }
}
export default Content;
