// GAMEBOARD IIFE Object Creator
const gameboard = (function() {
	let gameArray = Array.from('_'.repeat(9));

	const getGameArray = () => gameArray;

	const updateArray = function (index, token) {
		if (gameArray[index] != 'X' && gameArray[index] != 'O') {
			if (token === 1) {
				gameArray[index] = 'X';
			} else if (token === 2) {
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


const game = (function(){
  let round = 0;
  let win = false;
  let turn = 1;
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

  const isGameEnd = function() {
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
  

  return { getRound, nextRound, getTurn, nextTurn, resetGame, checkForWin, isGameEnd }

})()






////////////////////////////////////////////////////////////////////


// // Create a function to create PLAYER objects 
// function newPlayer(name, number) {

//   return { name, number };
// }

// // Create a function to create a GAMEBOARD object (IIFE)
// const gameboard = (function() {
//   let array = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

//   const winner = () => checkForWin(array);

//   const getArray = () => array;

//   const updateArray = function(index, choice) {
//     if (array[index] === '_') {
//       array[index] = choice;
//     }
//   }

//   return { getArray, updateArray, winner };
// })()

// const game

// // Create two new PLAYERs
// playerOne = newPlayer('Nico', true, 'X');
// playerTwo = newPlayer('Kita', false, 'O');

// // Have them play a game
// gameboard.updateArray(0, 'X');
// gameboard.updateArray(5, 'O');
// gameboard.updateArray(6, 'X');
// gameboard.updateArray(8, 'O');
// gameboard.updateArray(1, 'X');
// gameboard.updateArray(8, 'O');
// gameboard.updateArray(2, 'X');

// console.log(gameboard.getArray())
// console.log('Winner is ' + gameboard.winner())

// // Check for win (3 in a row)
// function checkForWin(array) {
//   if (array[0] !== '_' && array[0] === array[1] && array[1] === array[2]) {
//     return array[0];
//   }
//   else if (array[3] !== '_' && array[3] === array[4] && array[4] === array[5]) {
// 		return array[3];
// 	} else if (array[6] !== '_' && array[6] === array[7] && array[7] === array[8]) {
// 		return array[6];
// 	} else if (array[0] !== '_' && array[0] === array[3] && array[3] === array[6]) {
// 		return array[0];
// 	} else if (array[1] !== '_' && array[1] === array[4] && array[4] === array[7]) {
// 		return array[1];
// 	} else if (array[2] !== '_' && array[2] === array[5] && array[5] === array[8]) {
// 		return array[2];
// 	} else if (array[0] !== '_' && array[0] === array[4] && array[4] === array[8]) {
// 		return array[0];
// 	} else if (array[2] !== '_' && array[2] === array[4] && array[4] === array[6]) {
// 		return array[2];
// 	} else return false;
// }

