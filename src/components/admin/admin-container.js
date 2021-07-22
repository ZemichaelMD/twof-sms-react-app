import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import {  Box, Card, Button, CardActions } from "@material-ui/core";
import Companies from "./components/companies";
import Dashboard from "./components/dashboard";
import MainNav from "../nav";
import AuthService from "../../auth/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth:'60%',
    margin:'auto',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  nav: {
    width: "100%",
  },

  body: {
    display: "flex",
  },

  aside: {
    display:'fixed',
    width:'15%',
    borderRadius:0,
    backgroundColor:'lightgray'
  },

  content: {
    width:'70rem',
    padding: theme.spacing(3),
  },
  button: {
    margin: '0.5rem',
    padding: '1rem'
  },
  buttons: {
    display:'flex',
    flexDirection:'column',
   height:'100%'
  }

}));

export default function AdminContainer() {
  const [content, setContent] = useState(<Dashboard />)
  const [userName, setUserName] = useState("");
  const classes = useStyles();

  useEffect(() => {
    setUserName(AuthService.getCachedJwt().fullName);
    console.log(userName);
    return () => {
      // cleanup
    };
  }, []);

  return (
    <>
      <MainNav userName={userName} className={classes.nav} />
      <Box className={classes.root}>
        <Box className={classes.body}>
          <Card className={classes.aside}>
            <CardActions className={classes.buttons}>
            <Button onClick={(e) => {
              setContent(<Dashboard />);
            }}
            className={classes.button} variant="contained"
              color="primary"> Dashboard
            </Button>
            <Button onClick={(e) => {
              setContent(<Companies />);
            }} className={classes.button} variant="contained" color="secondary">Companies
            </Button>
            </CardActions>
          </Card>
          <Box className={classes.content}>
            {content}
          </Box>
        </Box>
      </Box>
    </>
  );
}
