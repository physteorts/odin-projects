const playerChoices = document.querySelectorAll(".choice");
const resetBtn = document.querySelector(".reset");
const resultEl = document.querySelector(".result");
const playerChoiceEl = document.querySelector(".player-choice");
const computerChoiceEl = document.querySelector(".computer-choice");
const playerScoreEl = document.querySelector(".player-score");
const computerScoreEl = document.querySelector(".computer-score");
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

playerChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    playGame(choice.textContent);
  });
});

resetBtn.addEventListener("click", resetGame);

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
    resultEl.textContent = "You won the game!";
    gameOver = true;
  } else if (computerScore === 5) {
    resultEl.textContent = "You lost the game!";
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

function resetGame() {
  gameOver = false;
  computerScore = 0;
  computerScoreEl.textContent = computerScore;
  computerChoiceEl.textContent = "";
  playerScore = 0;
  playerScoreEl.textContent = playerScore;
  playerChoiceEl.textContent = "";
  resultEl.textContent = "First one to reach the 5 score points wins the game!";
}
