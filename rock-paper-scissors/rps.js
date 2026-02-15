let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const randomNum = Math.floor(Math.random() * 3);
  if (randomNum === 0) {
    return "rock";
  } else if (randomNum === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

function getHumanChoice() {
  const userInput = prompt("Enter your choice (Rock, Paper, Scissors)");
  return userInput.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log(`It's a tie! ${humanChoice} ties ${computerChoice}`);
  } else if (
    (humanChoice === "rock" && computerChoice == "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    console.log(`You won the round! ${humanChoice} beats ${computerChoice}`);
    humanScore++;
  } else {
    console.log(`You lost the round! ${computerChoice} beats ${humanChoice}`);
    computerScore++;
  }
}

function playGame() {
  playRound(getHumanChoice(), getComputerChoice());
  playRound(getHumanChoice(), getComputerChoice());
  playRound(getHumanChoice(), getComputerChoice());
  playRound(getHumanChoice(), getComputerChoice());
  playRound(getHumanChoice(), getComputerChoice());

  if (humanScore > computerScore) {
    console.log("You won the game!");
  } else if (computerScore > humanScore) {
    console.log("You lost game!");
  } else if (humanScore === computerScore) {
    console.log("The game ties!");
  }
}

playGame();
