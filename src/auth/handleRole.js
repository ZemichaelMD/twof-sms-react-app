import { Container } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AdminContainer from "../components/admin/admin-container";
import ClerkContainer from "../components/clerk/clerk-container";
import CompanyAdminContainer from "../components/company-admin/company-admin-container";
import AuthService from "./Auth";
import { refreshToken } from "../api-services/api";




export default function HandleRole() {

  const [role, setRole] = useState("");
  const SetRole = () => {
    AuthService.checkCachedJwtRole() === "admin"
    ? setRole("admin")
    : AuthService.checkCachedJwtRole() === "companyAdmin"
    ? setRole("companyAdmin")
    : AuthService.checkCachedJwtRole() === "clerk"
    ? setRole("clerk")
    : setRole("unknown");
  }

  const history = useHistory();
  useEffect(() => {
    //check the cachedJwt for role
    if (AuthService.getCachedJwt()) {
      if (AuthService.checkCachedJwtStatus() === "OKAY") {
        SetRole();
      } else if (AuthService.checkCachedJwtStatus() === "REFRESH") {
        refreshToken(AuthService.getCachedJwt().accessToken);
        SetRole();
      } else if (AuthService.checkCachedJwtStatus() === "EXPIRED") {
        return (
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "400px",
            }}
          >
            <h1 style={{ textAlign: "center" }}>
              Session is Expired! Please log back in.
            </h1>
            <button
              onClick={() => {
                history.push("/login");
              }}
            >
              {" "}
              Login{" "}
            </button>
          </Container>
        );
      }
    }
    return () => {
      //cleanup
    };
  }, []);

  if (role === "admin") {
    return <AdminContainer />;
  } else if (role === "clerk") {
    return <ClerkContainer />;
  } else if (role === "companyAdmin") {
    return <CompanyAdminContainer />;
  } else if (role === "unknown") {
    return (
      <Container
        style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
      >
        <h1 style={{ textAlign: "center" }}>
          The user does not seem to have a role! Please login with a different
          user!
        </h1>
        <button
          onClick={() => {
            history.push("/login");
          }}
        >
          {" "}
          Login{" "}
        </button>
      </Container>
    );
  } else {
    return  <Container
    style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
  >
    <h1 style={{ textAlign: "center" }}>
     Please Log in!
    </h1>
    <button
      onClick={() => {
        history.push("/login");
      }}
    >
      {" "}
      Login{" "}
    </button>
  </Container>
  }
}
