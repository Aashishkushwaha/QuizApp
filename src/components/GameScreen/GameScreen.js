import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5rem",
    margin: "0 auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const GameScreen = ({ props }) => {
  const classes = useStyles();

  return (
    <Grid item lg={6} className={classes.root}>
      <div>This is game Screen</div>
    </Grid>
  );
};

export default GameScreen;
