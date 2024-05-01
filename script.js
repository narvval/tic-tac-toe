array = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

const slots = 9;

// Create a function to create PLAYER objects 
function newPlayer(name, turn, choice) {

  return { name, turn, choice };
}

// Create a function to create a GAMEBOARD object (IIFE)
const gameboard = (function() {
  let array = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];

  const winner = () => checkForWin(array);

  const getArray = () => array;

  const updateArray = function(index, choice) {
    if (array[index] === '_') {
      array[index] = choice;
    }
  }

  return { getArray, updateArray, winner };
})()

// Create two new PLAYERs
playerOne = newPlayer('Nico', true, 'X');
playerTwo = newPlayer('Kita', false, 'O');

// Have them play a game
gameboard.updateArray(0, 'X');
gameboard.updateArray(5, 'O');
gameboard.updateArray(6, 'X');
gameboard.updateArray(8, 'O');
gameboard.updateArray(1, 'X');
gameboard.updateArray(8, 'O');
gameboard.updateArray(2, 'X');

console.log(gameboard.getArray())
console.log('Winner is ' + gameboard.winner())


// // Obtain an array of random numbers from 0 to 8
// function getRandomArray() {
// 	numbers = [];
//   while (numbers.length < slots) {
//     number = Math.floor(Math.random() * slots);
//     if (numbers.includes(number) === false) {
//       numbers.push(number);
//     }
//   }
//   return numbers;
// };


// Check for win (3 in a row)
function checkForWin(array) {
  if (array[0] !== '_' && array[0] === array[1] && array[1] === array[2]) {
    return array[0];
  }
  else if (array[3] !== '_' && array[3] === array[4] && array[4] === array[5]) {
		return array[3];
	} else if (array[6] !== '_' && array[6] === array[7] && array[7] === array[8]) {
		return array[6];
	} else if (array[0] !== '_' && array[0] === array[3] && array[3] === array[6]) {
		return array[0];
	} else if (array[1] !== '_' && array[1] === array[4] && array[4] === array[7]) {
		return array[1];
	} else if (array[2] !== '_' && array[2] === array[5] && array[5] === array[8]) {
		return array[2];
	} else if (array[0] !== '_' && array[0] === array[4] && array[4] === array[8]) {
		return array[0];
	} else if (array[2] !== '_' && array[2] === array[4] && array[4] === array[6]) {
		return array[2];
	} else return false;
}


// randomArray = getRandomArray();

// for (i = 0; i < slots; i++) {
//   winCheck = checkForWin(array)
//   if (winCheck != false) {
//     console.log('Player ' + winCheck + ' wins');
//     break;
//   };

//   if (i % 2 === 0) {
//     array[randomArray[i]] = 'X';
//     continue;
//   }
//   else if (i % 2 != 0) {
// 		array[randomArray[i]] = 'O';
//     continue;
// 	}
//   if (winCheck === false) {
//     console.log('It\'s a tie')
//   }
// }



// console.log(array)

