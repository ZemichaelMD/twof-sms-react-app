import { Container } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router";

import AdminContainer from "../components/admin/admin-container";
import ClerkContainer from "../components/clerk/clerk-container";
import CompanyAdminContainer from "../components/company-admin/company-admin-container";
import AuthService from "./Auth";

export default function HandleRole() {
  const [role, setRole] = useState("");

  useEffect(() => {
    //check the cachedJwt for role
    if (AuthService.getCachedJwt() || AuthService.checkCachedJwtStatus() === 'OKAY') {
      AuthService.checkCachedJwtRole() === "admin"
        ? setRole("admin")
        : AuthService.checkCachedJwtRole() === "companyAdmin"
          ? setRole("companyAdmin")
          : AuthService.checkCachedJwtRole() === "clerk"
            ? setRole("clerk")
            : setRole("unknown");
    }
    return () => {
      //cleanup
    }
  }, [])

  if (role === "admin") {
    return <AdminContainer />;
  } else if (role === "clerk") {
    return <ClerkContainer />;
  }
   else if (role === "companyAdmin") {
    return <CompanyAdminContainer />;
  }
  else {
    return <Container><h1 style={{ margin: "100px", textAlign: "center" }}>
      No Role or <br />
      You are not logged in!
    </h1>
      <button>Login</button>
    </Container>
  }

}
