import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
  useTheme,
} from "@material-ui/core";
import { withSnackbar } from "notistack";

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
}));

const GameScreen = ({ enqueueSnackbar }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const { questions } = location.state;
  const { difficulty } = questions[0];
  const initialTime =
    difficulty === "hard" ? 30 : difficulty === "medium" ? 45 : 60;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState([]);
  const totalQuestions = questions.length;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [correctOption, setCorrectOption] = useState(2);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [results, setResults] = useState({
    correctAnswered: 0,
    notAnswered: 0,
    wrongAnswered: 0,
    totalQuestions,
  });
  let timerInstance = "";

  useEffect(() => {
    timerInstance = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft <= 0) {
      enqueueSnackbar("You've not answered this question.", {
        variant: "error",
      });
      setResults((results) => {
        return { ...results, notAnswered: results.notAnswered + 1 };
      });
      clearInterval(timerInstance);
      setIsConfirmed(true);
    }

    return () => {
      clearInterval(timerInstance);
    };
  }, [timeLeft]);

  useEffect(() => {
    let options = [
      ...questions[currentQuestion].incorrect_answers,
      questions[currentQuestion].correct_answer,
    ];
    let shuffledOptions = shuffleOptions(options);
    let correctAnswerIndex = shuffledOptions.findIndex(
      (item) => item === questions[currentQuestion].correct_answer
    );
    setCorrectOption(correctAnswerIndex);
    setOptions([...shuffledOptions]);
  }, [currentQuestion, questions]);

  const shuffleOptions = (options) => {
    let copiedOptions = [...options];
    copiedOptions.sort(() => Math.random() - 0.5);
    return copiedOptions;
  };

  const nextQuestionHandler = () => {
    setCurrentQuestion((question) => question + 1);
    setTimeLeft(initialTime);
    setSelectedOption(-1);
    setIsConfirmed(false);
  };

  const optionClickHandler = (index) => {
    setSelectedOption(index);
  };

  const submitClickHandler = () => {
    if (selectedOption === correctOption)
      setResults((results) => {
        return { ...results, correctAnswered: results.correctAnswered + 1 };
      });
    else
      setResults((results) => {
        return { ...results, wrongAnswered: results.wrongAnswered + 1 };
      });
    clearInterval(timerInstance);
    setIsConfirmed(true);
  };

  return (
    <Grid item xs={12} lg={10} className={classes.root}>
      <div>
        <Grid container item xs={12} className={classes.headerWrapper}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1" align="center">
              Question:{" "}
              <strong>
                {currentQuestion + 1} / {totalQuestions}
              </strong>
            </Typography>
          </Grid>
          <Grid item sm={12} md={4}>
            <Typography variant="body1" align="center">
              Time:{" "}
              <strong style={{ color: timeLeft <= 15 ? "red" : "black" }}>
                {timeLeft}s
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1" align="center">
              Difficulty Level:{" "}
              <strong style={{ textTransform: "capitalize" }}>
                {questions[0].difficulty}
              </strong>
            </Typography>
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
          <Typography
            variant="h5"
            dangerouslySetInnerHTML={{
              __html: questions[currentQuestion].question,
            }}
          ></Typography>
        </Paper>
        <div style={{ padding: "2rem 0", paddingBottom: "5rem" }}>
          <Grid container item xs={12} justify="space-between">
            {options.map((option, index) => {
              return (
                <Grid key={`${option}-${index}`} item xs={12} sm={5}>
                  <Paper
                    onClick={() =>
                      !isConfirmed ? optionClickHandler(index) : () => {}
                    }
                    style={{
                      background:
                        (selectedOption === correctOption &&
                          index === correctOption &&
                          isConfirmed) ||
                        (index === correctOption &&
                          selectedOption !== -1 &&
                          isConfirmed) ||
                        (timeLeft === 0 && index === correctOption)
                          ? "green"
                          : selectedOption !== -1 &&
                            selectedOption === index &&
                            isConfirmed
                          ? "tomato"
                          : "white",
                      border:
                        selectedOption === index && !isConfirmed
                          ? `3px solid ${theme.palette.secondary.main}`
                          : "3px solid transparent",
                      color:
                        (selectedOption !== -1 || timeLeft === 0) &&
                        (index === selectedOption || index === correctOption) &&
                        isConfirmed
                          ? "white"
                          : "black",
                    }}
                    className={classes.answerOption}
                  >
                    <div>{option}</div>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </div>
        <div>
          <Grid item container sm={12} justify="flex-end">
            <Button
              color="secondary"
              variant="outlined"
              disabled={selectedOption === -1 && timeLeft !== 0}
              onClick={
                !isConfirmed
                  ? submitClickHandler
                  : currentQuestion < totalQuestions - 1
                  ? nextQuestionHandler
                  : () => {
                      let { correctAnswered, totalQuestions } = results;
                      let percentage = (correctAnswered / totalQuestions) * 100;
                      let message = "You scored " + percentage + "%, ";
                      message +=
                        percentage <= 50
                          ? "Opps... Play again & improve your skills."
                          : percentage <= 75
                          ? "Good work, Better luck next time."
                          : "Nice work... Keep it up!!!";
                      history.push({
                        pathname: "/result",
                        state: {
                          message,
                          results,
                        },
                      });
                    }
              }
            >
              {!isConfirmed
                ? "Submit"
                : currentQuestion < totalQuestions - 1
                ? "Next"
                : "Finish"}
            </Button>
          </Grid>
        </div>
      </div>
    </Grid>
  );
};

export default withSnackbar(GameScreen);
