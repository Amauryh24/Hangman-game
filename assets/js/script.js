import { dictionnaire } from "./dictionnaire.js";

let wordToGuess;
let wordToDisplay = [];
let memoryLetters = [];
let wordToDisplayElement = document.getElementById("affichage");
let memoryLettersElement = document.getElementById("memory-guess-letter");
let gameEnd = true;

window.initGame = () => {
  gameEnd = false;
  wordToDisplay = [];
  memoryLetters = [];
  memoryLettersElement.style.display = "none";
  memoryLettersElement.innerText = "Letters: ";
};

window.getRandomWord = () => {
  let index = Math.floor(Math.random() * dictionnaire.length);
  let word = dictionnaire[index];
  return word;
};

window.displayWord = () => {
  wordToGuess = getRandomWord().split("");
  console.log(wordToGuess);
  for (let i = 0; i < wordToGuess.length; i++) {
    wordToDisplay[i] = " _ ";
    wordToDisplayElement.innerText = wordToDisplay.join("");
  }
};

window.addEventListener("load", () => {
  initGame();
  displayWord();
});

window.pressLetter = (lettre) => {
  checkLetter(lettre.key);
};

window.clickLetter = (lettre) => {
  checkLetter(lettre);
};

window.checkLetter = (event) => {
  // check the status of game
  if (gameEnd == true) {
    return;
  }

  let letter = event;

  // check only letter of alphabet
  let permLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (permLetters.indexOf(letter.toUpperCase()) == -1) {
    return;
  }

  // Garbage only single letter
  if (memoryLetters.includes(letter) === true) return;
  else {
    memoryLetters.push(letter);
    memoryLettersElement.style.display = "block";
    memoryLettersElement.innerText = "Letters: " + memoryLetters.join(", ");
  }

  // turn off the button alphabet
  let element = document.getElementById("letter" + letter.toUpperCase());
  if (element.classList.contains("Off") == true) return;
  element.setAttribute("class", "letter Off");

  // put letter in array if available
  for (let i = 0; i < wordToGuess.length; i++) {
    if (letter === wordToGuess[i]) {
      wordToDisplay[i] = letter;
      wordToDisplayElement.innerText = wordToDisplay.join("");
    }
  }
  //congratulation !!
  console.log(wordToGuess);
  console.log(wordToDisplay);
  if (wordToGuess.join("") == wordToDisplay.join("")) {
    console.log("congratualtion!!");
    gameEnd = true;
  }
};

document.getElementById("new-game").addEventListener("click", () => {
  let elements = document.querySelectorAll(".letter");
  elements.forEach((element) => {
    element.setAttribute("class", "letter On");
  });
  initGame();
  displayWord();
});
