import Piece from "./piece.js";

export default class Queen extends Piece {
  constructor(player) {
    super(
      player,
      player === 1
        ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg"
        : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"
    );
  }

  isMovePossible(src, dest) {
    const mod = src % 8;
    const diff = 8 - mod;
    const srcDestAbsoluteDifference = Math.abs(src - dest);

    return (
      srcDestAbsoluteDifference % 9 === 0 ||
      srcDestAbsoluteDifference % 7 === 0 ||
      srcDestAbsoluteDifference % 8 === 0 ||
      (dest >= src - mod && dest < src + diff)
    );
  }

  /**
   * get path between src and dest (src and dest exclusive)
   * @param  {num} src
   * @param  {num} dest
   * @return {[array]}
   */
  getSrcToDestPath(src, dest) {
    const srcDestAbsoluteDifference = Math.abs(src - dest);
    let path = [],
      pathStart,
      pathEnd,
      incrementBy;
    if (src > dest) {
      pathStart = dest;
      pathEnd = src;
    } else {
      pathStart = src;
      pathEnd = dest;
    }
    if (srcDestAbsoluteDifference % 8 === 0) {
      incrementBy = 8;
      pathStart += 8;
    } else if (srcDestAbsoluteDifference % 9 === 0) {
      incrementBy = 9;
      pathStart += 9;
    } else if (srcDestAbsoluteDifference % 7 === 0) {
      incrementBy = 7;
      pathStart += 7;
    } else {
      incrementBy = 1;
      pathStart += 1;
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i);
    }
    return path;
  }
}
