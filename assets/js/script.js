import { dictionnaire } from "./dictionnaire.js";

function randomWord() {
  let wordToGuess = Math.floor(Math.random() * dictionnaire.length);
  console.log(wordToGuess);
  wordToGuess = dictionnaire[wordToGuess];
  return wordToGuess;
}

window.addEventListener("load", () => {
  console.log(randomWord());
});
