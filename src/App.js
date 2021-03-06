import React, { Component } from "react";
import Sidebar from "./Components/WrapperComponents/Sidebar/Sidebar";
import Header from "./Components/WrapperComponents/Header/Header";
import Content from "./Components/WrapperComponents/Content/Content";
import RightSidebar from "./Components/WrapperComponents/RightSidebar/RightSidebar";
import FullPageLoader from "./Components/ReusableComponents/FullPageLoader/FullPageLoader";
import { connect } from "react-redux";
import { showLoader } from "./Actions";
import MobileAudioPlayer from "./Components/WrapperComponents/MobileAudioPlayer/MobileAudioPlayer";

class App extends Component {
  myRef = React.createRef();
  state = {
    fullWidth: false,
    scrollTop: 0,
    mobileSidebar: false,
    openPlayer: false,
    // isLoading: true,
  };
  openMobileSidebar = () => {
    this.setState({
      mobileSidebar: !this.state.mobileSidebar,
    });
  };

  onScroll = () => {
    const scrollTop = this.myRef.current.scrollTop;
    this.setState({
      scrollTop: scrollTop,
    });
  };

  handleWidthChange = () => {
    const { fullWidth } = this.state;
    this.setState({
      fullWidth: !fullWidth,
    });
  };

  // showLoader = () => {
  //   this.setState({
  //     isLoading: true,
  //   });
  // };

  // hideLoader = () => {
  //   if (this.state.loading !== false) {
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }
  // };
  openMobilePlayer = () => {
    this.setState({
      openPlayer: !this.state.openPlayer,
    });
  };

  render() {
    const {
      fullWidth,
      scrollTop,
      mobileSidebar,
      openMobilePlayer,
    } = this.state;
    return (
      <>
        <div className="parent" ref={this.myRef} onScroll={this.onScroll}>
          <>
            {this.props.isLoader && <FullPageLoader />}
            <div className={mobileSidebar ? " mobile-sidebar left" : "left"}>
              <Sidebar
                handleWidthChange={this.handleWidthChange}
                openMobileSidebar={this.openMobileSidebar}
                mobileSidebar={mobileSidebar}
              />
            </div>
            <div className={fullWidth ? "right full-width" : "right"}>
              <Header
                fullWidth={fullWidth}
                scrollTop={scrollTop}
                history={this.props.history}
                openMobileSidebar={this.openMobileSidebar}
              />
              <Content fullWidth={fullWidth} />
            </div>
            <RightSidebar
              fullWidth={fullWidth}
              openMobilePlayer={this.openMobilePlayer}
              openPlayer={this.state.openPlayer}
            />
          </>
          <MobileAudioPlayer
            openMobilePlayer={this.openMobilePlayer}
            openPlayer={this.state.openPlayer}
          />
        </div>
      </>
    );
  }
}

const MapStateToProps = (state) => ({
  isLoader: state.auth.isLoading,
});

export default connect(MapStateToProps, { showLoader })(App);
