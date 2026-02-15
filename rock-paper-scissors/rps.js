const playerScoreEl = document.querySelector(".player-score");
const playerChoiceEl = document.querySelector(".player-choice");
const computerScoreEl = document.querySelector(".computer-score");
const computerChoiceEl = document.querySelector(".computer-choice");
const resultEl = document.querySelector(".result");
const resetBtn = document.querySelector(".reset");
const choices = document.querySelectorAll(".choice");
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  const rand = Math.floor(Math.random() * 3);
  return choices[rand];
}

function playRound(playerChoice) {
  if (gameOver) {
    return;
  }

  const computerChoice = getComputerChoice();
  playerChoiceEl.textContent = playerChoice;
  computerChoiceEl.textContent = computerChoice;

  if (playerChoice === computerChoice) {
    resultEl.textContent = `It's a tie! ${playerChoice} ties ${computerChoice}`;
  } else if (
    (playerChoice === "Rock" && computerChoice == "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    resultEl.textContent = `You won the round! ${playerChoice} beats ${computerChoice}`;
    playerScore++;
    playerScoreEl.textContent = playerScore;
  } else {
    resultEl.textContent = `You lost the round! ${computerChoice} beats ${playerChoice}`;
    computerScore++;
    computerScoreEl.textContent = computerScore;
  }

  checkWinner();
}

function checkWinner() {
  if (playerScore === 5) {
    resultEl.textContent = "You won the game!";
    gameOver = true;
  } else if (computerScore === 5) {
    resultEl.textContent = "You lost the game!";
    gameOver = true;
  }
}

function resetGame() {
  gameOver = false;
  playerScore = 0;
  playerScoreEl.textContent = playerScore;
  playerChoiceEl.textContent = "-";
  computerScore = 0;
  computerScoreEl.textContent = computerScore;
  computerChoiceEl.textContent = "-";
  resultEl.textContent = "Click on choices to start playing";
}

resetBtn.onclick = resetGame;

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    playRound(choice.textContent);
  });
});
