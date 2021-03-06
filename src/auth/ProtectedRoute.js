import React from "react";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import { AuthService } from "./Auth";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const history = useHistory();
  // You can check special cases you need from the token. And then act correspondingly
  // E.g. If user is admin and the "user" part of the app is prevented for admin.
  // Here the data should be read from your token/cookies.
  // Prior to this you should have code to check whether the token is valid or invalid.

  if (AuthService.getCachedJwt()) {
    if (AuthService.getCachedJwt().roleId === 2) {
      history.push("/clerk");
    }
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        // logic for authenticated user to access /app part goes here.
        // e.g. check if user is logged-in logic.
        return AuthService.checkJwtRole() === 'Admin' ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/login"} />
        );
      }}
    />
  );
}
