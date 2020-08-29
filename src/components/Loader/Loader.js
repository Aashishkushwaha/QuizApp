import React from "react";
import { makeStyles, Dialog } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(5),
  },
  dialog: {
    "& > * > *": {
      padding: theme.spacing(4),
    },
  },
}));

export default function Loader({ open }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <CircularProgress />
      </Dialog>
    </div>
  );
}
