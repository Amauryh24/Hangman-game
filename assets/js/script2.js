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
let message = document.getElementById("message");
let essais;
const galleryImageHangman = [
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
  memoryGuessLetterText.innerText = "Lettres :";
  enterLabel.style.display = "";
  message.innerText = "";
};
guessLetterInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    enterButton.click();
  }
});
enterButton.addEventListener("click", () => {
  guessLetter();
  if (wordToGuess.join("") === wordToDisplay.join("")) {
    wordToDisplayText.innerText = wordToGuess.join("");
    // alert("Bravo, vous avez gagné");
    playAgain();
  }
});

// let guessLetter = () => {
//   enterLabel.innerText = "";
//   let reg = /[a-z]/g;
//   let guessLetter = guessLetterInput.value.toLowerCase();

//   let result = guessLetter.match(reg);
//   if (result === null) {
//     enterLabel.innerText = "Entrez uniquement les lettes de A à Z";
//   } else {
//     if (memoryGuessLetter.includes(guessLetter) === true) {
//       enterLabel.innerText = "La lettre " + guessLetter + " est déjà utilisée";
//     } else {
//       memoryGuessLetter.push(guessLetter);
//       memoryGuessLetterText.style.display = "block";
//       memoryGuessLetterText.innerText =
//         "Lettres :" + memoryGuessLetter.join(", ");

//       if (wordToGuess.includes(guessLetter) === true) {
//         for (let i = 0; i < wordToGuess.length; i++) {
//           if (guessLetter === wordToGuess[i]) {
//             wordToDisplay[i] = guessLetter;
//             wordToDisplayText.innerText = wordToDisplay.join(" ");
//           }
//         }
//         if (wordToGuess.join("") === wordToDisplay.join("")) {
//           alert("Bravo, vous avez gagné");
//           playAgain();
//         }
//       } else {
//         hangmanImage.style.display = "initial";
//         hangmanImage.setAttribute("src", galleryImageHangman[essais]);
//         essais++;
//         if (essais > 7) {
//           message.innerText =
//             "Vous avez perdu, le mot à trouvé était: " + wordToGuess.join("");
//           playAgain();
//         }
//       }
//     }
//   }
//   guessLetterInput.value = "";
// };

let guessLetter = () => {
  enterLabel.innerText = "";
  let reg = /[a-z]/g;
  let guessLetter = guessLetterInput.value.toLowerCase();

  let result = guessLetter.match(reg);

  if (result === null) {
    enterLabel.innerText = "Entrez uniquement les lettes de A à Z";
  } else if (memoryGauessLetter.includes(guessLetter) === true) {
    enterLabel.innerText = "La lettre " + guessLetter + " est déjà utilisée";
  } else {
    memoryGuessLetter.push(guessLetter);
    memoryGuessLetterText.style.display = "block";
    memoryGuessLetterText.innerText =
      "Lettres :" + memoryGuessLetter.join(", ");

    for (let i = 0; i < wordToGuess.length; i++) {
      if (guessLetter === wordToGuess[i]) {
        wordToDisplay[i] = guessLetter;
        wordToDisplayText.innerText = wordToDisplay.join(" ");
      }
    }
  }

  guessLetterInput.value = "";
};

newGameButton.addEventListener("click", () => {
  initHangmanGame();
  newGameButton.style.display = "none";
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
  newGameButton.style.display = "initial";
};
