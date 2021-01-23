import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HomePage from "../../Authentication/HomePage";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Route exact path="/home-page" component={HomePage} />
        // <Redirect to="/home-page" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
