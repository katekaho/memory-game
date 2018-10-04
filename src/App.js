import React, { Component } from 'react';
import Options from './components/Options';
import Game from './components/Game';
import classNames from 'classnames';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      viewHome: true,
      difficulty: 2,
      multiplayer: false,
      time: 0,
      score: 0,
      highScore: {},
      grid: [],
      interval: null,
      lastKeyFlipped: -1,
      disableSelectCard: false,
      endGame: false
    };

    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.handleNavigateToGame = this.handleNavigateToGame.bind(this);
    this.handleNavigateFromGame = this.handleNavigateFromGame.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.handleCardClicked = this.handleCardClicked.bind(this);
    this.handleResetClicked = this.handleResetClicked.bind(this);
  }


  handleNavigateToGame() {
    this.setState({viewHome: false, multiplayer: false});
    this.createGrid();
    let interval = setInterval(() => {
      this.setState({time: this.state.time + 1})
    }, 1000)
    this.setState({interval: interval})
  }

  handleResetClicked() {
    clearInterval(this.state.interval);
    this.createGrid();
    this.setState({time: 0, score: 0, endGame: false});
    let interval = setInterval(() => {
      this.setState({time: this.state.time + 1})
    }, 1000)
    this.setState({interval: interval})
  }

  handleNavigateFromGame() {
    clearInterval(this.state.interval);
    this.setState({viewHome: true, time: 0, score: 0, endGame: false});
  }

  handleDifficultyChange(difficulty) {
    this.setState({difficulty: difficulty});
  }

  // Taken from StackOverflow, Fisher-Yates Shuffle, shuffles array
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  createGrid() {
    let halfOfGrid = (this.state.difficulty * this.state.difficulty) / 2;
    let grid = [];
    for (let i = 1; i <= halfOfGrid; i++) {
      grid.push({value: i, flipped: false});
    }
    grid = grid.concat(grid);
    grid = this.shuffle(grid);
    this.setState({grid: grid});
  }


  handleCardClicked(key) {
    const difficulty = this.state.difficulty;
    let grid = this.state.grid;

    // Flip card over
    grid[key] = {value: grid[key].value, flipped: true};
    this.setState({grid: grid});
    let cardsFlipped = grid.filter(square => square.flipped === true)
    let numberOfCardsFlipped = cardsFlipped.reduce((total, current) => {return total + 1}, 0);
    if (numberOfCardsFlipped % 2 === 0) {
      // If even number, check pairs
      cardsFlipped.sort((s1, s2) => s1.value - s2.value);
      let pairs = 0;
      for (let i = 1; i < cardsFlipped.length; i++) {
        if (cardsFlipped[i-1].value === cardsFlipped[i].value) {
          pairs++;
        }
      }
      // If same amount of pairs as before, turn last cards back over after a few seconds
      if (this.state.score === pairs) {
        this.setState({disableSelectCard: true});
        let timeout = setTimeout(() => {
          grid[key] = {value: grid[key].value, flipped: false};
          const lastFlipped = this.state.lastKeyFlipped;
          if (lastFlipped !== -1) {
            grid[lastFlipped] = {value: grid[lastFlipped].value, flipped: false};
          }
          this.setState({grid: grid, disableSelectCard: false});
          clearTimeout(timeout);
        }, 1000)
      } else { // If new amount, update score
        this.setState({score: pairs});
      }
    } else { // Odd number, save last key flipped
      this.setState({lastKeyFlipped: key});
    }
    let numberOfCards = difficulty * difficulty;
    if (numberOfCards % 2 !== 0) {
      numberOfCards--;
    }

    if (numberOfCards === numberOfCardsFlipped) {
      this.setState({endGame: true});
      let time = this.state.time;
      clearInterval(this.state.interval);
      if (!this.state.highScore[difficulty] || this.state.highScore[difficulty] > time) {
        this.setState({
          highScore: Object.assign(this.state.highScore, {[difficulty]: time}),
        })
      }
    }
  }


  render() {

    return (
      <div className="app-wrapper">
        <div className={classNames('title', `${this.state.viewHome ? '' : 'in-game'}`)}>
          <h1>Memory Game</h1> 
          <div className="line"></div>
        </div>
          <Options 
            onDifficultyChange={this.handleDifficultyChange}
            onClickStart={this.handleNavigateToGame}
            viewHome={this.state.viewHome}
            difficulty={this.state.difficulty}
            gameStarted={this.state.gameStarted}
          ></Options>
        <Game
          onClickHome={this.handleNavigateFromGame}
          viewHome={this.state.viewHome}
          grid={this.state.grid}
          time={this.state.time}
          score={this.state.score}
          highScore={this.state.highScore}
          difficulty={this.state.difficulty}
          multiplayer={this.state.multiplayer}
          handleCardClicked={this.handleCardClicked}
          disableSelectCard={this.state.disableSelectCard}
          endGame={this.state.endGame}
          handleResetClicked={this.handleResetClicked}>
        </Game>
      </div>
    );
  }
}

export default App;