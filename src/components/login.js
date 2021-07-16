import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import AuthService from "../auth/Auth";
import { login } from "../api-services/api";
import HandleRole from "../auth/handleRole";
import {
  Button,
  Card,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    width: "400px",
    marginTop: "50px",
  },
  form: {
    "& > *": {
      marginBottom: "20px",
    },
    margin: "auto",
    width: "400px",
    marginTop: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: "80%",
  },
});

export default function LoginUI(props) {
  const classes = useStyles();

  //states for username and password
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  //functions to handle login form
  async function handleLogin(e) {
    //send username and password to login method
    e.preventDefault();
    try {
      let responseData = await login(username, password);
      console.log(responseData.data);
      if (responseData.data.sign_in.token) {
        AuthService.saveAccessTokenAsCachedJwt(responseData);
        console.log("successfully logged in!");
        props.history.push("/");
      }
      //redirect to somewhere to check role and render

    } catch (error) {
      console.log(error);
      return null;
    }
  }

  //functions to hundle logout form
  function handleLogout(e) {
    AuthService.destroyCachedJwt();
    props.history.push("/login");
  }

  return (
    <Card className={classes.root}>
      <form onSubmit={handleLogin} className={classes.form}>
        <Typography variant="h5">Login</Typography>
        <Divider className={classes.divider} />
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          required
          id="standard-username-input"
          label="User Name"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          className={classes.password}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button onClick={handleLogout} variant="contained" color="primary">
          Log Out
        </Button>

        <Button
          onClick={() => {
            console.log(AuthService.checkCachedJwtStatus());
          }}
          variant="contained"
          color="primary"
        >
          Check JWT
        </Button>
      </form>
    </Card>
  );
}
