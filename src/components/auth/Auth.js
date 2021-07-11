import axios from "axios"
import jwt_decode from "jwt-decode";

const idpConfig = {
  baseUrls: {
    API_URL: 'https://138.68.163.236/api/v1'
  },
  headers: {
    timeout: 150000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*"
    }
  },
  timeout: 2000
};

const API_URL = 'https://138.68.163.236/api/v1'
const LOGIN_URL = API_URL + '/users/login'

class AuthService {

  //login function
  async login(username, password) {
    let cachedJwt = {};

    try {
      cachedJwt = await this.getAccessToken('login', username, password);
      return cachedJwt;
    } catch (ex) {
      if (console) {
        console.error(ex);
      }
      this.redirectToLogin();
    }
  }


  //get and store Token
  async getAccessToken(login, username, password) {

    var response = null
    sessionStorage.removeItem("cachedJwt")

    const bodyData = {
      "password": password,
      "email": username
    };

    if (login) {
      console.log("refreshing");

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
            roleName : response.data.user.role.role_name,
            fullName : response.data.user.full_name,
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

          sessionStorage.setItem('cachedJwt', JSON.stringify(jwt));

          return jwt ;
        });
    };
  }

  //logout function
  logout() {
   // redirect --- window.location = login page;
    sessionStorage.removeItem("cachedJwt")
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
  checkJwtStatus=()=>{
    let cachedJwt = JSON.parse(sessionStorage.getItem("cachedJwt"))
    if(cachedJwt){
      if(cachedJwt.refreshAt>new Date().toISOString())return "okay"
      else if(cachedJwt.expiresAt<=new Date().toISOString())return 'expired'
      else return 'refresh'
    }
    else return 'refresh'
  }

  redirectToLogin(){
//redirect to login on conditions
  }


}

export default new AuthService();