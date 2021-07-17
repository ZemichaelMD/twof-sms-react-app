import { makeStyles } from "@material-ui/core/styles";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import {
  Box,
  Divider,
  TextField,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card,
  Avatar
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {},
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      marginBottom: "20px",
    },
  },
  title: {
    fontStyle: "bold",
    fontSize: "20",
  },
  TextField: {
    margin: "10px",
    minWidth: "80%",
  },
  buttons: {
    display: "flex",
    alignSelf:'right'
  },
  city: {
    display: "inline-block",
  },
  divider: {
    minWidth: "80%",
  },
});

export default function AddCompany() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.container}>
        <Typography
          className={classes.title}
          variant="h5"
          color="textSecondary"
          gutterBottom
        >
          Add Company
        </Typography>
        <Divider className={classes.divider} />
        <Avatar>
          <CameraAltIcon />
        </Avatar>
        <Typography>Upload an image by clicking here</Typography>

        <form className={classes.form} noValidate autoComplete="off">
          <Box>
            <TextField
              className={classes.TextField}
              label="Company Name"
              variant="outlined"
            />{" "}
            <br />
            <TextField
              className={classes.TextField}
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
            />
            <br />
          </Box>
          <Box className={classes.city}>
            <TextField
              className={classes.TextField}
              label="City"
              variant="outlined"
            />
            <TextField
              className={classes.TextField}
              label="Subcity"
              variant="outlined"
            />
          </Box>
        </form>
      </CardContent>
      <Divider className={classes.divider} />
      <CardActions className={classes.buttons}>
        <Button onclick={()=>{
          //set the state of the content to something
        }} className={classes.button} variant="contained" color="primary">
          Register
        </Button>
        <Button className={classes.button} variant="contained" color="default">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
