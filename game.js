const startButton = document.querySelector('.start');
const restartButton = document.querySelector('.restart');
const counter = document.querySelector('.round-counter');
const topLeft = document.querySelector('.top-left');
const topRight = document.querySelector('.top-right');
const bottomLeft = document.querySelector('.bottom-left');
const bottomRight = document.querySelector('.bottom-right');
const score = document.querySelector('.score');
const finalScore = document.querySelector(".final-score");
const endInfo = document.querySelector('.end-info');
const grid = Array.from(document.querySelectorAll('.grid'));

let isGameOn = false;
let canClick = false;
let sequence = [randomPanel()];
let sequenceToGuess = [...sequence];
let currentScore = 1;

function startGame() {
  startButton.computedStyleMap.display = "none";
  counter.computedStyleMap.display = "inline";
  restartButton.computedStyleMap.display = "inline";
  endInfo.computedStyleMap.display = "none";
  grid.forEach(element => {
    element.computedStyleMap.cursor = "pointer";
  })
  score.innerText = 1;
  isGameOn = true;
  flashingStart();
};