const prompt = require('prompt');

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
      this.gameBoard.push(arr.map(ele => '-'));
    }
    // Plant mines, at 15 percent bomb rate, ceil
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
    this.showBoard();
  }
  showBoard() {
    this.gameBoard.forEach(row => {
      console.log(row.join(' '));
    });
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
    if (row < this.row && col < this.col && row >= 0 && col >= 0 && this.gameBoard[row][col] === '-') {
      this.gameBoard[row][col] = this.board[row][col];
      if (this.board[row][col] === 0) this.changeAdjacent(row, col, this.reveal.bind(this));
      this.cellsCount--;
    }
  }
  makeMove () {
    console.log('Make a move!');
    prompt.get([
      {
        name: 'row',
        required: true,
        conform: (value) => {
          return value > 0 && value <= this.col;
        },
        message: `Row number must be between 1 and ${this.row}`,
      },
      {
        name: 'col',
        required: true,
        conform: (value) => {
          return value > 0 && value <= this.col;
        },
        message: `Row number must be between 1 and ${this.row}`,
      }
    ], (err, results) => {
      this.reveal(+results.row - 1, +results.col - 1);
      this.showBoard();
      console.log(`there are ${this.cellsCount} cells and ${this.minesCount} mines left`);
      if (this.gameBoard[+results.row - 1][+results.col - 1] === 9) {
        console.log('You hit a mine! You lose!');
      } else if (this.cellsCount === this.minesCount) {
        console.log('You won!');
      } else {
        this.makeMove();
      }
    })
  }
}

prompt.start();
let boardSchema = {
  properties: {
    rowLength: {
      conform: (value) => {
        return value > 0 && value <= 20;
      },
      message: 'Length must be between 1 and 20',
      required: true
    },
    colLength: {
      conform: (value) => {
        return value > 0 && value <= 20
      },
      message: 'Width must be between 1 and 20',
      required: true
    }
  }
}

prompt.get(boardSchema, (err, results) => {
  let game = new Minesweeper(+results.rowLength, +results.colLength);
  game.initialize();
  game.makeMove();
});
