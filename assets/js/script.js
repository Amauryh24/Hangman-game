import { dictionnaire } from "./dictionnaire.js";

function myFunction() {
  document.getElementById("demo").innerHTML = "Hello World";
}

let wordToDisplay = [];
let memoryGuessLetter = [];
let wordToGuess;
let wordToDisplayText = document.getElementById("affichage");
let memoryGuessLetterText = document.getElementById("memory-guess-letter");

let guessLetterInput = document.getElementById("guess-letter");
let enterLabel = document.getElementById("enter-label");
let newGameButton = document.getElementById("new-game");

let essais = 7;

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
  randomWord();
  displayWord();
};
guessLetterInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    console.log("j'ai click sur enter");
    document.getElementById("enter-btn").click();
  }
});
function guessLetter() {
  enterLabel.innerText = "";
  let guessLetter = guessLetterInput.value.toLowerCase();
  guessLetterInput.value = "";
  if (memoryGuessLetter.includes(guessLetter) === true) {
    enterLabel.innerText = "La lettre " + guessLetter + " est déjà utilisée";
  } else {
    memoryGuessLetter.push(guessLetter);
    memoryGuessLetterText.innerText = memoryGuessLetter.join(", ");
  }

  if (wordToGuess.includes(guessLetter) === true) {
    for (let i = 0; i < wordToGuess.length; i++) {
      if (guessLetter === wordToGuess[i]) {
        wordToDisplay[i] = guessLetter;
        wordToDisplayText.innerText = wordToDisplay.join(" ");
      }
    }
  } else {
    essais--;
    if (essais == 0) {
      alert("Vous avez perdu, le mot à trouvé était: " + wordToGuess.join(""));
      let answer = "voulez vous rejouez ?";
      if (answer === true) initHangmanGame();
    }
  }

  if (wordToGuess.join("") === wordToDisplay.join("")) {
    alert("fini");
    newGameButton.removeAttribute("disabled", "");
  }
}

newGameButton.addEventListener("click", () => {
  initHangmanGame();
});
