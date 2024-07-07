class Cell {
  constructor(x, y, grid) {
    this.x = x;
    this.y = y;
    this.bombsNear = 0;
    this.nearCells = [];
    this.isBomb = false;
    this.isFlagged = false;
    this.grid = grid;
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
    });
    button.addEventListener("auxclick", () => {
      console.log("flag");
      this.flag();
    });
    return button;
  }

  checkIfCellEmpty(array) {
    let checkedCells = array ? array : [];
    if (this.bombsNear > 0) {
      return (this.cellDiv.innerText = this.bombsNear);
    }
    if (!checkedCells.includes(this)) {
      checkedCells.push(this);
      this.cellDiv.classList.add("emptyCell");
      this.cellDiv.innerText = "";
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
}

export default Cell;
