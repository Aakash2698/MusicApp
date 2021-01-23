import React, { Component } from "react";
import "./HomePage.scss";
import headerLogo from "../../Assets/Logos/logo.svg";
import musicSvg from "../../Assets/HomePageLogos/Svg/music.svg";
import eventSvg from "../../Assets/HomePageLogos/Svg/event.svg";
import commentSvg from "../../Assets/HomePageLogos/Svg/comment.svg";
import otherSvg from "../../Assets/HomePageLogos/Svg/other.svg";
import { Dialog } from "@material-ui/core";
import one from "../../Assets/image/sliderImage/1.jpg";
import two from "../../Assets/image/sliderImage/2.jpg";
import three from "../../Assets/image/sliderImage/3.jpg";
import four from "../../Assets/image/sliderImage/4.jpg";
import five from "../../Assets/image/sliderImage/5.jpg";
import six from "../../Assets/image/sliderImage/6.jpg";
import HomepageCarousel from "../../Components/ReusableComponents/HomepageCarousel/HomepageCarousel";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import { connect } from "react-redux";
class HomePage extends Component {
  state = {
    trendingArtist: [
      {
        id: 1,
        artist: "Arebica Luna",
        path: one,
      },
      {
        id: 2,
        artist: "Gerrina Linda",
        path: two,
      },
      {
        id: 3,
        artist: "Zunira Willy",
        path: three,
      },
      {
        id: 4,
        artist: "Johnny Marro",
        path: four,
      },
      {
        id: 5,
        artist: "Jina Moore",
        path: five,
      },
      {
        id: 6,
        artist: "Rasomi Pelina",
        path: six,
      },
    ],
    openSignIn: false,
    openSignUp: false,
  };

  handleOpenSignIn = () => {
    this.setState({
      openSignIn: true,
    });
  };

  handleCloseSignIn = () => {
    this.setState({
      openSignIn: false,
    });
  };

  handleOpenSignUp = () => {
    this.setState({
      openSignUp: true,
    });
  };

  handleCloseSignUp = () => {
    this.setState({
      openSignUp: false,
    });
  };

  render() {
    const { trendingArtist, openSignIn, openSignUp } = this.state;
    return (
      <div className="home-wrapper">
        <div style={{ position: "static" }} className="ps-1">
          <div className="ps-content">
            <div className="home-banner landing-banner bg-landing">
              <header id="homepage-header">
                <div className="d-flex container align-items-center py-3">
                  <span className="brand">
                    <img
                      src={headerLogo}
                      alt="Listen-app"
                      className="header-logo"
                    />
                  </span>
                  <ul className="header-auto-options ml-auto d-flex align-items-center">
                    <li>
                      <span className="sign-in" onClick={this.handleOpenSignIn}>
                        Sign in
                      </span>
                    </li>
                    <li>
                      <button
                        className="btn btn-pill btn-air btn-sm btn-danger"
                        type="button"
                        onClick={this.handleOpenSignUp}
                      >
                        Sign up
                      </button>
                    </li>
                  </ul>
                  <SignIn
                    openSignIn={openSignIn}
                    handleCloseSignIn={this.handleCloseSignIn}
                    history={this.props.history}
                  />
                  <SignUp
                    openSignUp={openSignUp}
                    handleCloseSignUp={this.handleCloseSignUp}
                    history={this.props.history}
                    handleOpenSignIn={this.handleOpenSignIn}
                  />
                </div>
              </header>
              <div className="banner-content">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto text-center">
                      <h1 className="common-h">World's best music app</h1>
                      <p className="font-lg">
                        More than 10 millions free music & 15 millions paid
                        music track. Listen now!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="landing-section">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-md-10 mx-auto text-center mb-5">
                    <h3 className="common-h f-size">Features of Listen App</h3>
                    <p className="font-md">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-10 mx-auto">
                    <div className="row">
                      <div className="col-lg-3 col-sm-6 text-center feature">
                        <img src={musicSvg} alt="songs" />
                        <h5 className="mt-3 feature-listen">Songs</h5>
                        <p>
                          Millions of free and paid track available in this app.
                        </p>
                      </div>

                      <div className="col-lg-3 col-sm-6 text-center feature">
                        <img src={commentSvg} alt="songs" />
                        <h5 className="mt-3 feature-listen">Comments</h5>
                        <p>You can share your thought on your favorite.</p>
                      </div>

                      <div className="col-lg-3 col-sm-6 text-center feature">
                        <img src={eventSvg} alt="songs" />
                        <h5 className="mt-3 feature-listen">Events</h5>
                        <p>Create free and paid event in a few minutes</p>
                      </div>

                      <div className="col-lg-3 col-sm-6 text-center feature">
                        <img src={otherSvg} alt="songs" />
                        <h5 className="mt-3 feature-listen">Other</h5>
                        <p>
                          You can also like, dislike, share, add favorite and
                          many more.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="landing-section light-section">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-md-10 mx-auto mb-5 text-center">
                    <h3 className="feature-listen third-header">
                      Upcoming Events
                    </h3>
                    <p className="font-md">
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-12 pb-4">
                    <div className="h-100 event event-h bg-img bg-img-radius-lg back-img">
                      <div className="event-content p-4">
                        <h6 className="image-head">New Year Party</h6>
                        <p className="image-desc">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Beatae consectetur, ex explicabo.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 pb-4">
                    <div className="h-100 event event-h bg-img bg-img-radius-lg back-img2">
                      <div className="event-content p-4">
                        <h6 className="image-head">Dance with DJ Nowan</h6>
                        <p className="image-desc">
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, to...
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-12 pb-4">
                    <div className="h-100 event event-h bg-img bg-img-radius-lg back-img3">
                      <div className="event-content p-4">
                        <h6 className="image-head">Move You's Legs</h6>
                        <p className="image-desc">
                          Li Europan lingues es membres del sam familie. Lor
                          separat existentie es un myth. Por scientie, musi...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="landing-section">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 col-md-10 mx-auto text-center mb-5">
                    <h3 className="third-header ">Trending Artist</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10 mx-auto">
                    <HomepageCarousel trendingArtist={trendingArtist} />
                  </div>
                </div>
              </div>
            </div>
            <footer className="bg-img" id="homepage-footer">
              <div className="footer-content">
                <span className="email color">info@listenapp.com</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  user: state.user,
  success: state.success,
});

export default connect(mapStateToProps)(HomePage);
