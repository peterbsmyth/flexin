/**
 * is-board-empty
 * @param board
 */
export const isBoardEmpty = (board: any[][]) => {
  for (const column in board) {
    if (board[column].length !== 0) {
      return false;
    }
  }
  return true;
};
