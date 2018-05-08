class Minesweeper {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.board = [];
  }
  initialize() {
    for (let i = 0; i < this.row; i++) {
      let arr = [];
      for (let j = 0; j < this.col; j++) {
        arr.push(0);
      }
      this.board.push(arr);
    }
  }
  showBoard() {
    this.board.forEach(row => {
      console.log(row.join(' '));
    });
  }
  plantMines() {
    // 15 perceent bombs, ceil
    let cells = this.row * this.col;
    let mines = Math.ceil(cells * 0.15);
    console.log(`there are ${mines} mines`);
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (Math.random() < mines / cells) {
          this.board[i][j] = 9;
          this.incAdjacent(i, j);
          mines--;
        }
        cells--;
      }
    }
  }
  incAdjacent(row, col) {
    this.incCell(row, col - 1); // left
    this.incCell(row, col + 1); // right
    this.incCell(row - 1, col); // up
    this.incCell(row + 1, col); // down
    this.incCell(row - 1, col - 1); // up left
    this.incCell(row + 1, col - 1); // down left
    this.incCell(row - 1, col + 1); // up right
    this.incCell(row + 1, col + 1); // down right
  }
  incCell(row, col) {
    if (row < this.row && col < this.col && row >= 0 && col >= 0) {
      if (this.board[row][col] !== 9) this.board[row][col]++;
    }
  }
}
let test = new Minesweeper(8,6);
test.initialize();
test.plantMines();
test.showBoard();