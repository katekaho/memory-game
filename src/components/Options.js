import React from 'react';

export default class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRooms: false,
      viewDifficulties: false,
    };
    this.handleClickDifficulty = this.handleClickDifficulty.bind(this);
    this.handleClickMultiplayer = this.handleClickMultiplayer.bind(this);
    this.handleClickStart = this.handleClickStart.bind(this);
  }

  handleClickDifficulty() {
    this.setState(prevState => {
      const viewDifficulties = !prevState.viewDifficulties
      let viewRooms;
      if (viewDifficulties) {
        viewRooms = false;
      }
      return {viewDifficulties: viewDifficulties, viewRooms: viewRooms}
    });
  }

  handleChangeDifficulty(e) {
    this.props.onDifficultyChange(e);
  }

  handleClickMultiplayer() {
    this.setState(prevState => {
      const viewRooms = !prevState.viewRooms;
      let viewDifficulties;
      if (viewRooms) {
        viewDifficulties = false;
      }
      return {viewRooms: viewRooms, viewDifficulties: viewDifficulties}
    });
  }

  handleClickStart() {
    this.props.onClickStart();
  }

  render() {

    const viewHome = this.props.viewHome;
    const difficulty = this.props.difficulty;

    if (viewHome === true){
      return (
        <div className="options-wrapper">
          <div>
            <a onClick={this.handleClickStart}><h2>Start</h2></a>
          </div>
          {/* 
          // Multiplayer Option, commenting out until implemented
          <div className="multi-wrapper">
            <a onClick={this.handleClickMultiplayer}><h2>Multiplayer</h2></a>
            {this.state.viewRooms &&
              <div className="room-wrapper">
                <h4>Select a Room</h4>
                <div className="buttons-wrapper">
                <a><h3>6x6 (0/2)</h3></a>
                <a><h3>8x8 (0/2)</h3></a>
                <a><h3>10x10 (0/2)</h3></a>
                </div>
              </div>
            }
          </div> */}
          <div className="diff-wrapper">
          <a onClick={this.handleClickDifficulty}><h2>Set Difficulty</h2></a>
            { this.state.viewDifficulties &&
              <div className="buttons-wrapper">
                {/* Could use future refactoring of CSS to make dynamic grid */}
                <a onClick={() => this.handleChangeDifficulty(2)}><h3 className={(difficulty === 2) ? 'selected': ''}>2x2</h3></a>
                <a onClick={() => this.handleChangeDifficulty(4)}><h3 className={(difficulty === 4) ? 'selected': ''}>4x4</h3></a>
                <a onClick={() => this.handleChangeDifficulty(6)}><h3 className={(difficulty === 6) ? 'selected': ''}>6x6</h3></a>
                <a onClick={() => this.handleChangeDifficulty(8)}><h3 className={(difficulty === 8) ? 'selected': ''}>8x8</h3></a>
                <a onClick={() => this.handleChangeDifficulty(10)}><h3 className={(difficulty === 10) ? 'selected': ''}>10x10</h3></a>
              </div>
            }
          </div>
        </div>
      )
    } else {
      return null;
    }

  }
}