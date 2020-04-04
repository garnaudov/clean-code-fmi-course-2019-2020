import React from 'react';

import '../index.css';
import Board from './board.js';
import FallenSoldierBlock from './fallen-soldier-block.js';
import initialiseChessBoard from '../helpers/board-initialiser.js';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initialiseChessBoard(),
      whiteFallenSld: [],
      blackFallenSld: [],
      player: 1,
      sourceSelection: -1,
      status: '',
      turn: 'white'
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (this.state.sourceSelection == -1) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({ status: "Wrong selection. Choose player " + this.state.player + " pieces." });
        if (squares[i]) {
          squares[i].style = { ...squares[i].style, backgroundColor: "" };
        }
      }
      else {
        squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" };
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i
        });
      }
    }

    else if (this.state.sourceSelection > -1) {
      squares[this.state.sourceSelection].style = { ...squares[this.state.sourceSelection].style, backgroundColor: "" };
      if (squares[i] && squares[i].player == this.state.player) {
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: -1,
        });
      }
      else {

        const squares = this.state.squares.slice();
        const whiteFallenSld = this.state.whiteFallenSld.slice();
        const blackFallenSld = this.state.blackFallenSld.slice();
        const isDestEnemyOccupied = squares[i] ? true : false;
        const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
        const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
        const moveLegal = this.moveLegal(srcToDestPath);

        if (isMovePossible && moveLegal) {
          if (squares[i] !== null) {
            if (squares[i].player == 1) {
              whiteFallenSld.push(squares[i]);
            }
            else {
              blackFallenSld.push(squares[i]);
            }
          }
          squares[i] = squares[this.state.sourceSelection];
          squares[this.state.sourceSelection] = null;
          let player = this.state.player == 1 ? 2 : 1;
          let turn = this.state.turn == 'white' ? 'black' : 'white';
          this.setState({
            sourceSelection: -1,
            squares: squares,
            whiteFallenSld: whiteFallenSld,
            blackFallenSld: blackFallenSld,
            player: player,
            status: '',
            turn: turn
          });
        }
        else {
          this.setState({
            status: "Wrong!",
            sourceSelection: -1,
          });
        }
      }
    }

  }


  moveLegal(srcToDestPath) {
    let legal = true;
    for (let i = 0; i < srcToDestPath.length; i++) {
      if (this.state.squares[srcToDestPath[i]] !== null) {
        legal = false;
      }
    }
    return legal;
  }

  render() {

    return (
      <div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={this.state.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div id="player-turn-box" style={{ backgroundColor: this.state.turn }}>

            </div>
            <div className="game-status">{this.state.status}</div>

            <div className="fallen-soldier-block">

              {<FallenSoldierBlock
                whiteSld={this.state.whiteFallenSld}
                blackSld={this.state.blackFallenSld}
              />
              }
            </div>

          </div>
        </div>
      </div>


    );
  }
}

