import Cell from "./js/Cell.js";
import Bomb from "./js/Bomb.js";

const difficulties = {
  easy: {
    dimensions: 20,
    // bombs: 70,
    bombs: 1,
  },
  medium: {
    dimensions: 35,
    bombs: 140,
  },
  hard: {
    dimensions: 50,
    bombs: 300,
  },
};
let selectedDifficulty;

const gameGrid = document.getElementById("gameGrid");
const difficulty = document.getElementById("difficulty");
difficulty.addEventListener("change", (e) => {
  selectedDifficulty = difficulties[e.target.value];
  newGame();
});

function newGame() {
  gameGrid.innerHTML = "";
  const grid = {
    bombs: selectedDifficulty.bombs,
    height: selectedDifficulty.dimensions,
    width: selectedDifficulty.dimensions,
    cells: [],
  };
  createGrid(grid);
}

// Création de la grid
function createGrid(grid) {
  const bombsToPlace = getBombs(grid);
  grid.bombsToPlace = bombsToPlace;
  for (let y = 1; y <= grid.height; y++) {
    createRow(grid, y);
  }
  for (let cell of grid.cells) {
    cell.getNearCells(grid.cells);
  }
}

// Création d'un row
function createRow(grid, y) {
  const row = document.createElement("tr");
  row.classList.add("row");
  row.setAttribute("id", `row-${y}`);

  for (let x = 1; x <= grid.width; x++) {
    if (
      grid.bombsToPlace.find((bombToPlace) => {
        return bombToPlace.x === x && bombToPlace.y === y;
      })
    ) {
      let bomb = createBomb(grid, row, x, y);
      grid.cells.push(bomb);
    } else {
      let cell = createCell(grid, row, x, y);
      grid.cells.push(cell);
    }
  }

  gameGrid.appendChild(row);
}

// Création d'une cellule simple
function createCell(grid, row, x, y) {
  const cell = new Cell(x, y, grid);
  const cellButton = cell.getEmptyCell();
  row.appendChild(cellButton);
  return cell;
}

// Création d'une cellule bombe
function createBomb(grid, row, x, y) {
  const bomb = new Bomb(x, y, grid);
  const bombButton = bomb.getBomb();
  row.appendChild(bombButton);
  return bomb;
}

// Détermination aléatoire des coordonnées des bombes
function getBombs(grid) {
  const bombsToPlace = [];
  for (let i = 1; i <= grid.bombs; i++) {
    const bomb = setBombCoordinates(bombsToPlace, grid);
    bombsToPlace.push(bomb);
  }
  return bombsToPlace;
}

function setBombCoordinates(bombsToPlace, grid) {
  const bomb = {
    x: Math.floor(Math.random() * grid.height + 1),
    y: Math.floor(Math.random() * grid.width + 1),
  };
  if (
    bombsToPlace.find((existingBomb) => {
      return existingBomb.x === bomb.x && existingBomb.y === bomb.y;
    })
  ) {
    return setBombCoordinates(bombsToPlace, grid);
  } else {
    return bomb;
  }
}
