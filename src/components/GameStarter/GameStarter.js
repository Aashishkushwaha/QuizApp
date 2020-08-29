import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";
import Loader from "../Loader/Loader";
import Dialog from "../Dialog/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "0 auto",
    padding: "8rem 2rem",
  },
  formControl: {
    margin: "1rem",
    width: "90%",
    maxWidth: "450px",
    borderWidth: "20px",
  },
  InputLabel: {
    color: theme.palette.primary.main,
  },
  Select: {
    fontSize: "1.5rem",
  },
  StartButton: {
    background: theme.palette.primary.dark,
    color: theme.palette.white.main,
    margin: "0 auto",
    marginTop: "3.5rem",
    marginLeft: ".8rem",
    padding: ".7rem",
    width: "85%",
    "&:hover": {
      background: theme.palette.primary.main,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  },
}));

const GameStarter = ({ props }) => {
  const classes = useStyles();
  const history = useHistory();

  const [category, setCategory] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState("");
  const [openTotalQuestions, setOpenTotalQuestions] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [openDifficultyLevel, setOpenDifficultyLevel] = useState(false);
  const [gameLoading, setGameLoading] = useState(false);
  const [canStart, setCanStart] = useState(true);
  const [dialogTitle, setDialogTitle] = useState("Oops... Input Error");
  const [dialogContentText, setDialogContentText] = useState(
    "Please provide all details."
  );

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleClose = () => setOpenCategory(false);
  const handleOpenCategory = () => setOpenCategory(true);

  const handleTotalQuestionsChange = (event) =>
    setTotalQuestions(event.target.value);
  const handleTotalQuestionsClose = () => setOpenTotalQuestions(false);
  const handleTotalQuestionsOpen = () => setOpenTotalQuestions(true);

  const handleDifficultyLevelChange = (event) =>
    setDifficultyLevel(event.target.value);
  const handleDifficultyLevelClose = () => setOpenDifficultyLevel(false);
  const handleDifficultyLevelOpen = () => setOpenDifficultyLevel(true);

  const startGameHandler = async (event) => {
    if (!totalQuestions || !category || !difficultyLevel) {
      setCanStart(false);
      setDialogTitle("Oops... Input Error");
      setDialogContentText("Please provide all details.");
    } else {
      setGameLoading(true);
      fetch(
        `https://opentdb.com/api.php?amount=${totalQuestions}&category=21&difficulty=${difficultyLevel.toLowerCase()}&type=multiple`
      )
        .then((res) => res.json())
        .then(async (response) => {
          setGameLoading(false);
          const { results } = response;
          if (results.length < totalQuestions) {
            setCanStart(false);
            setDialogTitle("Oops... Questions Error");
            setDialogContentText(
              `We don't have ${totalQuestions} questions for difficulty level "${difficultyLevel}" in our database. 
            Try to change difficulty level or change total number of questions`
            );
          } else {
            console.log({ response, result: response.results });
            await history.push("/game");
          }
        });
    }
  };

  return (
    <Grid item md={5} sm={8} xs={12} className={classes.root}>
      <Loader open={gameLoading} />
      <Dialog
        open={!canStart}
        setOpen={setCanStart}
        dialogTitle={dialogTitle}
        dialogContentText={dialogContentText}
      />
      <FormControl className={classes.formControl}>
        <InputLabel
          className={classes.InputLabel}
          id="demo-controlled-open-select-label"
        >
          Select Quiz Category
        </InputLabel>
        <Select
          className={classes.Select}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openCategory}
          onClose={handleClose}
          onOpen={handleOpenCategory}
          value={category}
          onChange={handleCategoryChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={21}>Sports</MenuItem>
          <MenuItem value={20}>Entertainment</MenuItem>
          <MenuItem value={30}>Other</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel
          className={classes.InputLabel}
          id="demo-controlled-open-select-label-totalQuestions"
        >
          Select Total Questions
        </InputLabel>
        <Select
          className={classes.Select}
          labelId="demo-controlled-open-select-label-totalQuestions"
          id="demo-controlled-open-select"
          open={openTotalQuestions}
          onClose={handleTotalQuestionsClose}
          onOpen={handleTotalQuestionsOpen}
          value={totalQuestions}
          onChange={handleTotalQuestionsChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel
          className={classes.InputLabel}
          id="demo-controlled-open-select-label-difficulty"
        >
          Select Difficulty Level
        </InputLabel>
        <Select
          className={classes.Select}
          labelId="demo-controlled-open-select-label-difficulty"
          id="demo-controlled-open-select"
          open={openDifficultyLevel}
          onClose={handleDifficultyLevelClose}
          onOpen={handleDifficultyLevelOpen}
          value={difficultyLevel}
          onChange={handleDifficultyLevelChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Easy"}>Easy</MenuItem>
          <MenuItem value={"Medium"}>Medium</MenuItem>
          <MenuItem value={"Hard"}>Hard</MenuItem>
        </Select>
      </FormControl>
      <div>
        <Button
          className={classes.StartButton}
          variant="contained"
          onClick={startGameHandler}
        >
          Start Quiz
        </Button>
      </div>
    </Grid>
  );
};

export default GameStarter;
