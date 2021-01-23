import React, { Component } from "react";
import { Dialog } from "@material-ui/core";
import {
  loginUser,
  setUserData,
  googleLogin,
  getUserDetails,
} from "../../Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FullPageLoader from "../../Components/ReusableComponents/FullPageLoader";
import Profile from "../../Components/ContentComponents/Profile";
import GoogleLogin from "react-google-login";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    showLoginValidation: false,
    loading: false,
    token: "",
  };

  showLoader = () => {
    this.setState({
      loading: true,
    });
  };
  hideLoader = () => {
    if (this.state.loading !== false) {
      this.setState({
        loading: false,
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      loading: false,
      showLoginValidation: false,
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    this.showLoader();
    event.preventDefault();
    window.setTimeout(() => {
      this.loginUser();
    }, 500);
  };

  loginUser = () => {
    const { email, password } = this.state;
    const userData = { email: email, password: password };
    this.props.loginUser(userData).then((res) => {
      console.log(res, "SIMPLE LOGIN");
      if (res.responseData.res === 200) {
        console.log(res);
        this.props.getUserDetails(res.responseData.userData._id);
        this.setInLocalStorage(res.responseData);
        this.props.history.push("/home");
      } else {
        this.setState({
          loading: false,
          showLoginValidation: true,
          errors: res.responseData.Error,
        });
      }
    });
    this.hideLoader();
  };

  setInLocalStorage = (apiData) => {
    let id = apiData.userData._id;
    localStorage.setItem("id", id);
  };
  handleCloseSignIn = () => {
    this.props.handleCloseSignIn();
    this.setState({
      showLoginValidation: false,
      loading: false,
      email: "",
      password: "",
    });
  };

  responseGoogle = (response) => {
    const Token = response.tokenId;
    this.setState({
      token: Token,
    });
    let payload = {
      idToken: Token,
    };
    this.props.googleLogin(payload).then((res) => {
      if (res.response.status === 200) {
        this.setInLocalStorage(res.responseData);
        this.props.getUserDetails(res.responseData.userData._id);
        this.props.setUserData(res.responseData.user);
        this.props.history.push("/home");
      } else {
        this.setState({
          loading: false,
          showLoginValidation: true,
          errors: res.responseData.Error,
        });
      }
    });
  };

  render() {
    const {
      email,
      password,
      showLoginValidation,
      errors,
      loading,
    } = this.state;
    return (
      <Dialog open={this.props.openSignIn} className="signin-page">
        <div className="modal-dialog theme-dialog">
          <div className="home-modal-content">
            <div className="modal-header border-bottom-0">
              {showLoginValidation ? (
                <div class="alert alert-danger" role="alert">
                  {errors}
                </div>
              ) : (
                ""
              )}
              <button
                className="close"
                type="button"
                onClick={() => this.handleCloseSignIn()}
              >
                x
              </button>
            </div>
            <h6 className="sign-title text-center mb-3 pd-both">
              Sign In For Awesome Listing Experience
            </h6>
            <div className="modal-body">
              <form
                className="mx-4 ng-untouched ng-pristine ng-valid"
                style={{ paddingBottom: "1.5rem" }}
                onSubmit={this.handleFormSubmit}
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control ng-untouched ng-pristine ng-valid"
                    formcontrolname="userName"
                    name="email"
                    id="userName"
                    placeholder="Email Id"
                    value={email}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control ng-untouched ng-pristine ng-valid"
                    formcontrolname="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <button
                  className="btn btn-block btn-bold btn-air btn-info load-page"
                  type="submit"
                  disabled={loading}
                >
                  Sign in
                  {loading && (
                    <i className="fas fa-circle-notch fa-spin custom-loader"></i>
                  )}
                </button>
                <div className="gglbtn">
                  <GoogleLogin
                    clientId="342148260884-dfd3n8vics5h243jgmac95lmjj63btpk.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <div className="google-btn">
                        <div className="google-icon-wrapper">
                          <img
                            className="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          />
                        </div>
                        <p
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                          className="btn-text"
                        >
                          <b className="sign-text">Sign in with google</b>
                        </p>
                      </div>
                    )}
                    buttonText="SignIn Via Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
SignIn.propTypes = {
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, {
  loginUser,
  setUserData,
  googleLogin,
  getUserDetails,
})(SignIn);
