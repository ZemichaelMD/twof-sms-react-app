import axios from "axios";
import { AuthService } from "../auth/Auth";


const API_URL = "https://138.68.163.236/api/v1";
const LOGIN_URL = API_URL + "/users/login";
const REFRESH_URL = API_URL + "users/refreshToken";
const REGISTER_URL = API_URL + "signup";
const COMPANIES_GET_ALL = API_URL +'/companies'
const BearerHeader = (token) => {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };
  return config
}


//This file is all about api calling functions!

export async function Login(username, password) {

  const bodyData = {
    password: password,
    email: username,
  };
  return await axios.post(LOGIN_URL, bodyData).then((response) => { return response })
}

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

export async function register(username, email, password) {
  return axios.post(REGISTER_URL, {
    username,
    email,
    password,
  });
}

export async function getAllCompanies(token) {
   const data = await axios.get(COMPANIES_GET_ALL, BearerHeader(token));
   return data;
  }