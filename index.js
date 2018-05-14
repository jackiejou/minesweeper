class Minesweeper {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.board = [];
    this.gameBoard = [];
    this.cellsCount = row * col;
    this.minesCount = Math.ceil(this.cellsCount * 0.15);
  }
  initialize() {
    for (let i = 0; i < this.row; i++) {
      let arr = [];
      for (let j = 0; j < this.col; j++) {
        arr.push(0);
      }
      this.board.push(arr);
      this.gameBoard.push(arr.map(ele => '_'));
    }
    this.showBoard();
  }
  showBoard() {
    this.gameBoard.forEach(row => {
      console.log(row.join(' '));
    });
  }
  plantMines() {
    // 15 percent bombs, ceil
    let cells = this.cellsCount;
    let mines = this.minesCount;
    console.log(`there are ${mines} mines`);
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (Math.random() < mines / cells) {
          this.board[i][j] = 9;
          this.changeAdjacent(i, j, this.incCell.bind(this));
          mines--;
        }
        cells--;
      }
    }
  }
  changeAdjacent(row, col, func) {
    func(row, col - 1); // left
    func(row, col + 1); // right
    func(row - 1, col); // up
    func(row + 1, col); // down
    func(row - 1, col - 1); // up left
    func(row + 1, col - 1); // down left
    func(row - 1, col + 1); // up right
    func(row + 1, col + 1); // down right
  }
  incCell(row, col) {
    if (row < this.row && col < this.col && row >= 0 && col >= 0) {
      if (this.board[row][col] !== 9) this.board[row][col]++;
    }
  }
  reveal(row, col) {
    if (row < this.row && col < this.col && row >= 0 && col >= 0 && this.gameBoard[row][col] === '_') {
      this.gameBoard[row][col] = this.board[row][col];
      if (this.board[row][col] === 0) this.changeAdjacent(row, col, this.reveal.bind(this));
      this.cellsCount--;
    }
  }
  makeMove (row, col) {
    this.reveal(row, col);
    this.showBoard();
    console.log(`there are ${this.cellsCount} cells left`);
    if (this.gameBoard[row][col] === 9) console.log('you lost!');
    if (this.cellsCount === this.minesCount) console.log('you won!');
  }
}
let test = new Minesweeper(10,10);
test.initialize();
test.plantMines();
console.log('move 5,5');
test.makeMove(5,5);