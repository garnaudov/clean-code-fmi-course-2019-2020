import React from "react";

import "../index.css";
import Square from "./square.js";

const NUMBERS_BOARD_FIELDS_PER_ROW = 8;

export default class Board extends React.Component {
  renderSquare(i, squareShade) {
    return (
      <Square
        style={this.props.squares[i] ? this.props.squares[i].style : null}
        shade={squareShade}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const board = [];
    let areBothCountersEven = (i,j) => isEven(i) && isEven(j);
    let areBothCountersOdd = (i,j) => !isEven(i) && !isEven(j);
    for (let i = 0; i < NUMBERS_BOARD_FIELDS_PER_ROW; i++) {
      const squareRows = [];
      for (let j = 0; j < NUMBERS_BOARD_FIELDS_PER_ROW; j++) {
        const squareShade =
          (areBothCountersEven(i,j)) || (areBothCountersOdd(i,j))
            ? "light-square"
            : "dark-square";
        squareRows.push(this.renderSquare(i * NUMBERS_BOARD_FIELDS_PER_ROW + j, squareShade));
      }
      board.push(<div className="board-row">{squareRows}</div>);
    }

    return <div>{board}</div>;
  }
}

function isEven(num) {
  return num % 2 === 0;
}
