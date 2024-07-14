import {
  newGame,
  createGrid,
  createRow,
  createCell,
  createBomb,
  getBombs,
  setBombCoordinates,
  alertModal,
  rulesModal,
} from "./js/functions.js";

const difficulties = {
  easy: {
    dimensions: 8,
    bombs: 10,
  },
  medium: {
    dimensions: 16,
    bombs: 40,
  },
  hard: {
    dimensions: 30,
    bombs: 150,
  },
};
let selectedDifficulty = null;

const difficulty = document.getElementById("difficulty");
const newGameButton = document.getElementById("newGameButton");
const resetButton = document.getElementById("resetButton");
difficulty.addEventListener("change", (e) => {
  selectedDifficulty = difficulties[e.target.value];
});
newGameButton.addEventListener("click", () => {
  newGame(selectedDifficulty);
  difficulty.value = null;
  selectedDifficulty = null;
});
resetButton.addEventListener("click", () => {
  newGame(selectedDifficulty);
});

document.getElementById("info").addEventListener("click", () => {
  rulesModal();
});
