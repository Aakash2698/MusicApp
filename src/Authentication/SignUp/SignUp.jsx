import React, { Component } from "react";
import { Dialog } from "@material-ui/core";
import { registerUser } from "../../Actions";
import { connect } from "react-redux";
class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPasswordValidation: false,
    showSignInValidation: false,
    errors: {},
  };

  handleChange = (event) => {
    this.setState({
      showPasswordValidation: false,
      showSignInValidation: false,
      [event.target.name]: event.target.value,
    });
  };

  onRadioHandler = (e) => {
    this.setState({
      gender: e.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      gender,
      email,
      password,
      confirmPassword,
    } = this.state;

    if (password !== confirmPassword) {
      this.setState({
        showPasswordValidation: true,
      });
    } else {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      this.props.registerUser(userData).then((res) => {
        if (res.response.status === 200) {
          this.props.handleCloseSignUp();
          this.props.handleOpenSignIn();
        } else {
          this.setState({
            showSignInValidation: true,
            errors: res.responseData.Error,
          });
        }
      });
    }
  };
  handleCloseSignUp = () => {
    this.props.handleCloseSignUp();
    this.setState({
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPasswordValidation: false,
      showSignInValidation: false,
    });
  };
  render() {
    const {
      firstName,
      lastName,
      gender,
      email,
      password,
      confirmPassword,
      showPasswordValidation,
      showSignInValidation,
      errors,
    } = this.state;
    return (
      <Dialog open={this.props.openSignUp}>
        <div className="modal-dialog theme-dialog">
          <div className="home-modal-content">
            <div className="modal-header border-bottom-0">
              {showPasswordValidation ? (
                <div class="alert alert-danger" role="alert">
                  Password did not matched.
                </div>
              ) : (
                ""
              )}
              {showSignInValidation ? (
                <div class="alert alert-danger" role="alert">
                  {errors}
                </div>
              ) : (
                ""
              )}

              <button
                className="close"
                type="button"
                onClick={this.handleCloseSignUp}
              >
                x
              </button>
            </div>
            <h6 className="sign-title text-center mb-3 signup-pd pd-both">
              Sign Up For Awesome Listing Experience
            </h6>
            <div className="modal-body">
              <form
                className="mx-4 pb-5 ng-untouched ng-pristine ng-valid"
                onSubmit={this.handleFormSubmit}
                method="post"
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control ng-untouched ng-pristine ng-valid"
                    formcontrolname="firstName"
                    onChange={this.handleChange}
                    name="firstName"
                    value={firstName}
                    id="firstName"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control ng-untouched ng-pristine ng-valid"
                    formcontrolname="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChange}
                    id="lastName"
                    placeholder="Last Name"
                    required
                  />
                </div>

                <div className="form-group form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    name="male"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => this.onRadioHandler(e)}
                    required
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Male
                  </label>
                </div>
                <div className="form-group form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    name="female"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => this.onRadioHandler(e)}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Female
                  </label>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control ng-untouched ng-pristine ng-valid"
                    formcontrolname="userName"
                    onChange={this.handleChange}
                    name="email"
                    value={email}
                    id="userName"
                    placeholder="Email Id"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control ng-untouched ng-pristine ng-valid"
                    formcontrolname="password"
                    onChange={this.handleChange}
                    name="password"
                    value={password}
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control ng-untouched ng-pristine ng-valid"
                    formcontrolname="confirmPassword"
                    onChange={this.handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <button
                  className="btn btn-block btn-bold btn-air btn-info load-page"
                  type="submit"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default connect(null, { registerUser })(SignUp);
