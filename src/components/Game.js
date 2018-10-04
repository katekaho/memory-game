import React from 'react';
import GameStatus from './GameStatus';
import Grid from './Grid';

export default class Game extends React.Component {

  constructor(props) {
    super(props);

    this.handleClickHome = this.handleClickHome.bind(this);
    this.handleCardClicked = this.handleCardClicked.bind(this);
    this.handleResetClicked = this.handleResetClicked.bind(this);
  }

  handleClickHome() {
    this.props.onClickHome();
  }

  handleCardClicked(key) {
    this.props.handleCardClicked(key);
  }

  handleResetClicked() {
    this.props.handleResetClicked();
  }

  render() {

    const viewHome = this.props.viewHome;
    const grid = this.props.grid;
    const time = this.props.time;
    const score = this.props.score;
    const highScore = this.props.highScore;
    const difficulty = this.props.difficulty;
    const disableSelectCard = this.props.disableSelectCard;
    const endGame = this.props.endGame;
    const multiplayer = this.props.multiplayer;

    if (viewHome === false) {
      return (
        <div className="game-wrapper">
          <div className="top-information">
            <a onClick={this.handleClickHome}><h3>&lt; Back to Home</h3></a>
            {multiplayer && <h5>1/2 Players Here</h5>}
          </div>
          <div className="game-content">
            <GameStatus
              time={time}
              score={score}
              highScore={highScore}
              difficulty={difficulty}
              endGame={endGame}
              handleResetClicked={this.handleResetClicked}
            ></GameStatus>
            <Grid grid={grid} handleCardClicked={this.handleCardClicked}
              disableSelectCard={disableSelectCard} difficulty={difficulty}         
            ></Grid>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}