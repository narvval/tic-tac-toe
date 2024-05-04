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
    else {
      return 'invalid';
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
  let gameWinner = 'none';

  const getRound = () => round;
  const getTurn = () => turn;
  const getGameWinner = () => gameWinner;
  const isActive = () => active;

  const checkForWinner = function() {
		let winner = gameboard.getWinner(); // gameboard.getWinner() will return 'X', 'O' or 'none'
		if (winner != 'none') { // Will get 'X' or 'O'
			if (winner === 'X') {
        gameWinner = playerOne.name;
        return gameWinner;
      }
      else {
        gameWinner = playerTwo.name;
        return gameWinner;

      }
		} else {
			if (round === 9) {
				gameWinner = 'tie'; // All tiles are filled, but there is no winner
				return gameWinner;
			} else {
				gameWinner = 'none'; // Not all tiles are filled, game should continue
				return gameWinner;
			}
		}
	}
  
  const play = function (index) {
		if (active === true) { // Ensure game is active. Else, do nothing.

			playerMove = gameboard.updateArray(index, turn);

      if (playerMove != 'invalid') { // If there is an attempt to override an index, nothing will happen
        // Check for win: will get 'X', 'O', 'tie' or 'none'
        let winner = checkForWinner();
        if (winner === 'none') { // If there is no winner, the game must continue (increase round, change turn) 
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

		}
	};

  const resetGame = function () {
    gameboard.resetArray();
    round = 0;
    turn = 1;
    active = true;
  };



  return { getRound, getTurn, getGameWinner, isActive, checkForWinner, play, resetGame }

})()

// PLAYER Object Factory
const newPlayer = function(name, number) {
  return { name, number }
}

// Initialize 2 Player Objects (there will never be more than two)
playerOne = newPlayer('Player 1', 1);
playerTwo = newPlayer('Player 2', 2);




///////////////////////////////////////////////////////////////

// Simulate game (check all these actually work)

// // - A GAMEBOARD object is automatically created:
// console.log('Game array is initially: ' + gameboard.getGameArray())

// // - A GAME object is automatically created. 
// console.log('Game active: ' + game.isActive())
// console.log('Round: ' + game.getRound());
// console.log('It is player ' + game.getTurn() + '\'s turn');
// console.log('Winner is ' + game.checkForWinner())

// // - 2 PLAYER objects are automatically created. 
// console.log(playerOne.name + ' is ' + playerOne.number + 'st');
// console.log(playerTwo.name + ' is ' + playerTwo.number + 'nd');



// // 0 - Users are asked to choose their names:
// playerOne.name = 'Nico'
// playerTwo.name = 'The Devil'
// console.log(playerOne.name + ': ' + playerOne.number);
// console.log(playerTwo.name + ': ' + playerTwo.number);


// // 2 - Player (whose turn it is) chooses an index on the board to place his TOKEN 
// game.play(5)

// // 3 - GAMEBOARD array is updated so that the chosen INDEX is filled in
// console.log('Array has been updated: ' + gameboard.getGameArray());

// // 4 - GAME's TURN is updated, so it is now the other player's turn
// console.log('It is now Round ' + game.getRound() + ' and it is player ' + game.getTurn() + '\'s turn');

// // 2 - Player (whose turn it is) chooses an index on the board to place his TOKEN 
// game.play(2)

// // 3 - GAMEBOARD array is updated so that the chosen INDEX is filled in
// console.log('Array has been updated: ' + gameboard.getGameArray());

// // 4 - GAME's TURN is updated, so it is now the other player's turn
// console.log('It is now Round ' + game.getRound() + ' and it is player ' + game.getTurn() + '\'s turn');


// game.resetGame();

// game.play(4);
// console.log(gameboard.getGameArray());

// game.play(2);
// game.play(7);
// game.play(1);
// game.play(0);
// game.play(8);
// game.play(3);
// game.play(5);
// game.play(6);

// console.log('Game array is: ');
// console.log(gameboard.getGameArray());
// console.log('Game active: ' + game.isActive());
// console.log('Round: ' + game.getRound());
// console.log('It is player ' + game.getTurn() + "'s turn");
// console.log('Winner is ' + game.checkForWinner());
