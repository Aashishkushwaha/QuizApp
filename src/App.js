import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import GameStarter from "./components/GameStarter/GameStarter";
import GameScreen from "./components/GameScreen/GameScreen";
import ResultScreen from "./components/ResultScreen/ResultScreen";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={GameStarter} />
        <Route path="/game" exact component={GameScreen} />
        <Route path="/result" exact component={ResultScreen} />
      </Switch>
    </div>
  );
}

export default App;
