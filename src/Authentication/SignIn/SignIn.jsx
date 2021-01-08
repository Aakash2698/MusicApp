import React, { Component } from "react";
import { Dialog } from "@material-ui/core";
import { loginUser, setUserData } from "../../Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FullPageLoader from "../../Components/ReusableComponents/FullPageLoader";
import Profile from "../../Components/ContentComponents/Profile";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    showLoginValidation: false,
    loading: false,
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
      if (res.responseData.res === 200) {
        this.props.setUserData(res.responseData.userData);
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
  handleCloseSignIn = () => {
    this.props.handleCloseSignIn();
    this.setState({
      showLoginValidation: false,
      loading: false,
      email: "",
      password: "",
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
                onClick={this.handleCloseSignIn}
              >
                x
              </button>
            </div>
            <h6 className="sign-title text-center mb-3 pd-both">
              Sign In For Awesome Listing Experience
            </h6>
            <div className="modal-body">
              <form
                className="mx-4 pb-5 ng-untouched ng-pristine ng-valid"
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

export default connect(mapStateToProps, { loginUser, setUserData })(SignIn);
