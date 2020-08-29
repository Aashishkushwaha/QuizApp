import React from "react";
import { makeStyles, Backdrop } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  },
}));

export default function Loader({ open }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={open} onClick={() => {}}>
        <CircularProgress />
      </Backdrop>
    </div>
  );
}
