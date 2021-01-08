import React, { Component } from "react";
import "./Profile.scss";
import profile from "../../../Assets/image/profile.jpg";
import { connect } from "react-redux";
// import { setUserData } from "../../../Actions";

class Profile extends Component {
  render() {
    return (
      <div className="row section">
        <div className="col-xl-10 mx-auto">
          <div className="row">
            <div className="col-xl-12 col-md-12">
              <div className="card h-auto" style={{ background: "#343a40" }}>
                <div className="card-body">
                  <form action="#" className="row">
                    <div className="col-12 form-group">
                      <label
                        htmlFor="firstName"
                        className="form-label profile-title"
                      >
                        First Name :
                      </label>
                      <label
                        htmlFor="Name"
                        className="form-label"
                        style={{ color: "#adb5bd", paddingLeft: "5px" }}
                      >
                        {this.props.profileData.firstName}
                      </label>
                    </div>
                    <div className="col-12 form-group">
                      <label
                        htmlFor="lastName"
                        className="form-label profile-title"
                      >
                        Last Name :
                      </label>
                      <label
                        htmlFor="lastName"
                        className="form-label"
                        style={{ color: "#adb5bd", paddingLeft: "5px" }}
                      >
                        {this.props.profileData.lastName}
                      </label>
                    </div>
                    <div className="col-12 form-group">
                      <label
                        htmlFor="dispName"
                        className="form-label profile-title"
                      >
                        Display Name :
                      </label>
                      <label
                        htmlFor="dispName"
                        className="form-label"
                        style={{ color: "#adb5bd", paddingLeft: "5px" }}
                      >
                        {this.props.profileData.firstName +
                          " " +
                          this.props.profileData.lastName}
                      </label>
                    </div>
                    <div className="col-12 form-group">
                      <label
                        htmlFor="lastName"
                        className="form-label profile-title"
                      >
                        Gender :
                      </label>
                      <label
                        htmlFor="lastName"
                        className="form-label"
                        style={{ color: "#adb5bd", paddingLeft: "5px" }}
                      >
                        {this.props.profileData.gender}
                      </label>
                    </div>
                    <div className="col-12 form-group">
                      <label
                        htmlFor="lastName"
                        className="form-label profile-title"
                      >
                        Email :
                      </label>
                      <label
                        htmlFor="lastName"
                        className="form-label"
                        style={{ color: "#adb5bd", paddingLeft: "5px" }}
                      >
                        {this.props.profileData.email}
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const MapStateToProps = (state) => ({
  profileData: state.auth.userData,
});

export default connect(MapStateToProps)(Profile);
