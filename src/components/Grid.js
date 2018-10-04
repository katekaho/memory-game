import React from 'react';
import classNames from 'classnames';

function Square(props) {
  const value = props.value;
  const flipped = props.flipped;
  const index = props.index;
  const disableSelectCard = props.disableSelectCard;
  const handleCardClicked = props.handleCardClicked;
  if (flipped) {
    return (
      <div className="square">{value}</div>
    )
  } else {
    return (
      <div className="square not-flipped" onClick={() => {return disableSelectCard ? null : handleCardClicked(index)}}></div>
    )
  }
}

export default class Grid extends React.Component {

  constructor(props) {
    super(props);
    this.handleCardClicked = this.handleCardClicked.bind(this);
  }

  handleCardClicked(key) {
    this.props.handleCardClicked(key);
  }


  render() {
    const grid = this.props.grid;
    const disableSelectCard = this.props.disableSelectCard;
    const difficulty = this.props.difficulty;

    let gridClasses = classNames({
      'grid-wrapper': true,
      'two': difficulty === 2,
      'four': difficulty === 4,
      'six': difficulty === 6,
      'eight': difficulty === 8,
      'ten': difficulty === 10,
    })

    return (
      <div className={gridClasses}>
        {grid.map((square, index) => {
          return <Square value={square.value} 
            flipped={square.flipped} key={index} index={index}
            handleCardClicked={this.handleCardClicked}
            disableSelectCard={disableSelectCard}>
          </Square>
          })}
      </div>
    )
  }
}