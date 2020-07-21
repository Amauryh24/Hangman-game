import { dictionnaire } from "./dictionnaire.js";

let wordToDisplay = [];
let memoryGuessLetter = [];
let wordToGuess;
let wordToDisplayText = document.getElementById("affichage");
let memoryGuessLetterText = document.getElementById("memory-guess-letter");

let guessLetterInput = document.getElementById("guess-letter");
let enterLabel = document.getElementById("enter-label");
let newGameButton = document.getElementById("new-game");
let enterButton = document.getElementById("enter-btn");
let hangmanImage = document.getElementById("hangman-image");
let essais;

galleryImage = [
  "./assets/img/Hangman-0.png",
  "./assets/img/Hangman-1.png",
  "./assets/img/Hangman-2.png",
  "./assets/img/Hangman-3.png",
  "./assets/img/Hangman-4.png",
  "./assets/img/Hangman-5.png",
  "./assets/img/Hangman-6.png",
];

window.addEventListener("load", () => {
  initHangmanGame();
});

let randomWord = () => {
  let randomWord = Math.floor(Math.random() * dictionnaire.length);
  randomWord = dictionnaire[randomWord];
  return randomWord;
};

let displayWord = () => {
  wordToGuess = randomWord().split("");
  console.log(wordToGuess);

  for (let i = 0; i < wordToGuess.length; i++) {
    wordToDisplay[i] = " _ ";
    wordToDisplayText.innerText = wordToDisplay.join(" ");
  }
};

let initHangmanGame = () => {
  memoryGuessLetter = [];
  wordToDisplay = [];
  essais = 0;
  randomWord();
  displayWord();
  hangmanImage.style.display = "none";
  guessLetterInput.style.display = "initial";
  enterButton.style.display = "initial";
  memoryGuessLetterText.innerText = "";
  enterLabel.style.display = "";
  newGameButton.style.display = "initial";
  newGameButton.setAttribute("disabled", "");
};
guessLetterInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    enterButton.click();
  }
});
enterButton.addEventListener("click", () => {
  guessLetter();
});

let guessLetter = () => {
  enterLabel.innerText = "";
  let reg = /[a-z]/g;
  let guessLetter = guessLetterInput.value.toLowerCase();

  let result = guessLetter.match(reg);
  if (result === null) {
    enterLabel.innerText =
      "Pas d'espace, pas d'accent, pas de numéro, uniquement les lettes de A à Z";
  } else {
    if (memoryGuessLetter.includes(guessLetter) === true) {
      enterLabel.innerText = "La lettre " + guessLetter + " est déjà utilisée";
    } else {
      memoryGuessLetter.push(guessLetter);
      memoryGuessLetterText.innerText = memoryGuessLetter.join(", ");

      if (wordToGuess.includes(guessLetter) === true) {
        for (let i = 0; i < wordToGuess.length; i++) {
          if (guessLetter === wordToGuess[i]) {
            wordToDisplay[i] = guessLetter;
            wordToDisplayText.innerText = wordToDisplay.join(" ");
          }
        }
        if (wordToGuess.join("") === wordToDisplay.join("")) {
          alert("Bravo, vous avez gagné");
          playAgain();
        }
      } else {
        essais++;
        if (essais < 7) {
          alert(
            "Vous avez perdu, le mot à trouvé était: " + wordToGuess.join("")
          );
          playAgain();
        }
      }
    }
  }
  guessLetterInput.value = "";
};

newGameButton.addEventListener("click", () => {
  initHangmanGame();
});

let playAgain = () => {
  let answer = confirm("voulez vous rejouez ?");
  answer === true ? initHangmanGame() : quitGame();
};

let quitGame = () => {
  wordToDisplayText.innerText = "";
  guessLetterInput.style.display = "none";
  enterButton.style.display = "none";
  enterLabel.style.display = "none";
  memoryGuessLetterText.innerText = "";
  newGameButton.style.display = "initial";
  newGameButton.removeAttribute("disabled", "");
};
