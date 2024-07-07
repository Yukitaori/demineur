class Cell {
  constructor(x, y, grid) {
    this.x = x;
    this.y = y;
    this.bombsNear = 0;
    this.nearCells = [];
    this.isBomb = false;
    this.isFlagged = false;
    this.grid = grid;
    this.isChecked = false;
  }

  getEmptyCell() {
    const cell = document.createElement("td");
    cell.classList.add("cell");
    cell.setAttribute("id", `cell-${this.y}-${this.x}`);
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    const button = this.createButton();
    cell.appendChild(button);
    this.cellDiv = cell;

    return cell;
  }

  createButton() {
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      if (!this.isBomb) {
        this.checkIfCellEmpty();
      } else {
        this.explode();
      }
      this.checkGrid();
    });
    button.addEventListener("auxclick", () => {
      this.flag();
      this.checkGrid();
    });
    return button;
  }

  checkIfCellEmpty(array) {
    let checkedCells = array ? array : [];
    this.isChecked = true;
    if (this.bombsNear > 0) {
      return (this.cellDiv.innerText = this.bombsNear);
    }
    if (!checkedCells.includes(this)) {
      checkedCells.push(this);
      this.cellDiv.classList.add("emptyCell");
      this.cellDiv.innerText = "";
      this.isFlagged = false;
      for (let nearCell of this.nearCells) {
        nearCell.checkIfCellEmpty(checkedCells);
      }
    }
  }

  flag() {
    const cell = this.cellDiv;
    if (this.isFlagged) {
      cell.innerHTML = "";
      cell.appendChild(this.createButton());
      this.isFlagged = false;
    } else {
      this.cellDiv.innerText = "☠️";
      cell.appendChild(this.createButton());
      this.isFlagged = true;
    }
  }

  getCell() {
    return document.getElementById(`cell-${this.y}-${this.x}`);
  }

  getNearCells(cells) {
    for (let cell of cells) {
      if (
        cell.x >= this.x - 1 &&
        cell.x <= this.x + 1 &&
        cell.y >= this.y - 1 &&
        cell.y <= this.y + 1
      ) {
        if (cell.isBomb) {
          this.bombsNear++;
        } else {
          if (cell != this) this.nearCells.push(cell);
        }
      }
    }
  }

  checkGrid() {
    // S'il ne reste plus dans la grille de bombe non signalée => Gagné
    if (!this.grid.cells.find((cell) => cell.isBomb && !cell.isFlagged)) {
      console.log("C'est la win");
    } else {
      if (this.grid.cells.find((cell) => !cell.isBomb && !cell.isChecked)) {
        console.log("Pas encore gagné");
      } else {
        console.log("C'est la win");
      }
    }
  }
}

export default Cell;
