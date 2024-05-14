// GAMEBOARD IIFE Object
const gameboard = (function () {
	let gameArray = Array.from('_'.repeat(9));

	const getGameArray = () => gameArray;

	const updateArray = function (index, token) {
		if (gameArray[index] != 'X' && gameArray[index] != 'O') {
			if (token === 1) {
				gameArray[index] = 'X';
			} else if (token === 2) {
				gameArray[index] = 'O';
			}
		} else {
			return 'invalid';
		}
	};

	const resetArray = function () {
		gameArray = Array.from('_'.repeat(9)); // Any way of avoiding this repetition?
	};

	// Check for win (3 in a row)
	let getWinner = function () {
		if (
			gameArray[0] !== '_' &&
			gameArray[0] === gameArray[1] &&
			gameArray[1] === gameArray[2]
		) {
			return gameArray[0];
		} else if (
			gameArray[3] !== '_' &&
			gameArray[3] === gameArray[4] &&
			gameArray[4] === gameArray[5]
		) {
			return gameArray[3];
		} else if (
			gameArray[6] !== '_' &&
			gameArray[6] === gameArray[7] &&
			gameArray[7] === gameArray[8]
		) {
			return gameArray[6];
		} else if (
			gameArray[0] !== '_' &&
			gameArray[0] === gameArray[3] &&
			gameArray[3] === gameArray[6]
		) {
			return gameArray[0];
		} else if (
			gameArray[1] !== '_' &&
			gameArray[1] === gameArray[4] &&
			gameArray[4] === gameArray[7]
		) {
			return gameArray[1];
		} else if (
			gameArray[2] !== '_' &&
			gameArray[2] === gameArray[5] &&
			gameArray[5] === gameArray[8]
		) {
			return gameArray[2];
		} else if (
			gameArray[0] !== '_' &&
			gameArray[0] === gameArray[4] &&
			gameArray[4] === gameArray[8]
		) {
			return gameArray[0];
		} else if (
			gameArray[2] !== '_' &&
			gameArray[2] === gameArray[4] &&
			gameArray[4] === gameArray[6]
		) {
			return gameArray[2];
		} else return 'none';
	};

	return { getGameArray, updateArray, resetArray, getWinner };
})();

// GAME IIFE Object
const game = (function () {
	let round = 0; // Will never be > 8
	let turn = 1; // Will always be 1 or 2 (for each Player)
	let active = true;
	let gameWinner = 'none'; // 'none', 'tie', 'playerOne' or 'playerTwo'

	const getTurn = () => turn;
	const getGameWinner = () => gameWinner;
	const isActive = () => active;

	const checkForWinner = function () {
		let winner = gameboard.getWinner(); // will get 'X', 'O' or 'none'
		if (winner != 'none') {
			// Will get 'X' or 'O'
			if (winner === 'X') {
				gameWinner = 'playerOne';
				return gameWinner;
			} else {
				gameWinner = 'playerTwo';
				return gameWinner;
			}
		} else {
			if (round === 8) {
				gameWinner = 'tie'; // All tiles are filled, but there is no winner
				return gameWinner;
			} else {
				gameWinner = 'none'; // Not all tiles are filled, game should continue
				return gameWinner;
			}
		}
	};

	const play = function (index) {
		// Ensure game is active. Else, do nothing.
		if (active === true) {
			playerMove = gameboard.updateArray(index, turn);

			// If there is an attempt to override an index, nothing will happen
			if (playerMove != 'invalid') {
				// Check for win: will get 'X', 'O', 'tie' or 'none'
				let winner = checkForWinner();

				// If there is no winner and there are still empty slots, the game must continue (increase round, change turn)
				if (winner === 'none' && round < 8) {
					round++;
					if (turn === 1) {
						turn = 2;
					} else {
						turn = 1;
					}
				} else {
					// If there is a winner, or if there no more empty slots, game must be set to inactive and the winner must be announced
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

	return {
		getTurn,
		getGameWinner,
		isActive,
		checkForWinner,
		play,
		resetGame,
	};
})();

// PLAYER Object Factory
const newPlayer = function (name, number) {
	return { name, number };
};

// Initialize 2 Player Objects (there will never be more than two)
playerOne = newPlayer('Player 1', 1);
playerTwo = newPlayer('Player 2', 2);


const updateBoardSquares = (function () {
	const cells = document.querySelectorAll('.cell');
	const playerContainers = document.querySelectorAll('.player-container');

	cells.forEach((cell) => {
		cell.addEventListener('click', () => {
			// Ensure game is active and cell is empty, else do nothing
			if (game.isActive() === true && cell.classList.contains('empty')) {
				// Identify the index of the cell
				const cellIndex = cell.classList[1].replace(/^\D+/g, '');

				// Remove the 'empty' class
				cell.classList.remove('empty');

				// Identify which player's turn it is and update board accordingly
				if (game.getTurn() === 1) {
					createToken('player-one', cell);
				} else {
					createToken('player-two', cell);
				}
				// Toggle active/inactive for Player Status
				playerContainers.forEach((container) => {
					container.classList.toggle('inactive');
				});

				// Play the game
				game.play(cellIndex);

				// Alert if there has been a winner
				winner = game.getGameWinner();
				if (winner != 'none') {
					triggerModal.openModal(winner);
				} 
			}
		});
	});

	return { cells };
})();

const resetBoard = (function () {
	const gameBtn = document.querySelector('.game-btn');
	const playerOneStatus = document.querySelector('.player-container-one');
	const playerTwoStatus = document.querySelector('.player-container-two');

	gameBtn.addEventListener('click', () => {
		// Reset game
		game.resetGame();
		// Clear board (DOM)
		updateBoardSquares.cells.forEach((cell) => {
			cell.classList.add('empty');
			cell.innerHTML = '';
		});
		// Put focus on "Player 1"
		playerOneStatus.classList.remove('inactive');
		playerTwoStatus.classList.add('inactive');
	});
})();

function createToken(player, parent) {
	const div = document.createElement('div');
	div.classList.add(player);
	parent.appendChild(div);
}

const triggerModal = (function() {
	const modal = document.querySelector('.modal');
	const modalIcon = document.querySelector('.modal-icon');
	const modalMessage = document.querySelector('.modal-message');
	const overlay = document.querySelector('.overlay');
	const closeBtn = document.querySelector('.modal-close-btn');

	closeBtn.addEventListener('click', () => {
		closeModal();
	});

	const openModal = function(winner) {
		modal.classList.add('active');
		overlay.classList.add('active');

		if (winner === 'playerOne') {
			modalIcon.classList.add('player-one');
			modalMessage.innerText = 'Player One has won!';
		} else if (winner === 'playerTwo') {
			modalIcon.classList.add('player-two');
			modalMessage.innerText = 'Player Two has won!';
		} else if (winner === 'tie') {
			modalIcon.classList.add('tie');
			modalMessage.classList.add('modal-message-tie');
			modalMessage.innerText = "It's a tie!";
		}
	};

	const closeModal = function () {
		modal.classList.remove('active');
		overlay.classList.remove('overlay');
		modalMessage.innerText = '';
		modalIcon.classList.remove('player-one');
		modalIcon.classList.remove('player-two');
		modalIcon.classList.remove('tie');
		modalMessage.classList.remove('modal-message-tie');
	};

	return { openModal };
})()
