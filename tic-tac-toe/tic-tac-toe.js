const Player = (name, marker) => {
  return { name, marker };
};

const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const placeMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, placeMarker, resetBoard };
})();

const GameController = (() => {
  const playerOne = Player("Player 1", "X");
  const playerTwo = Player("Player 2", "O");
  let activePlayer = playerOne;
  let gameOver = false;

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const getActivePlayer = () => activePlayer;

  const getGameOver = () => gameOver;

  const checkWinner = () => {
    const board = Gameboard.getBoard();
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((condition) => {
      return condition.every((index) => board[index] === activePlayer.marker);
    });
  };

  const playRound = (index) => {
    if (gameOver) return;

    if (Gameboard.placeMarker(index, activePlayer.marker)) {
      if (checkWinner()) {
        gameOver = true;
        return "win";
      }
      if (Gameboard.getBoard().every((cell) => cell !== "")) {
        gameOver = true;
        return "tie";
      }
      switchPlayerTurn();
      return;
    }

    return "invalid";
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    activePlayer = playerOne;
    gameOver = false;
  };

  return { playRound, getActivePlayer, getGameOver, resetGame };
})();

const DisplayController = (() => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.querySelector("p");
  const resetBtn = document.querySelector(".reset");

  const updateScreen = () => {
    const board = Gameboard.getBoard();
    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      cell.classList.remove("player1", "player2");
      if (board[index] === "X") cell.classList.add("player1");
      if (board[index] === "O") cell.classList.add("player2");
    });
  };

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (GameController.getGameOver()) return;

      const result = GameController.playRound(index);

      if (result === "invalid") return;

      updateScreen();

      if (result === "win") {
        statusText.textContent = `${GameController.getActivePlayer().name} Wins!`;
      } else if (result === "tie") {
        statusText.textContent = "It's a Tie!";
      } else {
        statusText.textContent = `${GameController.getActivePlayer().name}'s move`;
      }
    });
  });

  resetBtn.addEventListener("click", () => {
    GameController.resetGame();
    statusText.textContent = `${GameController.getActivePlayer().name}'s move`;
    updateScreen();
  });
})();
