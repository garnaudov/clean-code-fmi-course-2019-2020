import Piece from "./piece.js";

const PAWN_INITIAL_POSITIONS_WHITE = [8, 49, 50, 51, 52, 53, 54, 55];
const PAWN_INITIAL_POSITIONS_BLACK = [8, 9, 10, 11, 12, 13, 14, 15];
const FIELDS_NUMBER_IN_TWO_ROWS = 16;
const FIELDS_NUMBER_IN_ONE_ROWS = 8;


export default class Pawn extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"
    );
    this.initialPositions = {
      1: PAWN_INITIAL_POSITIONS_WHITE,
      2: PAWN_INITIAL_POSITIONS_BLACK,
    };
  }

  isMovePossible(src, dest, isDestEnemyOccupied) {
    const isPlayerWhite = this.player === 1;
    const isPlayerBlack = this.player === 2;


    const sourceOneRowBehindIndex = src - FIELDS_NUMBER_IN_ONE_ROWS;
    const sourceOneRowForwardIndex = src + FIELDS_NUMBER_IN_ONE_ROWS;

    const isWhitePawnIndexValid = dest === (src - FIELDS_NUMBER_IN_TWO_ROWS) && (this.initialPositions[1].indexOf(src) !== -1);
    const isBlackPawnIndexValid = (this.initialPositions[2].indexOf(src) !== -1) && (dest === src + FIELDS_NUMBER_IN_TWO_ROWS);

    const isWhitePawnDestPossible = (dest === src - 9 || dest === src - 7)
    const isBlackPawnDestPossible = (dest === src + 9 || dest === src + 7)


    if (isPlayerWhite) {
      if ((dest === sourceOneRowBehindIndex && !isDestEnemyOccupied) || isWhitePawnIndexValid) {
        return true;
      } else if (isDestEnemyOccupied && isWhitePawnDestPossible) {
        return true;
      }
    } else if (isPlayerBlack) {
      if ((dest === sourceOneRowForwardIndex && !isDestEnemyOccupied) || (isBlackPawnIndexValid)) {
        return true;
      } else if (isDestEnemyOccupied && isBlackPawnDestPossible) {
        return true;
      }
    }
    return false;
  }

  /**
   * returns array of one if pawn moves two steps, else returns empty array
   * @param  {[type]} src  [description]
   * @param  {[type]} dest [description]
   * @return {[type]}      [description]
   */
  getSrcToDestPath(src, dest) {
    if (dest === src - FIELDS_NUMBER_IN_TWO_ROWS) {
      return [src - FIELDS_NUMBER_IN_ONE_ROWS];
    } else if (dest === src + FIELDS_NUMBER_IN_TWO_ROWS) {
      return [src + FIELDS_NUMBER_IN_ONE_ROWS];
    }
    return [];
  }
}
