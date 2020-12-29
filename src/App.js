import React, { Component } from "react";
import Sidebar from "./Components/WrapperComponents/Sidebar/Sidebar";
import Header from "./Components/WrapperComponents/Header/Header";
import Content from "./Components/WrapperComponents/Content/Content";
import RightSidebar from "./Components/WrapperComponents/RightSidebar/RightSidebar";
import FullPageLoader from "./Components/ReusableComponents/FullPageLoader/FullPageLoader";
import global from "./global";
import { connect } from "react-redux";
import { showLoader } from "./Actions";

class App extends Component {
  myRef = React.createRef();
  state = {
    fullWidth: false,
    scrollTop: 0,
    // isLoading: true,
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
  render() {
    console.log(this.props.isLoader);
    const { fullWidth, scrollTop } = this.state;
    return (
      <>
        <div className="parent" ref={this.myRef} onScroll={this.onScroll}>
          {this.props.isLoader && <FullPageLoader />}
          <div className="left">
            <Sidebar handleWidthChange={this.handleWidthChange} />
          </div>
          <div className={fullWidth ? "right full-width" : "right"}>
            <Header
              fullWidth={fullWidth}
              scrollTop={scrollTop}
              history={this.props.history}
            />
            <Content fullWidth={fullWidth} />
          </div>
          <RightSidebar fullWidth={fullWidth} />
        </div>
      </>
    );
  }
}

const MapStateToProps = (state) => ({
  isLoader: state.auth.isLoading,
});

export default connect(MapStateToProps, { showLoader })(App);
