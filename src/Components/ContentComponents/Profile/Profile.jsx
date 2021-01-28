import React, { Component } from "react";
import "./Profile.scss";
import { connect } from "react-redux";
import { Dialog } from "@material-ui/core";
import {
  uploadFileToServer,
  updateProfileDetails,
  getUserDetails,
  changePassword,
} from "../../../Actions";
import global from "../../../global";
import Dropzone from "react-dropzone";
import defaultImage from "../../../Assets/default.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Profile extends Component {
  static contextType = global.LoaderContext;
  state = {
    profileId: "",
    openDialogBox: false,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    profileImage: null,
    image: {
      preview: defaultImage,
    },
    currentPassword: "",
    password: "",
    confirmPassword: "",
    loading: false,
    showMessage: null,
    dbImage: null,
  };

  showLoader = () => {
    this.setState({
      loading: true,
    });
  };
  hideLoader = () => {
    // if (this.state.loading !== false) {
    this.setState({
      loading: false,
    });
    // }
  };
  componentDidMount() {
    let id = localStorage.getItem("id");
    this.loginData(id);
  }

  loginData = (id) => {
    this.props.getUserDetails(id);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.userData !== nextProps.userData) {
      this.setState({
        firstName: nextProps.userData.firstName,
        lastName: nextProps.userData.lastName,
        email: nextProps.userData.email,
        gender: nextProps.userData.gender,
        dbImage: nextProps.userData.profileImage,
        profileId: nextProps.userData._id,
        image: {
          preview: nextProps.userData.profileImage,
        },
      });
    }
  }

  handleClickOpen = () => {
    this.setState({
      openDialogBox: true,
    });
  };

  handleClose = () => {
    this.setState({
      loading: false,
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
      loading: false,
    });
  };

  onRadioHandler = (e) => {
    this.setState({
      gender: e.target.value,
    });
  };

  handleChangePassword = (e) => {
    this.showLoader();
    e.preventDefault();
    let { currentPassword, password, confirmPassword, profileId } = this.state;
    let payload = {
      currentPassword: currentPassword,
      password: password,
      confirmPassword: confirmPassword,
    };
    // window.setTimeout(() => {
    this.props.changePassword(profileId, payload).then((res) => {
      this.showToaster(res.response.status, res.responseData.message);
    });
    this.hideLoader();
    // }, 500);
  };

  handleSubmit = (e) => {
    this.showLoader();
    e.preventDefault();
    let {
      firstName,
      lastName,
      gender,
      email,
      profileImage,
      profileId,
    } = this.state;

    let payload = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
    };

    if (profileImage === null) {
      this.setState({
        profileImage: this.state.dbImage,
      });
      const strCopy = this.state.dbImage.split("ds/");
      payload.filename = strCopy[1];
      // window.setTimeout(() => {
      this.props.updateProfileDetails(profileId, payload).then((res) => {
        this.showToaster(res.response.status, res.responseData.message);
      });
      this.hideLoader();
      // }, 2000);
    } else {
      // window.setTimeout(() => {
      const formData = new FormData();
      formData.append("myImage", this.state.profileImage);
      this.props
        .uploadFileToServer(formData)
        .then((res) => {
          payload.filename = res.responseData.data.filename;
          this.props.updateProfileDetails(profileId, payload).then((res) => {
            this.showToaster(res.response.status, res.responseData.message);
          });
        })
        .catch((err) => {
          // console.log(err);
        });
      this.hideLoader();
      // }, 2000);
    }
  };

  showToaster = (status, message) => {
    if (status === 200) {
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      this.handleClose();
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  onDrop = (file) => {
    let selectFile = file[0];
    // const image = Object.assign(selectFile, {
    //   preview: URL.createObjectURL(selectFile),
    // });
    this.setState({
      profileImage: selectFile,
    });
    this.fileToDataUri(selectFile).then((dataUri) => {
      this.setState({
        image: {
          preview: dataUri,
        },
      });
    });
  };

  fileToDataUri = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  render() {
    const {
      openDialogBox,
      firstName,
      lastName,
      gender,
      email,
      loading,
    } = this.state;

    return (
      <div className="row section">
        <div className="col-xl-10 mx-auto">
          <div className="row">
            <div className="col-xl-12 col-md-12">
              <div>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick

                  // type={showMessage === 200 ? succ}
                />
              </div>
              <h1 className="genres-heading">Profile Details</h1>
              <div className="card h-auto" style={{ background: "#343a40" }}>
                <div className="card-body">
                  <form
                    className="row"
                    data-toggle="validator"
                    onSubmit={this.handleSubmit}
                  >
                    <div className="col-12 form-group">
                      <label
                        htmlFor="firstName "
                        className="form-label profile-title"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control bg-main"
                        name="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => this.handleChange(e)}
                        maxLength="255"
                      />
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
                        className="form-control bg-main"
                        name="email"
                        placeholder="Email"
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
                      <div>
                        <div className="image-dropzone">
                          <Dropzone
                            onDrop={(acceptedFiles) =>
                              this.onDrop(acceptedFiles)
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div {...getRootProps({ className: "dropzone" })}>
                                <input
                                  {...getInputProps()}
                                  name="studentImage"
                                />
                                <div className="dropzone-image">
                                  <img
                                    alt="profile"
                                    src={
                                      this.state.image.preview === undefined
                                        ? defaultImage
                                        : this.state.image.preview
                                    }
                                  />
                                </div>
                                {/* <p style={{ color: "#adb5bd" }}>
                                    Drag 'n' drop some files here, or click to
                                    select files
                                  </p> */}
                              </div>
                            )}
                          </Dropzone>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 action-root">
                      <div className="save-change-action">
                        <button
                          type="submit"
                          className="btn btn-primary btn-air"
                          disabled={loading}
                          // className={
                          //   loading
                          //     ? "btn btn-primary btn-air loader-show"
                          //     : "btn btn-primary btn-air"
                          // }
                        >
                          Save Changes
                          {loading && (
                            <i className="fas fa-circle-notch fa-spin custom-loader"></i>
                          )}
                        </button>
                      </div>

                      <div className="profile-second">
                        <button
                          type="button"
                          className="btn btn-primary btn-air"
                          onClick={this.handleClickOpen}
                        >
                          Change Password
                        </button>
                      </div>
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
                        <form
                          className="row"
                          data-toggle="validator"
                          onSubmit={this.handleChangePassword}
                        >
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
                              required
                              id="currentPassword"
                              name="currentPassword"
                              onChange={(e) => this.handleChange(e)}
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
                              required
                              id="password"
                              name="password"
                              onChange={(e) => this.handleChange(e)}
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
                              required
                              type="text"
                              id="confirmPassword"
                              name="confirmPassword"
                              onChange={(e) => this.handleChange(e)}
                            />
                          </div>
                          <div className="action-flex">
                            <div className="col-6">
                              <button
                                type="submit"
                                className={
                                  loading
                                    ? "btn btn-primary btn-air loader-show"
                                    : "btn btn-primary btn-air"
                                }
                                disabled={loading}
                              >
                                Submit
                                {loading && (
                                  <i className="fas fa-circle-notch fa-spin custom-loader"></i>
                                )}
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
  userData: state.auth.loginData,
});

export default connect(MapStateToProps, {
  uploadFileToServer,
  updateProfileDetails,
  getUserDetails,
  changePassword,
})(Profile);
