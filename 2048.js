const GRID_SIZE = 4;
let grid = [];

function id(id) {
	return document.getElementById(id);
}

function startGame() {
	grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
	addRandomTile();
	addRandomTile();
	displayGrid();
}

id('theme-button').addEventListener('click', switchTheme);
function switchTheme() {
	let screen = id("main");

	if (screen.classList.contains("dark-theme")) {
		screen.classList.replace("dark-theme", "light-theme");
	} else if (screen.classList.contains("light-theme")) {
		screen.classList.replace("light-theme", "green-theme");
	} else {
		screen.classList.replace("green-theme", "dark-theme");
	}
}

function addRandomTile() {
	let emptyCells = [];
	for (let i = 0; i < GRID_SIZE; i++) {
		for (let j = 0; j < GRID_SIZE; j++) {
			if (grid[i][j] === 0) {
				emptyCells.push({ row: i, col: j });
			}
		}
	}
	if (emptyCells.length > 0) {
		let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
		grid[row][col] = Math.random() < 0.9 ? 2 : 4;
	}
}

function displayGrid() {
	const gridContainer = id('grid-container');
	gridContainer.innerHTML = '';
	for (let i = 0; i < GRID_SIZE; i++) {
		for (let j = 0; j < GRID_SIZE; j++) {
			const cell = document.createElement('div');
			cell.classList.add('cell');
			cell.innerText = grid[i][j] === 0 ? '' : grid[i][j];
			cell.style.backgroundColor = getTileColor(grid[i][j]);
			gridContainer.appendChild(cell);
		}
	}
}

function getTileColor(value) {
	switch (value) {
		case 2:
			return '#eee4da';
		case 4:
			return '#ede0c8';
		case 8:
			return '#f2b179';
		case 16:
			return '#f59563';
		case 32:
			return '#f67c5f';
		case 64:
			return '#f65e3b';
		case 128:
			return '#edcf72';
		case 256:
			return '#edcc61';
		case 512:
			return '#9c0';
		case 1024:
			return '#33b5e5';
		case 2048:
			return '#09c';
		default: return '#ccc0b3';
	}
}

function move(direction) {
	console.log(direction);
	switch (direction) {
		case 'up':
			moveUp();
			break;
		case 'down':
			moveDown();
			break;
		case 'left':
			moveLeft();
			break;
		case 'right':
			moveRight();
			break;
		default:
			break;
	}
}

function moveUp() {
	let moved = false;
	for (let j = 0; j < GRID_SIZE; j++) {
		for (let i = 1; i < GRID_SIZE; i++) {
			if (grid[i][j] !== 0) {
				let row = i;
				while (row > 0 && (grid[row - 1][j] === 0 || grid[row - 1][j] === grid[row][j])) {
					if (grid[row - 1][j] === 0) {
						grid[row - 1][j] = grid[row][j];
						grid[row][j] = 0;
						row--;
						moved = true;
					} else if (grid[row - 1][j] === grid[row][j]) {
						grid[row - 1][j] *= 2;
						grid[row][j] = 0;
						moved = true;
						break;
					}
				}
			}
		}
	}
	if (moved) {
		addRandomTile();
		displayGrid();
	}
}

function moveDown() {
	let moved = false;
	for (let j = 0; j < GRID_SIZE; j++) {
		for (let i = GRID_SIZE - 2; i >= 0; i--) {
			if (grid[i][j] !== 0) {
				let row = i;
				while (row < GRID_SIZE - 1 && (grid[row + 1][j] === 0 || grid[row + 1][j] === grid[row][j])) {
					if (grid[row + 1][j] === 0) {
						grid[row + 1][j] = grid[row][j];
						grid[row][j] = 0;
						row++;
						moved = true;
					} else if (grid[row + 1][j] === grid[row][j]) {
						grid[row + 1][j] *= 2;
						grid[row][j] = 0;
						moved = true;
						break;
					}
				}
			}
		}
	}
	if (moved) {
		addRandomTile();
		displayGrid();
	}
}

function moveLeft() {
	let moved = false;
	for (let i = 0; i < GRID_SIZE; i++) {
		for (let j = 1; j < GRID_SIZE; j++) {
			if (grid[i][j] !== 0) {
				let col = j;
				while (col > 0 && (grid[i][col - 1] === 0 || grid[i][col - 1] === grid[i][col])) {
					if (grid[i][col - 1] === 0) {
						grid[i][col - 1] = grid[i][col];
						grid[i][col] = 0;
						col--;
						moved = true;
					} else if (grid[i][col - 1] === grid[i][col]) {
						grid[i][col - 1] *= 2;
						grid[i][col] = 0;
						moved = true;
						break;
					}
				}
			}
		}
	}
	if (moved) {
		addRandomTile();
		displayGrid();
	}
}

function moveRight() {
	let moved = false;
	for (let i = 0; i < GRID_SIZE; i++) {
		for (let j = GRID_SIZE - 2; j >= 0; j--) {
			if (grid[i][j] !== 0) {
				let col = j;
				while (col < GRID_SIZE - 1 && (grid[i][col + 1] === 0 || grid[i][col + 1] === grid[i][col])) {
					if (grid[i][col + 1] === 0) {
						grid[i][col + 1] = grid[i][col];
						grid[i][col] = 0;
						col++;
						moved = true;
					} else if (grid[i][col + 1] === grid[i][col]) {
						grid[i][col + 1] *= 2;
						grid[i][col] = 0;
						moved = true;
						break;
					}
				}
			}
		}
	}
	if (moved) {
		addRandomTile();
		displayGrid();
	}
}


startGame();

document.addEventListener('keydown', function (event) {
	switch (event.key) {
		case 'ArrowUp':
			move('up');
			break;
		case 'ArrowDown':
			move('down');
			break;
		case 'ArrowLeft':
			move('left');
			break;
		case 'ArrowRight':
			move('right');
			break;
		default:
			break;
	}
});
