import Bishop from "../pieces/bishop.js";
import King from "../pieces/king.js";
import Knight from "../pieces/knight.js";
import Pawn from "../pieces/pawn.js";
import Queen from "../pieces/queen.js";
import Rook from "../pieces/rook.js";

const CHESSBOARD_FIEDS_PER_ROW = 8;
const CHESS_BOARD_FIELDS = 64;

const ROOK_INITIAL_POSITION_BOTTOM_LEFT = 0;
const ROOK__POSITION_BOTTOM_RIGHT = 7;
const ROOK_POSITION_TOP_LEFT = 56;
const ROOK_POSITION_BOTTOM_RIGHT = 63;

const KNIGHT_POSITION_BOTTOM_LEFT = 1;
const KNIGHT_POSITION_BOTTOM_RIGHT = 6;
const KNIGHT_POSITION_TOP_LEFT = 57;
const KNIGHT_POSITION_TOP_RIGHT = 62;

const BISHOP_POSITION_BOTTOM_LEFT = 2;
const BISHOP_POSITION_BOTTOM_RIGHT = 5;
const BISHOP_POSITION_TOP_LEFT = 58;
const BISHOP_POSITION_TOP_RIGHT = 61;

const QUEEN_POSITION_BOTTOM = 3;
const QUEEN_POSITION_TOP = 59;

const KING_POSITION_BOTTOM = 4;
const KING_POSITION_TOP = 60;

export default function initialiseChessBoard() {
  const squares = Array(CHESS_BOARD_FIELDS).fill(null);

  for (
    let i = CHESSBOARD_FIEDS_PER_ROW;
    i < CHESSBOARD_FIEDS_PER_ROW * 2;
    i++
  ) {
    squares[i] = new Pawn(2);
    squares[i + 40] = new Pawn(1);
  }
  squares[ROOK_INITIAL_POSITION_BOTTOM_LEFT] = new Rook(2);
  squares[ROOK__POSITION_BOTTOM_RIGHT] = new Rook(2);
  squares[ROOK_POSITION_TOP_LEFT] = new Rook(1);
  squares[ROOK_POSITION_BOTTOM_RIGHT] = new Rook(1);

  squares[KNIGHT_POSITION_BOTTOM_LEFT] = new Knight(2);
  squares[KNIGHT_POSITION_BOTTOM_RIGHT] = new Knight(2);
  squares[KNIGHT_POSITION_TOP_LEFT] = new Knight(1);
  squares[KNIGHT_POSITION_TOP_RIGHT] = new Knight(1);

  squares[BISHOP_POSITION_BOTTOM_LEFT] = new Bishop(2);
  squares[BISHOP_POSITION_BOTTOM_RIGHT] = new Bishop(2);
  squares[BISHOP_POSITION_TOP_LEFT] = new Bishop(1);
  squares[BISHOP_POSITION_TOP_RIGHT] = new Bishop(1);

  squares[QUEEN_POSITION_BOTTOM] = new Queen(2);
  squares[KING_POSITION_BOTTOM] = new King(2);

  squares[QUEEN_POSITION_TOP] = new Queen(1);
  squares[KING_POSITION_TOP] = new King(1);

  return squares;
}
