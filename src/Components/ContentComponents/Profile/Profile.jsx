import React, { Component } from "react";
import "./Profile.scss";
import profile from "../../../Assets/image/profile.jpg";
import { connect } from "react-redux";
import DropzoneComponent from "react-dropzone-component";
// import { setUserData } from "../../../Actions";
import { Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dropzone from "../../ReusableComponents/Dropzone/Dropzone";

class Profile extends Component {
  state = {
    openDialogBox: false,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    backgroundImage: "",
  };

  handleClickOpen = () => {
    this.setState({
      openDialogBox: true,
    });
  };

  handleClose = () => {
    this.setState({
      openDialogBox: false,
    });
  };
  handleFileUpload = (file, id) => {
    this.setState({
      [id]: file,
      isDisabled: false,
    });
  };
  handleRemoveFile = (id) => {
    this.setState({
      [id]: "",
    });
  };
  handleChange = (e) => {
    var element = e.target.name;
    let inputVal = e.target.value;
    this.setState({
      [element]: inputVal,
    });
  };
  onRadioHandler = (e) => {
    this.setState({
      gender: e.target.value,
    });
  };

  render() {
    const {
      openDialogBox,
      backgroundImage,
      firstName,
      lastName,
      gender,
      email,
    } = this.state;
    return (
      <div className="row section">
        <div className="col-xl-10 mx-auto">
          <div className="row">
            <div className="col-xl-12 col-md-12">
              <h1 className="genres-heading">Profile Details</h1>
              <div className="card h-auto" style={{ background: "#343a40" }}>
                <div className="card-body">
                  <form action="#" className="row">
                    <div className="col-8 form-group">
                      <label
                        htmlFor="firstName"
                        className="form-label profile-title"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control bg-main"
                        style={{ width: "76%" }}
                        name="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => this.handleChange(e)}
                        maxLength="255"
                      />
                      {/* <label
                        htmlFor="Name"
                        className="form-label"
                        style={{ color: "#adb5bd", paddingLeft: "5px" }}
                      >
                        {this.props.profileData.firstName}
                      </label> */}
                    </div>
                    <div className="col-4 right-button">
                      <button
                        type="button"
                        className="btn btn-primary btn-air"
                        onClick={this.handleClickOpen}
                      >
                        Change Password
                      </button>
                    </div>
                    <div className="col-12 form-group">
                      <label
                        htmlFor="lastName"
                        className="form-label profile-title"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control bg-main"
                        style={{ width: "50%" }}
                        name="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => this.handleChange(e)}
                        maxLength="255"
                      />
                      {/* <label
                        htmlFor="lastName"
                        className="form-label"
                        style={{ color: "#adb5bd", paddingLeft: "5px" }}
                      >
                        {this.props.profileData.lastName}
                      </label> */}
                    </div>
                    <div className="col-12 form-group">
                      <label
                        htmlFor="gender"
                        className="form-label profile-title"
                      >
                        Gender
                      </label>
                      <div className="radio-group">
                        <div className="radio-commom">
                          <input
                            id="male"
                            style={{ margin: "0 8px 0 0" }}
                            type="radio"
                            name="male"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={(e) => this.onRadioHandler(e)}
                          />
                          <label htmlFor="male">Male</label>
                        </div>
                        <div className="radio-commom">
                          <input
                            id="male"
                            style={{ margin: "0 8px 0 0" }}
                            type="radio"
                            name="female"
                            value="Female"
                            checked={gender === "Female"}
                            onChange={(e) => this.onRadioHandler(e)}
                          />
                          <label htmlFor="male">Female</label>
                        </div>
                        <div className="radio-commom">
                          <input
                            style={{ margin: "0 8px 0 0" }}
                            id="other"
                            type="radio"
                            name="other"
                            value="Other"
                            checked={gender === "Other"}
                            onChange={(e) => this.onRadioHandler(e)}
                          />
                          <label htmlFor="male">Other</label>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-12 form-group">
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
                    </div> */}
                    <div className="col-12 form-group">
                      <label
                        htmlFor="lastName"
                        className="form-label profile-title"
                      >
                        Email :
                      </label>
                      <input
                        type="text"
                        style={{ width: "50%" }}
                        className="form-control bg-main"
                        name="email"
                        placeholder="First Name"
                        value={email}
                        onChange={(e) => this.handleChange(e)}
                        maxLength="255"
                      />
                      {/* <label
                        htmlFor="lastName"
                        className="form-label"
                        style={{ color: "#adb5bd", paddingLeft: "5px" }}
                      >
                        {this.props.profileData.email}
                      </label> */}
                    </div>
                    <div className="col-12 form-group">
                      <label className="form-label profile-title">
                        Profile Pic
                      </label>
                      <div style={{ width: "50%" }}>
                        <Dropzone
                          onRef={(ref) => (this.backgroundImage = ref)}
                          id="backgroundImage"
                          addFile={this.handleFileUpload}
                          imageUrl={backgroundImage}
                          removeFile={this.handleRemoveFile}
                          isEdit={true}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button type="button" className="btn btn-primary btn-air">
                        Save Changes
                      </button>
                    </div>
                  </form>

                  <Dialog
                    open={openDialogBox}
                    onClose={this.handleClose}
                    id="simple-dialog-title"
                  >
                    <div className="modal-content">
                      <div
                        className="dialog-header"
                        style={{ padding: "1rem 2rem" }}
                      >
                        <div>
                          <h5 className="modal-title mb-1">Change Password</h5>
                        </div>
                      </div>
                      <div className="modal-body" style={{ padding: "2rem" }}>
                        <form action="#" className="row">
                          <div className="col-12 pd-bottom">
                            <label
                              htmlFor="current-pwd"
                              className="form-label profile-title"
                            >
                              Current Password
                            </label>
                            <input
                              className="form-control bg-main"
                              type="text"
                              id="firstName"
                              name="firstName"
                            />
                          </div>
                          <div className="col-12 pd-bottom">
                            <label
                              htmlFor="current-pwd"
                              className="form-label profile-title"
                            >
                              New Password
                            </label>
                            <input
                              className="form-control bg-main"
                              type="text"
                              id="firstName"
                              name="firstName"
                            />
                          </div>
                          <div className="col-12 pd-bottom">
                            <label
                              htmlFor="current-pwd"
                              className="form-label profile-title"
                            >
                              Confirm New Password
                            </label>
                            <input
                              className="form-control bg-main"
                              type="text"
                              id="firstName"
                              name="firstName"
                            />
                          </div>
                          <div className="action-flex">
                            <div className="col-6">
                              <button
                                type="button"
                                className="btn btn-primary btn-air"
                              >
                                Submit
                              </button>
                            </div>
                            <div className="col-6">
                              <button
                                type="button"
                                className="btn btn-primary btn-air"
                                onClick={this.handleClose}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog>
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
