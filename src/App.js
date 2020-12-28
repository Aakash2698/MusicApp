import React, { Component } from "react";
import Sidebar from "./Components/WrapperComponents/Sidebar/Sidebar";
import Header from "./Components/WrapperComponents/Header/Header";
import Content from "./Components/WrapperComponents/Content/Content";
import RightSidebar from "./Components/WrapperComponents/RightSidebar/RightSidebar";

class App extends Component {
  myRef = React.createRef();
  state = {
    fullWidth: false,
    scrollTop: 0,
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

  render() {
    const { fullWidth, scrollTop } = this.state;
    return (
      <>
        <div className="parent" ref={this.myRef} onScroll={this.onScroll}>
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

export default App;
