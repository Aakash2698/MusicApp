import React, { Component } from "react";
import "./Profile.scss";
import profile from "../../../Assets/image/profile.jpg";

export default class Profile extends Component {
  render() {
    return (
      <div className="row section">
        <div className="col-xl-10 mx-auto">
          <div className="row">
            <div className="col-xl-4 col-md-5">
              <div className="card h-auto" style={{ background: "#343a40" }}>
                <div className="card-body text-center">
                  <div className="avatar avatar-xl avatar-circle mx-auto mb-4">
                    <img src={profile} alt="user-image" />
                  </div>
                  <h6 className="mb-3" style={{ color: "#adb5bd" }}>
                    Hallo Admin
                  </h6>
                  <button type="button" className="btn btn-danger btn-air">
                    Change Image
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7">
              <div className="card h-auto" style={{ background: "#343a40" }}>
                <div className="card-body">
                  <form action="#" className="row">
                    <div className="col-xl-6 form-group">
                      <label
                        htmlFor="firstName"
                        className="form-label"
                        style={{ color: "#adb5bd" }}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="form-control bg-color"
                        value="Halo"
                      />
                    </div>
                    <div className="col-xl-6 form-group">
                      <label
                        htmlFor="lastName"
                        className="form-label"
                        style={{ color: "#adb5bd" }}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="form-control bg-color"
                        value="admin"
                      />
                    </div>
                    <div className="col-12 form-group">
                      <label
                        htmlFor="dispName"
                        className="form-label"
                        style={{ color: "#adb5bd" }}
                      >
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="dispName"
                        className="form-control bg-color"
                        value="hallo admin"
                      />
                    </div>
                    <div className="col-12 form-group">
                      <label
                        htmlFor="dispName"
                        className="form-label"
                        style={{ color: "#adb5bd" }}
                      >
                        About
                      </label>
                      <textarea
                        className="form-control bg-color"
                        id="about"
                        cols="30"
                        rows="5"
                        name="about"
                        value="hello guys"
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button type="button" className="btn btn-primary btn-air">
                        Save Changes
                      </button>
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
