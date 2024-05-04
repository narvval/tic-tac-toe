// GAMEBOARD IIFE Object
const gameboard = (function() {
	let gameArray = Array.from('_'.repeat(9));

	const getGameArray = () => gameArray;

	const updateArray = function (index, token) {
    if (game.isActive() === true) { // If game is inactive, do nothing
			if (gameArray[index] != 'X' && gameArray[index] != 'O') {
				if (token === 1) {
					gameArray[index] = 'X';
				} else if (token === 2) {
					gameArray[index] = 'O';
				}
			}
		}
	};

	const resetArray = function () {
		gameArray = Array.from('_'.repeat(9)); // Any way of avoiding this repetition?
	};

  // Check for win (3 in a row)
	let getWinner = function() {
	  if (gameArray[0] !== '_' && gameArray[0] === gameArray[1] && gameArray[1] === gameArray[2]) {
	    return gameArray[0];
	  }
	  else if (gameArray[3] !== '_' && gameArray[3] === gameArray[4] && gameArray[4] === gameArray[5]) {
			return gameArray[3];
		} else if (gameArray[6] !== '_' && gameArray[6] === gameArray[7] && gameArray[7] === gameArray[8]) {
			return gameArray[6];
		} else if (gameArray[0] !== '_' && gameArray[0] === gameArray[3] && gameArray[3] === gameArray[6]) {
			return gameArray[0];
		} else if (gameArray[1] !== '_' && gameArray[1] === gameArray[4] && gameArray[4] === gameArray[7]) {
			return gameArray[1];
		} else if (gameArray[2] !== '_' && gameArray[2] === gameArray[5] && gameArray[5] === gameArray[8]) {
			return gameArray[2];
		} else if (gameArray[0] !== '_' && gameArray[0] === gameArray[4] && gameArray[4] === gameArray[8]) {
			return gameArray[0];
		} else if (gameArray[2] !== '_' && gameArray[2] === gameArray[4] && gameArray[4] === gameArray[6]) {
			return gameArray[2];
		} else return 'none';
	}

	return { getGameArray, updateArray, resetArray, getWinner };
})()

// GAME IIFE Object
const game = (function(){
  let round = 0; // Will never be > 9
  let win = false;
  let turn = 1; // Will always be 1 or 2 (for each Player)
  let active = true;

  const getRound = () => round;
  const nextRound = () => round++;

  const getTurn = () => turn;
  const nextTurn = function() {
    if (turn === 1) {
      turn = 2;
    }
    else {
      turn = 1;
    }
  };

  const isActive = () => active;

  const resetGame = function() {
    gameboard.resetArray();
    round = 0;
    win = false;
    turn = 1;
    active = true;
  };

  const checkForWin = function() {
    if (gameboard.getWinner() === 'none') {
      win = false;
    }
    else {
      win = true;
      active = false; // Stop the game if there is a winner
    }
  };

  const getGameResult = function() {
    if (round === 9) {
      active = false;
      if (checkForWin() === false) {
        return 'tie';
      }
      else {
        return gameboard.getWinner();
      }
      }
    }
  

  return { getRound, nextRound, getTurn, nextTurn, isActive, resetGame, checkForWin, getGameResult }

})()

// PLAYER Object Factory
const newPlayer = function(name, number) {
  return { name, number }
}

// Initialize 2 Player Objects (there will never be more than two)
playerOne = newPlayer('Player 1', 1);
playerTwo = newPlayer('Player 2', 2);

