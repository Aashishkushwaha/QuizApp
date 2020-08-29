import React from "react";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import { Grid, makeStyles, Paper, Typography, Button } from "@material-ui/core";

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
  const { message, result } = location.state;

  return (
    <Grid item xs={12} lg={10} className={classes.root}>
      <div>
        <Paper className={classes.paper}>
          <Typography variant="h5">{message}</Typography>
        </Paper>
        <div style={{ padding: "2rem 0", paddingBottom: "5rem" }}>
          <Grid container item xs={12} justify="space-between">
            <Grid item xs={12} sm={5}>
              <Paper className={classes.answerOption}>
                <div>Total Questions : {result.totalQuestions}</div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Paper className={classes.answerOption}>
                <div>Correct Answers : {result.correctAnswers}</div>
              </Paper>
            </Grid>
          </Grid>
          <Grid container item xs={12} justify="space-between">
            <Grid item xs={12} sm={5}>
              <Paper className={classes.answerOption}>
                <div>Wrong Answers : {result.wrongAnswers}</div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Paper className={classes.answerOption}>
                <div>Not Answered : {result.notAnswered}</div>
              </Paper>
            </Grid>
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
