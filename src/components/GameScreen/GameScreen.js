import React, { useState, useEffect } from "react";
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
}));

const GameScreen = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
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

  useEffect(() => {
    const timerInstance = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft <= 0) clearInterval(timerInstance);

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
    console.log({
      question: questions[currentQuestion],
      "shuffled: ": shuffledOptions,
      correctAnswerIndex,
    });
    setCorrectOption(correctAnswerIndex);
    setOptions([...shuffledOptions]);
  }, [currentQuestion, questions]);

  const shuffleOptions = (options) => {
    let copiedOptions = [...options];
    copiedOptions.sort(() => Math.random() - 0.5);
    // for (let i = copiedOptions.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * i);
    //   const temp = copiedOptions[i];
    //   copiedOptions[i] = copiedOptions[j];
    //   copiedOptions[j] = temp;
    // }
    return copiedOptions;
  };

  const nextQuestionHandler = () => {
    setCurrentQuestion((question) => question + 1);
    setTimeLeft(initialTime);
    setSelectedOption(-1);
  };

  const optionClickHandler = (index) => {
    setSelectedOption(index);
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
              Time: <strong>{timeLeft}s</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body1" align="center">
              Difficulty Level: <strong>{questions[0].difficulty}</strong>
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
                    onClick={() => optionClickHandler(index)}
                    style={{
                      background:
                        (selectedOption === correctOption &&
                          index === correctOption) ||
                        (index === correctOption && selectedOption !== -1) ||
                        (timeLeft === 0 && index === correctOption)
                          ? "green"
                          : selectedOption !== -1 && selectedOption === index
                          ? "tomato"
                          : "white",
                      color:
                        (selectedOption !== -1 || timeLeft === 0) &&
                        (index === selectedOption || index === correctOption)
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
              onClick={
                currentQuestion < totalQuestions - 1
                  ? nextQuestionHandler
                  : () => {
                      history.push({
                        pathname: "/result",
                        state: {
                          message: "You passed",
                          result: {
                            correctAnswers: totalQuestions - 4,
                            wrongAnswers: totalQuestions - 7,
                            notAnswered: totalQuestions - 9,
                            totalQuestions,
                          },
                        },
                      });
                    }
              }
            >
              {currentQuestion < totalQuestions - 1 ? "Next" : "Finish"}
            </Button>
          </Grid>
        </div>
      </div>
    </Grid>
  );
};

export default withRouter(GameScreen);
