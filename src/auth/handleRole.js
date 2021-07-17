import { Container } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useHistory  } from "react-router-dom";

import AdminContainer from "../components/admin/admin-container";
import ClerkContainer from "../components/clerk/clerk-container";
import CompanyAdminContainer from "../components/company-admin/company-admin-container";
import AuthService from "./Auth";

export default function HandleRole() {
  const history = useHistory()
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
    return <Container style={{ display: 'flex', flexDirection: 'column', maxWidth: "400px"}}><h1 style={{ textAlign: "center" }}>
      No Role or Not logged in!
    </h1>
      <button onClick = {() =>{history.push('/login')}}> Login </button>
    </Container>
  }

}
