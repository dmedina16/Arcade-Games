const WORDBANK = ["block", "width", "craft", "board", "bored", "quick",
	"ahead", "flood", "alien", "great", "ghast", "track", "trust", "shirt",
	"shame", "champ", "chimp", "chomp", "blimp", "sheet", "fleet", "sleek",
	"lobby", "snake", "build", "prowl", "while", "white", "apple", "beach",
	"charm", "dance", "eager", "flame", "grape", "happy", "igloo", "jelly",
	"knife", "lemon", "mango", "noble", "ocean", "piano", "queen", "robin",
	"smile", "toast", "umbra", "vital", "water", "yacht", "zebra", "ankle",
	"badge", "cloud", "drift", "empty", "fancy", "glide", "horse", "index",
	"joker", "kiosk", "lunar", "music", "nymph", "oasis", "pixel", "quiet",
	"rhyme", "sneak", "table", "unity", "vigor", "waltz", "xerox", "young",
	"zealot", "align", "blink", "crisp", "daisy", "evoke", "fudge", "grind",
	"hazel", "image", "joust", "karma", "leech", "mirth", "novel", "opera",
	"pouch", "quilt", "round", "swoop", "tease", "ultra", "vibes", "whale",
	"feast", "yield", "zesty", "adapt", "blend", "charm", "dandy", "essay",
	"flirt", "gears", "heist", "inert", "jaded", "knack", "lunch", "mural",
	"noble", "ordeal", "pluto", "quirk", "renew", "stall", "trick", "utopia",
	"verse", "whirl", "xylon", "youth", "zoned"];

let randomWord = WORDBANK[Math.floor(Math.random() * WORDBANK.length)];
console.log(randomWord);

let gameActive = true;
let currentGuessIndex = 0;
let guessCount = 0;
let wordGuess = "";
let randomWordCopy = randomWord; 

function id(id) {
	return document.getElementById(id);
}

function qs(selector) {
	return document.querySelector(selector);
}

function qsa(selector) {
	return document.querySelectorAll(selector);
}

document.addEventListener('DOMContentLoaded', assignEvents);

function assignEvents() {
	let keyCellArray = qsa('.keyboard-key-tile');
	for (let i = 0; i < keyCellArray.length; i++) {
		if (!keyCellArray[i].classList.contains('restartButton') &&
			!keyCellArray[i].classList.contains('theme-button')) {
			keyCellArray[i].addEventListener('click', buttonclick);
		}
	}
	id('restartButton').addEventListener('click', restartGame);
	id('theme-button').addEventListener('click', switchTheme);
}

function switchTheme() {
	let guessCellArray = qsa('.guess-letter-tile');
	let screen = id("main");

	if (screen.classList.contains("dark-theme")) {
		screen.classList.replace("dark-theme", "light-theme");
		for (let i = 0; i < guessCellArray.length; i++) {
			guessCellArray[i].style.color = "black";
		}
	} else if (screen.classList.contains("light-theme")){
		screen.classList.replace("light-theme", "green-theme");
		for (let i = 0; i < guessCellArray.length; i++) {
			guessCellArray[i].style.color = "white";
		}
	} else {
		screen.classList.replace("green-theme", "dark-theme");
	}
}

function buttonclick(keyClicked) {
	let guessCellArray = qsa('.guess-letter-tile');
	if (gameActive) {
		let guessCell = keyClicked.target;
		if (guessCell.getAttribute("key-index") === "BACKSPACE") {
			if (wordGuess.length !== 0) {
				guessCellArray[currentGuessIndex - 1].innerText = "";
				currentGuessIndex--;
				wordGuess = wordGuess.replace(/.$/, '');
			}
		} else if (guessCell.getAttribute("key-index") === "ENTER") {
			if (wordGuess.length === 5) {
				guessCell++;
				randomWordCopy = randomWord;
				checkGuess();
				wordGuess = "";
				guessCount++;
			}
		} else if (wordGuess.length == 5) {
		} else {
			guessCellArray[currentGuessIndex].innerText = guessCell.getAttribute("key-index");
			currentGuessIndex++;
			wordGuess += guessCell.getAttribute("key-index").toLowerCase();
		}
	}
}

function restartGame() {
	gameActive = true;
	wordGuess = "";
	randomWord = WORDBANK[Math.floor(Math.random() * WORDBANK.length)];

	restartGuessCells()
	restartKeyboardCells()

	currentGuessIndex = 0;
	guessCount = 0;
	let score = id("score").classList.replace("show-score", "hide-score");
	score.innerText = "";
}

function restartGuessCells() {
	let keyCellArray = qsa('.keyboard-key-tile');
	for (let i = 0; i < keyCellArray.length; i++) {
		if (keyCellArray[i].getAttribute("key-index") !== "ENTER" ||
			keyCellArray[i].getAttribute("key-index") !== "BACKSPACE") {
			keyCellArray[i].classList.remove("correct");
			keyCellArray[i].classList.remove("incorrect");
			keyCellArray[i].classList.remove("exists");
			keyCellArray[i].classList.add("empty");
		}
	}
}

function restartKeyboardCells() {
	let guessCellArray = qsa('.guess-letter-tile');
	for (let i = 0; i < guessCellArray.length; i++) {
		guessCellArray[i].classList.remove("correct");
		guessCellArray[i].classList.remove("incorrect");
		guessCellArray[i].classList.remove("exists");
		guessCellArray[i].classList.add("empty2");
		guessCellArray[i].innerText = "";
	}
}

function checkGuess() {
	if (wordGuess === randomWord) {
		gameWin();
	} else if (guessCount >= 5) {
		gameLose();
	}
	findGuessMatched();
}

function gameWin() {
	let score = id("score");
	score.classList.replace("hide-score", "show-score");
	score.innerText = "You won!";
	score.classList.remove('bounce');
	score.classList.add('bounce');
	gameActive = false;
}

function gameLose() {
	let score = id("score");
	score.classList.replace("hide-score", "show-score");
	score.innerText = "The word was: " + randomWord;
	score.classList.remove('shake');
	score.classList.add('shake');
	gameActive = false;
}

function findGuessMatched() {
	assignGreenTiles();
	assignYellowTiles();
	assignBlackTiles();
}

function assignGreenTiles() {
	for (let i = 0; i < 5; i++) {
		if (wordGuess[i] === randomWord[i]) {
			let guessCell = id((guessCount * 5 + i).toString());
			let guessKey = id(wordGuess[i].toUpperCase());

			guessCell.classList.replace("empty2", "correct");
			guessCell.classList.remove('bounce');
			guessCell.classList.add('bounce');

			let indexToRemove = randomWordCopy.indexOf(wordGuess[i]);
			randomWordCopy = randomWordCopy.substring(0, indexToRemove)
				+ randomWordCopy.substring(indexToRemove + 1);

			if (guessKey.classList.contains("empty")) {
				guessKey.classList.replace("empty", "correct");
			}
			else if (guessKey.classList.contains("exists")) {
				guessKey.classList.replace("exists", "correct");
			}
		}
	}
}

function assignYellowTiles() {
	for (let i = 0; i < 5; i++) {
		if (randomWordCopy.includes(wordGuess[i])) {
			let guessCell = id((guessCount * 5 + i).toString());
			let guessKey = id(wordGuess[i].toUpperCase());

			guessCell.classList.replace("empty2", "exists");
			if (guessKey.classList.contains("empty")) {
				guessKey.classList.replace("empty", "exists");
			}
			let indexToRemove = randomWordCopy.indexOf(wordGuess[i]);
			randomWordCopy = randomWordCopy.substring(0, indexToRemove)
				+ randomWordCopy.substring(indexToRemove + 1);
		}
	}
}

function assignBlackTiles() {
	for (let i = 0; i < 5; i++) {
		let guessCell = id((guessCount * 5 + i).toString());
		let guessKey = id(wordGuess[i].toUpperCase());
		
		guessCell.classList.replace("empty2", "incorrect");
		if (guessKey.classList.contains("empty")) {
			guessKey.classList.replace("empty", "incorrect");
		}
	}
}
