import React from 'react';

export default class GameStatus extends React.Component {
  constructor(props) {
    super(props);
    this.formatTime = this.formatTime.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  formatTime(time) {
    let hour = Math.floor(time / 3600);
    let minute = Math.floor((time - hour*3600)/60);
    let seconds = time - (hour*3600 + minute*60);
    (hour === 0) ? hour = '' : hour = hour + ':';
    if (minute === 0) {
      minute = '00:';
    } else if (minute < 10) {
      minute = '0' + minute.toString() + ':'
    } else {
      minute = minute + ':'
    }
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }
    return hour + minute + seconds;
  }

  handleResetClick() {
    this.props.handleResetClicked();
  }

  render() {
    const time = this.props.time;
    const score = this.props.score;
    const highScore = this.props.highScore;
    const difficulty = this.props.difficulty;
    const endGame = this.props.endGame;

    return (
      <div className="game-status-wrapper">
        <div className="status-element">
          <h2>Time: </h2>
          <h2>{this.formatTime(time)}</h2>
        </div>
        <div className="status-element">
          <h2>Matched: </h2>
          <h2>{score}/{Math.floor((difficulty*difficulty)/2)}</h2>
        </div>
        {(!!highScore[difficulty]) && (
          <div className="status-element">
          <h2>Best: </h2>
          <h2>{this.formatTime(highScore[difficulty])}</h2>
        </div>)
        }
        {endGame && <div><h2 className="win">You Won!</h2></div>}
        <button onClick={this.handleResetClick}><h3>Reset</h3></button>
      </div>
    )
  }
}