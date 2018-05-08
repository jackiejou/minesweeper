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
    console.log('there are mines of', mines);
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        if (Math.random() < mines / cells) {
          this.board[i][j] = 9;
          mines--;
        }
        cells--;
      }
    }
    console.log(cells, 'left');
  }
}
let test = new Minesweeper(8,6);
test.initialize();
test.plantMines();
test.showBoard();