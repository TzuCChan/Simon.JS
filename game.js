const startButton = document.querySelector('.start');
const counter = document.querySelector('.round-counter');
const restartButton = document.querySelector('.restart');
const topLeft = document.querySelector('.top-left');
const topRight = document.querySelector('.top-right');
const bottomRight = document.querySelector('.bottom-right');
const bottomLeft = document.querySelector('.bottom-left');
const grid = Array.from(document.querySelectorAll('.grid'))
const score = document.querySelector('.score')
const endInfo = document.querySelector('.end-info');
const finalScore = document.querySelector(".final-score")

let isGameOn = false;
let canClick = false;
let sequence = [randomPanel()];
let sequenceToGuess = [...sequence];
let currentScore = 1;

function startGame() {
  startButton.style.display = "none";
  counter.style.display = "inline";
  restartButton.style.display = "inline";
  endInfo.style.display = "none";
  grid.forEach(element => {
    element.style.cursor = "pointer";
  })
  score.innerText = 1;
  isGameOn = true;
  flashingStart();
};
startButton.addEventListener('click', startGame);

function restartGame() {
  startButton.style.display = "inline";
  counter.style.display = "none";
  restartButton.style.display = "none";
  grid.forEach(element => {
    element.style.cursor = "default";
  })
  isGameOn = false;
  canClick = false;
  sequence = [randomPanel()];
  sequenceToGuess = [...sequence];
  endInfo.style.display = "inline";
  finalScore.innerText = (currentScore - 1);
  currentScore = 1;
}
restartButton.addEventListener('click', restartGame);

function randomPanel() {
  return grid[parseInt(Math.random() * grid.length)];
}

const flash = panel => {
  return new Promise(resolve => {
    panel.className += ' white';
    setTimeout(() => {
      panel.className = panel.className.replace(
        ' white',
        ''
      );
      setTimeout(() => {
        resolve();
      }, 250);
    }, 500)
  });
};

const flashingStart = async () => {
  canClick = false;
  for (const panel of sequence) {
    if (isGameOn) {
      await flash(panel);
    }
  }
  canClick = true;
}

const panelClicked = panelClicked => {
  if (!canClick || !isGameOn) return;
  const expectedPanel = sequenceToGuess.shift();
  if (expectedPanel === panelClicked.target) {
    if (sequenceToGuess.length === 0) {
      currentScore += 1;
      score.innerText = currentScore;
      sequence.push(randomPanel());
      sequenceToGuess = [...sequence];
      flashingStart();
    }
  } else {
    restartGame();
  }
}

grid.forEach(element => {
  element.addEventListener('click', panelClicked);
})