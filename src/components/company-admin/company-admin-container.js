import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";

import MainNav from "../nav";
import AuthService from "../../auth/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClerkContainer() {
  const [userName, setUserName] = useState("");
  const classes = useStyles();

  useEffect(() => {
    setUserName(AuthService.getCachedJwt().fullName);
    console.log (userName);
    return () => {
      // cleanup
    };
  }, []);
  return (
    <>
    <MainNav userName={userName}/>
    <div className={classes.root}>
      <main className={classes.content}>
        {/* This is where it is routed */}
        <h1 style={{ margin: "100px", textAlign: "center" }}>
          This is the <br />
          Company Admin
        </h1>
      </main>
    </div>
    </>
  );
}
