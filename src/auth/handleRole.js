import { Container } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Redirect } from "react-router";

import AdminContainer from "../components/admin/admin-container";
import ClerkContainer from "../components/clerk/clerk-container";
import AuthService from "./Auth";

export default function HandleRole() {
  const [role, setRole] = useState("");

  //check the cachedJwt for role
  if (AuthService.getCachedJwt() || AuthService.checkCachedJwtStatus() === 'OKAY') {
    AuthService.checkCachedJwtRole() === "admin"
      ? setRole("admin")
      : AuthService.checkCachedJwtRole() === "companyAdmin"
      ? setRole("companyAdmin")
      : AuthService.checkCachedJwtRole() === "clerk"
      ? setRole("clerk")
      : setRole("unknown");

    if (role === "admin") {
      return <AdminContainer />;
    } else if (role === "clerk") {
      return <ClerkContainer />;
    }
  } else {
    return <Redirect to={"/login"} />;
  }
}
