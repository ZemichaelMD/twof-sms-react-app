import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import CostGraph from "./graphs/cost-graph";
import ProfitGraphMonthly from "./graphs/profit-graph-monthly";
import ProfitGraphAnual from "./graphs/profit-graph-anual";
import CompanyGrowth from "./graphs/company-growth-graph";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    overflow: "hidden",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard() {

  const classes = useStyles();

  return (
    <div  className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <CostGraph />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <ProfitGraphMonthly />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <ProfitGraphAnual />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <CompanyGrowth />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
