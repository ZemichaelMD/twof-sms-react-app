import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  aside: {
    height:'100%',
    margin:'auto',
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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <aside className={classes.aside}>
        <Typography>Dashboard</Typography>
        <InboxIcon />
        <Typography>Companies</Typography>
        <MailIcon />
      </aside>
      <main className={classes.content}>
        {/* This is where it is routed */}
        THIS IS THE CLERK
      </main>
    </div>
  );
}
