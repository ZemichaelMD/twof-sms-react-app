import axios from "axios"
import jwt_decode from "jwt-decode";

// const idpConfig = {
//   baseUrls: {
//     API_URL: 'https://138.68.163.236/api/v1'
//   },
//   headers: {
//     timeout: 150000,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Accept": "*/*"
//     }
//   },
//   timeout: 2000
// };


// {'header':{
//   authorization : "baerer {token}"
// }}

const API_URL = 'https://138.68.163.236/api/v1';
const LOGIN_URL = API_URL + '/users/login';
const REFRESH_URL = API_URL + 'users/refreshToken';

export class AuthService {

  isAuthenticated = false;

  //login function
  async login(username, password) {
    let cachedJwt = {};

    try {
      cachedJwt = await this.getAccessToken('login', username, password);
      this.isAuthenticated = true;

      return cachedJwt
    } catch (ex) {
      if (console) {
        console.error(ex);
      }
      this.redirectToLogin();
    }
  }

  async refreshToken() {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + this.getRefreshToken()
        }
      };
      let jwt = this.getCachedJwt();
      sessionStorage.removeItem("cachedJwt")

      let newToken;
      axios.post(REFRESH_URL, config).then((res) => {
        newToken = res
      })

      jwt = jwt.accessToken = newToken;

      this.saveJwt(jwt)
      return jwt
    };

  //get and store Token
  async getAccessToken(action, username, password) {

    var response = null
    sessionStorage.removeItem("cachedJwt")

    const bodyData = {
      "password": password,
      "email": username
    };

    if (action === 'login') {
      console.log("logging in...");
      //request a login
      axios
        .post(
          LOGIN_URL, bodyData
        )
        .then((res) => {
          if (
            !res ||
            !res.data ||
            !res.data.sign_in.token ||
            !res.data.sign_in.refreshToken
          ) {
            response = res
          }
          //if there is no token in the response
          else {
            response = { 'message': 'no token received. Login Failed' }
            //redirect to login with a message?
          }

          const expiresIn = jwt_decode(response.data.sign_in.token).exp;

          const expiresAt = new Date(
            Date.now() + expiresIn
          );

          const refreshAt = new Date(
            // Upon user's activity, refresh 5 minutes before token actually expires.
            // User inactivity till the access token expires will force re-authentication
            Date.now() + expiresIn - (5 * 60)
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
            refreshAt
          };

          if (response.data.sign_in.refresh_token) {
            sessionStorage.setItem('refreshToken', response.data.sign_in.refresh_token)
          }

          this.saveJwt(jwt)

          return jwt;
        });
    };
  }


  //logout function
  logout() {
    // redirect --- window.location = login page;
    this.isAuthenticated = false;
    sessionStorage.removeItem("cachedJwt");
    sessionStorage.removeItem("refreshToken")
  }

  //register function
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  //check the status of the token
  checkJwtStatus = () => {
    let cachedJwt = JSON.parse(sessionStorage.getItem("cachedJwt"))
    if (cachedJwt) {
      if (cachedJwt.refreshAt > new Date().toISOString()) return "OKAY"
      else if (cachedJwt.expiresAt <= new Date().toISOString()) return 'EXPIRED'
      else return 'REFRESH'
    }
    else return 'NOTOKEN'
  }

  checkJwtRole = () => {
    let cachedJwt = JSON.parse(sessionStorage.getItem("cachedJwt"))
    if (cachedJwt) {
      if (cachedJwt.roleId === 1) return 'admin';
      else if (cachedJwt.roleId === 2) return 'companyAdmin';
      else if (cachedJwt.roleId === 3) return 'clerk';
      //if the role is 1 Admin return Admin
      //is the role is
      else return 'unknown'
    }
    else return 'unknown'
  }

  redirectToLogin() {
    //redirect to login on conditions
  }

  getRefreshToken() {
    let refreshToken = JSON.parse(sessionStorage.getItem("refreshToken"))
    return refreshToken
  };

  getCachedJwt() {
    let cachedJwt = JSON.parse(sessionStorage.getItem("cachedJwt"))
    return cachedJwt
  }

  saveJwt(jwt) {
    sessionStorage.setItem('cachedJwt', JSON.stringify(jwt));
  }
}

export default new AuthService();