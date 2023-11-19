class GameOfLife {
  constructor() {
    this.tiles = [];
    this.rowNum = 50;
    this.colNum = 50;

    for (let row = 0; row < this.rowNum; row++) {
      for (let col = 0; col < this.colNum; col++) {
        const x = (width / this.colNum) * col;
        const y = (height / this.rowNum) * row;
        const newTile = new Cell(
          x,
          y,
          width / this.colNum,
          height / this.rowNum
        );
        this.tiles.push(newTile);
      }
    }

    for (let row = 0; row < this.rowNum; row++) {
      for (let col = 0; col < this.colNum; col++) {
        const neighborsIdx = [
          this.getIdx(row - 1, col - 1),
          this.getIdx(row - 1, col),
          this.getIdx(row - 1, col + 1),
          this.getIdx(row, col + 1),
          this.getIdx(row + 1, col + 1),
          this.getIdx(row + 1, col),
          this.getIdx(row + 1, col - 1),
          this.getIdx(row, col - 1),
        ];

        if (col === 0) {
          neighborsIdx[0] = -1;
          neighborsIdx[6] = -1;
          neighborsIdx[7] = -1;
        } else if (col === this.colNum - 1) {
          neighborsIdx[2] = -1;
          neighborsIdx[3] = -1;
          neighborsIdx[4] = -1;
        }

        if (row === 0) {
          neighborsIdx[0] = -1;
          neighborsIdx[1] = -1;
          neighborsIdx[2] = -1;
        } else if (row === this.rowNum - 1) {
          neighborsIdx[4] = -1;
          neighborsIdx[5] = -1;
          neighborsIdx[6] = -1;
        }

        const neighbors = [];
        neighborsIdx.forEach((eachIdx) => {
          neighbors.push(eachIdx >= 0 ? this.tiles[eachIdx] : null);
        });

        const idx = this.getIdx(row, col);
        this.tiles[idx].setNeighbors(neighbors);
      }
    }

    randomSeed(1);
    this.tiles.forEach((each) => {
      const randomState = floor(random(3)); // 0: rock, 1: paper, 2: scissors
      each.state = randomState;
    });
  }

  getIdx(row, col) {
    return row * this.colNum + col;
  }

  draw() {
    background(255);

    this.tiles.forEach((each) => {
      each.calcNextState();
    });

    this.tiles.forEach((each) => {
      each.update();
    });

    this.tiles.forEach((each) => {
      each.display(mouseX, mouseY);
    });
  }
}

class Cell {
  constructor(x, y, w, h, isClickable = true) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isClickable = isClickable;
    this.state = 0; // 0: rock, 1: paper, 2: scissors
    this.nextState = this.state;
    this.neighbors = [];
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  calcNextState() {
    const winningStates = [2, 0, 1]; // rock beats scissors, scissors beats paper, paper beats rock
    const winningNeighbors = this.neighbors.filter(
      (eachNeighbor) =>
        eachNeighbor && winningStates[eachNeighbor.state] === this.state
    );

    if (winningNeighbors.length <= 2) {
      this.nextState = this.state;
    } else {
      const winningNeighbor = winningNeighbors[0];
      this.nextState = winningNeighbor.state;
    }
  }

  update() {
    this.state = this.nextState;
  }

  isHover(mx, my) {
    return (
      this.x < mx && this.x + this.w > mx && this.y < my && this.y + this.h > my
    );
  }

  toggleState(mx, my) {
    if (!this.isClickable) return false;
    if (!this.isHover(mx, my)) return false;
    this.state = (this.state + 1) % 3; // Cycle through rock, paper, scissors
    return true;
  }

  display(mx, my) {
    push();
    translate(this.x, this.y);
    stroke(this.isHover(mx, my) ? 'red' : 'black');
    fill(
      this.state === 0
        ? color(200, 80, 100)
        : this.state === 1
        ? color(0, 100, 80)
        : color(100, 80, 200)
    ); // Colors for rock, paper, scissors
    rect(0, 0, this.w, this.h);
    pop();
  }
}

let game;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  game = new GameOfLife();
}

function draw() {
  game.draw();
}

function mouseClicked() {
  for (let idx = 0; idx < game.tiles.length; idx++)
    if (game.tiles[idx].toggleState(mouseX, mouseY)) break;
}
