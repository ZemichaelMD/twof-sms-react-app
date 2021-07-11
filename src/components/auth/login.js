import { useState } from "react";
import { makeStyles } from "@material-ui/core"
import {
    Button,
    Card,
    TextField,
    Typography, Divider
} from "@material-ui/core"

import AuthService from "./Auth";

const useStyles = makeStyles({
    root: {
        margin: 'auto',
        width: '400px',
        marginTop: '50px'
    },
    form: {
        "& > *": {
            marginBottom: '20px',
        },
        margin: 'auto',
        width: '400px',
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: '80%'
    }
});

export default function LoginUI() {

    const classes = useStyles();

    //states for username and password
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    //functions to hundle login form
    function handleLogin(e) {
        //send username and password to lgin method
        e.preventDefault();
        console.log(username + ' , ' + password)
        AuthService.login (username, password)
    }

    //functions to hundle logout form
    function handleLogout(e) {
        AuthService.logout ()
    }

    return (
        <Card className={classes.root}>
            <form onSubmit={handleLogin} className={classes.form}>
                <Typography variant='h5'>Login</Typography>
                <Divider className={classes.divider} />
                <TextField onChange={e => setUsername(e.target.value)} required
                    id="standard-username-input"
                    label="User Name" />
                <TextField onChange={e => setPassword(e.target.value)} className={classes.password}
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    required
                />
                <Button type='submit' variant="contained" color="primary">
                    Login
                </Button>
                <Button  onClick = {handleLogout} variant="contained" color="primary">
                    Log Out
                </Button>
                {console.log(AuthService.checkJwtStatus())}
            </form>
        </Card>
    )
}
