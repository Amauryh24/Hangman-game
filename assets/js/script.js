import { dictionnaire } from "./dictionnaire.js";

let wordToGuess;
let wordToDisplay = [];
let memoryLetters = [];
let wordToDisplayElement = document.getElementById("affichage");
let memoryLettersElement = document.getElementById("memory-guess-letter");

window.initGame = () => {
  wordToDisplay = [];
  memoryLetters = [];
  memoryLettersElement.style.display = "none";
  memoryLettersElement.innerText = "Lettre:";
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
  let letter = event;
  console.log(letter);

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
    memoryLettersElement.innerText = "Lettre: " + memoryLetters.join(", ");
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
};

document.getElementById("new-game").addEventListener("click", () => {
  let elements = document.querySelectorAll(".letter");
  elements.forEach((element) => {
    element.setAttribute("class", "letter On");
  });
  initGame();
  displayWord();
});
