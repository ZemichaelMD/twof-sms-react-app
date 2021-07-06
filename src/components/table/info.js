import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    backgroundColor:"lightBlue",
    marginBottom :   "35px"
  },
  title: {
    fontStyle:"bold",
    fontSize: 20,
  },
  subtitle: {
    fontSize: 14,
  },
});

export default function InfoBox() {
  const classes = useStyles();

  return (
    <Box className={classes.root} variant="outlined">
      <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Title
        </Typography>
        <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
        This is a very long subtite
        </Typography>
      </CardContent>
    </Box>
  )
}