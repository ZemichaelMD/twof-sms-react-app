import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import MainNav from "../nav";
import AuthService from "../../auth/Auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  aside: {
    height: '100%',
    margin: 'auto',
    backgroundColor: 'gray',
    zIndex: -1,
    width: drawerWidth,
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
