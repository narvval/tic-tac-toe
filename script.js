// GAMEBOARD IIFE Object
const gameboard = (function() {
	let gameArray = Array.from('_'.repeat(9));

	const getGameArray = () => gameArray;

	const updateArray = function (index, token) {
    if (gameArray[index] != 'X' && gameArray[index] != 'O') {
      if (token === 1) {
        gameArray[index] = 'X';
      } 
      else if (token === 2) {
        gameArray[index] = 'O';
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
  let turn = 1; // Will always be 1 or 2 (for each Player)
  let active = true;

  const getRound = () => round;
  const getTurn = () => turn;
  const isActive = () => active;
  
  const checkForWinner = function() {
		let winner = gameboard.getWinner(); // gameboard.getWinner() will return 'X', 'O' or 'none'
		if (winner != 'none') {
			return winner; // Will get 'X' or 'O'
		} else {
			if (round === 9) {
				return 'tie'; // All tiles are filled, but there is no winner
			} else {
				return 'none'; // Not all tiles are filled, game should continue
			}
		}
	}
  
  const play = function (index) {
		if (active === true) { // Ensure game is active. Else, do nothing.

			gameboard.updateArray(index, turn);

			// Check for win: will get 'X', 'O', 'tie' or 'none'
			let winner = checkForWinner();
      if (winner != 'none') { // If there is no winner, the game must continue (increase round, change turn) 
				round++;
        if (turn === 1) {
          turn = 2;
        }
        else {
          turn = 1;
        }
			}
      else { // If there is a winner, game must be set to inactive and the winner must be announced
        active = false;
        return winner;
      }
		}
	};

  const resetGame = function () {
    gameboard.resetArray();
    round = 0;
    turn = 1;
    active = true;
  };



  return { getRound, getTurn, isActive, checkForWinner, play, resetGame }

})()

// PLAYER Object Factory
const newPlayer = function(name, number) {
  return { name, number }
}

// Initialize 2 Player Objects (there will never be more than two)
playerOne = newPlayer('Player 1', 1);
playerTwo = newPlayer('Player 2', 2);

// Simulate game (check all these actually work)

// - A GAMEBOARD object is automatically created:
console.log('Game array is initially: ' + gameboard.getGameArray())

// - A GAME object is automatically created. It may have:
console.log('Game active: ' + game.isActive())
console.log('Round: ' + game.getRound());
console.log('It is player ' + game.getTurn() + '\'s turn');
console.log('Win status: ' + game.checkForWin());

// - 2 PLAYER objects are automatically created. 
console.log(playerOne.name + ' is ' + playerOne.number + 'st');
console.log(playerTwo.name + ' is ' + playerTwo.number + 'nd');



// 0 - Users are asked to choose their names:
playerOne.name = 'Nico'
playerTwo.name = 'The Devil'
console.log(playerOne.name + ': ' + playerOne.number);
console.log(playerTwo.name + ': ' + playerTwo.number);

// 1 - the user prompts the start of the GAME (when working on HTML, this will prompt the appearance of the gameboard DISPLAY)

// 2 - Player (whose turn it is) is prompted to choose an index on the board to place his TOKEN

// 3 - GAMEBOARD array is updated so that the chosen INDEX is filled in with the player's TOKEN (X for TURN 1, O for TURN 2)

// 4 - GAME's TURN is updated, so it is now the other player's turn

// 5 - the GAME checks for a WINNER
//     - if there is a winner, return who it is
//         - game is automatically stopped
//     - if there is no winner, continue3

// 6  - the GAME adds +1 to its ROUND count
//     - if round === 9, STOP THE GAME (game.active = false)
//         - if there is a WINNER, return who it is
//         - else, return tie
//     - if round < 9, continue playing (step 2)