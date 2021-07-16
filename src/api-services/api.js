import axios from "axios";
import { AuthService } from "../auth/Auth";

const API_URL = "https://138.68.163.236/api/v1";
const LOGIN_URL = API_URL + "/users/login";
const REFRESH_URL = API_URL + "users/refreshToken";
const REGISTER_URL = API_URL + "signup";
const BearerHeader = (token) => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };
    return config
  }

export async function login(username, password) {
  const bodyData = {
    password: password,
    email: username,
  };
  try {
    const response = await axios.post(LOGIN_URL, bodyData)
     // console.log(response)
      return response;
  } catch (error) {
    if (console) {
      console.error(error);
    }
  }
};

export async function refreshToken(token) {
    let jwt = AuthService.getCachedJwt();
    AuthService.removeCachedJwt();
    let newToken;
    axios.post(REFRESH_URL, BearerHeader(token)).then((res) => {
      newToken = res
    })
    jwt = jwt.accessToken = newToken;
    AuthService.saveJwt(jwt)
    return jwt
}

export async function  register(username, email, password) {
    return axios.post(REGISTER_URL, {
      username,
      email,
      password,
    });
}