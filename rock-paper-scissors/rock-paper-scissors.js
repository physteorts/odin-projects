const playerChoices = document.querySelectorAll(".choice");
const resultEl = document.querySelector(".result");
const playerChoiceEl = document.querySelector(".player-choice");
const computerChoiceEl = document.querySelector(".computer-choice");
const playerScoreEl = document.querySelector(".player-score");
const computerScoreEl = document.querySelector(".computer-score");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".title");
const modalMessage = document.querySelector(".message");
const playAgainBtn = document.querySelector(".play-again");
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

playerChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    playGame(choice.textContent);
  });
});

playAgainBtn.addEventListener("click", () => {
  modal.style.display = "none";
  resetGame();
});

function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  const rand = Math.floor(Math.random() * 3);
  return choices[rand];
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  playerChoiceEl.textContent = playerChoice;
  computerChoiceEl.textContent = computerChoice;
  if (playerChoice === computerChoice) {
    resultEl.textContent = `It's a tie! ${playerChoice} ties ${computerChoice}.`;
  } else if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    playerScore++;
    resultEl.textContent = `You won the round! ${playerChoice} beats ${computerChoice}.`;
    playerScoreEl.textContent = playerScore;
  } else {
    computerScore++;
    resultEl.textContent = `You lost the round! ${computerChoice} beats ${playerChoice}.`;
    computerScoreEl.textContent = computerScore;
  }

  if (playerScore === 5) {
    showModal("Victory!", "You dominated the computer and took the crown.");
    gameOver = true;
  } else if (computerScore === 5) {
    showModal("Defeat", "The computer outsmarted you this time.");
    gameOver = true;
  }
}

function playGame(playerChoice) {
  if (gameOver) {
    return;
  } else {
    playRound(playerChoice);
  }
}

function showModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.style.display = "flex";
}

function resetGame() {
  gameOver = false;
  computerScore = 0;
  computerScoreEl.textContent = computerScore;
  computerChoiceEl.textContent = "-";
  playerScore = 0;
  playerScoreEl.textContent = playerScore;
  playerChoiceEl.textContent = "-";
  resultEl.textContent = "Choose your move to begin!";
}
