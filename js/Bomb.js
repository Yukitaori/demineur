import Cell from "./Cell.js";

class Bomb extends Cell {
  constructor(x, y, grid) {
    super();
    this.x = x;
    this.y = y;
    this.isBomb = true;
    this.grid = grid;
  }

  getBomb() {
    const bomb = document.createElement("td");
    bomb.classList.add("cell");
    bomb.setAttribute("id", `cell-${this.y}-${this.x}`);
    bomb.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    const button = this.createButton();
    bomb.appendChild(button);

    this.cellDiv = bomb;
    return bomb;
  }

  explode() {
    const bombCell = this.getCell();
    bombCell.classList.add("bomb");
  }

  getNearCells() {
    delete this.bombsNear;
    delete this.nearCells;
    return;
  }
}

export default Bomb;
