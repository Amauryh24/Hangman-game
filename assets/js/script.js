import { dictionnaire } from "./dictionnaire.js";

console.log(dictionnaire);
let wordToGuess = [];
let wordToDisplay = [];
window.getRandomWord = () => {
  Math.floor(Math.random() * dictionnaire.length);
};
window.pressLetter = (lettre) => {
  displayLetterKeyboard(lettre.key);
};

window.clickLetter = (lettre) => {
  displayLetterKeyboard(lettre);
};

window.displayLetterKeyboard = (event) => {
  let letter = event;
  let element = document.getElementById("letter" + letter.toUpperCase());
  element.setAttribute("class", "letter Off");

  if (element.classList.contains("Off") == true) {
    return;
  }
};
