import React from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import {
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
  useTheme,
} from "@material-ui/core";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

charts(FusionCharts);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    margin: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  answerOption: {
    minHeight: "25px",
    textAlign: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    "&:hover": {
      cursor: "pointer",
    },
  },
  headerWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    justifyContent: "space-around",
  },
  Button: {
    width: "90%",
    fontWeight: 800,
    padding: "10px",
    fontSize: "1rem",
    maxWidth: "350px",
    borderRadius: "50px",
  },
}));

const ResultScreen = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const { message, results } = location.state;

  const dataSource = {
    chart: {
      caption: "Quiz Results",
      subcaption: "Performance Summary",
      showvalues: "1",
      showpercentintooltip: "0",
      numbersuffix: "%",
      enablemultislicing: "1",
      paletteColors: ["#4caf50", "#ff6347", "#c1c1c1"],
      theme: "fusion",
    },
    data: [
      {
        label: "Correct Answered",
        value: (results.correctAnswered / results.totalQuestions) * 100,
      },
      {
        label: "Wrong Answered",
        value: (results.wrongAnswered / results.totalQuestions) * 100,
      },
      {
        label: "Not Answered",
        value: (results.notAnswered / results.totalQuestions) * 100,
      },
    ],
  };

  return (
    <Grid item xs={12} lg={10} className={classes.root}>
      <div>
        <Paper className={classes.paper}>
          <Typography variant="h5">{message}</Typography>
        </Paper>
        <div style={{ padding: "2rem 0" }}>
          <Grid container item xs={12} justify="center">
            <ReactFusioncharts
              type="pie3d"
              width="85%"
              height="90%"
              dataFormat="JSON"
              dataSource={dataSource}
            />
          </Grid>
        </div>
        <div>
          <Grid item container sm={12} justify="center">
            <Button
              className={classes.Button}
              color="secondary"
              variant="contained"
              onClick={() => history.push("/")}
            >
              Home
            </Button>
          </Grid>
        </div>
      </div>
    </Grid>
  );
};

export default withRouter(ResultScreen);
