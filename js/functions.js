import Cell from "./Cell.js";
import Bomb from "./Bomb.js";

function newGame(selectedDifficulty) {
  const newGameDiv = document.getElementById("newGameDiv");
  const controlDiv = document.getElementById("controlDiv");
  const gameGrid = document.getElementById("gameGrid");
  newGameDiv.classList.add("hidden");
  controlDiv.classList.remove("hidden");
  gameGrid.innerHTML = "";
  if (selectedDifficulty != null) {
    const grid = {
      bombs: selectedDifficulty.bombs,
      height: selectedDifficulty.dimensions,
      width: selectedDifficulty.dimensions,
      cells: [],
    };
    createGrid(grid);
  } else {
    newGameDiv.classList.remove("hidden");
    controlDiv.classList.add("hidden");
  }
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
  const gameGrid = document.getElementById("gameGrid");
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

function alertModal(alert, confirm) {
  document.getElementById("alertModalBg")
    ? document
        .getElementById("main")
        .removeChild(document.getElementById("alertModalBg"))
    : null;

  let modalBg = document.createElement("div");
  modalBg.setAttribute("class", "modalBg");
  modalBg.setAttribute("id", "alertModalBg");
  document.getElementById("main").appendChild(modalBg);

  let modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.setAttribute("id", "alertModal");
  modalBg.appendChild(modal);

  let modalText = document.createElement("p");
  modalText.setAttribute("class", "modalText");
  modalText.innerText = alert;
  modal.appendChild(modalText);

  let modalButton = document.createElement("button");
  modalButton.setAttribute("class", "modalButton");
  modalButton.innerText = confirm;
  modalButton.addEventListener("click", removeModal);
  modal.appendChild(modalButton);

  function removeModal() {
    modalBg.remove();
  }
}

function rulesModal() {
  document.getElementById("alertModalBg")
    ? document
        .getElementById("main")
        .removeChild(document.getElementById("alertModalBg"))
    : null;

  let modalBg = document.createElement("div");
  modalBg.setAttribute("class", "modalBg");
  modalBg.setAttribute("id", "alertModalBg");
  document.getElementById("main").appendChild(modalBg);

  let modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  modal.setAttribute("id", "alertModal");
  modalBg.appendChild(modal);

  let modalText = document.createElement("p");
  modalText.setAttribute("class", "modalText");
  modalText.innerHTML =
    "<h2>Rules</h2><p>A grid is generated with a certain number of bombs to find, depending the difficulty.</p><br /><p>In order to win, the user must guess where the bombs are and flag them all (right click), or uncover (left click) every cell that is not a bomb.</p><br /><p><strong>Easy mode :</strong> the grid size is 8 x 8 ans there are 10 bombs to find</p><br /><p><strong>Normal mode :</strong> the grid size is 16 x 16 ans there are 40 bombs to find</p><br /><p><strong>Difficult mode :</strong> the grid size is 30 x 30 ans there are 150 bombs to find</p>";
  modal.appendChild(modalText);

  let modalButton = document.createElement("button");
  modalButton.setAttribute("class", "modalButton");
  modalButton.innerText = "OK";
  modalButton.addEventListener("click", removeModal);
  modal.appendChild(modalButton);

  function removeModal() {
    modalBg.remove();
  }
}

export {
  newGame,
  createGrid,
  createRow,
  createCell,
  createBomb,
  getBombs,
  setBombCoordinates,
  alertModal,
  rulesModal,
};
