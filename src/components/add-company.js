import { makeStyles } from "@material-ui/core/styles";

import {
  Box,
  Divider,
  TextField,
  Typography,
  Button,
  CardContent,
  CardActions,
  Card
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    "& > *": {
      marginBottom: '20px'
    },
  },
  title: {
    fontStyle: "bold",
    fontSize: 20,
  },
  TextField: {
    margin: "10px",
  },
  buttons:{
    display:'flex',
  },
  city:{
    display:'flex',
  }
});

export default function AddCompany() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.container}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Add Company
        </Typography>
        <Divider variant="middle" />
        <Typography>Upload an image by clicking here</Typography>

        <form className={classes.form} noValidate autoComplete="off">
          <div>
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
          </div>
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
      <CardActions className={classes.buttons}>
        <Button variant="contained" color="primary">
          Register
        </Button>
        <Button variant="contained">
          Cancle
        </Button>
      </CardActions>
    </Card>
  );
}
