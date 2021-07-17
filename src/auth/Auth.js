import jwt_decode from "jwt-decode";
import { Redirect } from "react-router";

export class AuthService {

  //store Token
  saveAccessTokenAsCachedJwt(response) {
    if (response.data.sign_in.token) {
      this.destroyCachedJwt()
      const expiresIn = jwt_decode(response.data.sign_in.token).exp;
      const expiresAt = new Date(Date.now() + expiresIn);
      const refreshAt = new Date(
        // Upon user's activity, refresh 5 minutes before token actually expires.
        // User inactivity till the access token expires will force re-authentication
        Date.now() + expiresIn - 5 * 60
      );

      const jwt = {
        accessToken: response.data.sign_in.token,
        roleId: response.data.user.role_id,
        roleName: response.data.user.role.role_name,
        fullName: response.data.user.full_name,
        userId: response.data.user.id,
        companyId: response.data.user.company_id,
        refreshToken: response.data.sign_in.refresh_token,
        expiresIn: expiresIn,
        expiresAt,
        refreshAt,
      };
      this.saveCachedJwt(jwt);
      return jwt;
    } else {
      return response;
    }
  }

  //check the status of the token
  checkCachedJwtStatus = () => {
    let cachedJwt = this.getCachedJwt();
    if (cachedJwt) {
      if (cachedJwt.refreshAt > new Date().toISOString()) return "OKAY";
      else if (cachedJwt.expiresAt <= new Date().toISOString())
        return "EXPIRED";
      else return "REFRESH";
    } else return "NOTOKEN";
  }

  checkCachedJwtRole = () => {
    let cachedJwt =  this.getCachedJwt()
    if (cachedJwt) {
      if (cachedJwt.roleId === 1) return "admin";
      else if (cachedJwt.roleId === 2) return "companyAdmin";
      else if (cachedJwt.roleId === 3) return "clerk";
      //if the role is 1 Admin return Admin
      //is the role is
      else return "unknown";
    } else return "unknown";
  }

  getRefreshToken() {
    let refreshToken = JSON.parse(this.getCachedJwt().refreshToken);
    return refreshToken;
  }

  getCachedJwt() {
    let cachedJwt = JSON.parse(sessionStorage.getItem("cachedJwt"));
    return cachedJwt;
  }

  saveCachedJwt(jwt) {
    sessionStorage.setItem("cachedJwt", JSON.stringify(jwt));
  }

  destroyCachedJwt() {
    sessionStorage.removeItem("cachedJwt");
  }

  handleLogOut(){
    this.destroyCachedJwt();
    return <Redirect to='/login'/>
  }
}

export default new AuthService();
