const hangman = {
  word: [],
  guess: [],
  letters: "abcdefghijklmnopqrstuvwxyz",
  storageLetters: [],
  essais: 7,

  Initialise: function () {
    this.Stargame();
    this.Displayword();
  },

  Stargame: function () {
    this.Getword();
  },

  Getword: function () {
    let words = Dictionary();
    let index = parseInt(Math.random() * words.length);
    this.word = words[index].split("");
  },
  Displayword: function () {
    let wordEl = document.querySelector(".word");
    wordEl.innerHTML = "";
    for (let i = 0; i < this.word.length; i++) {
      let el = document.createElement("span");
      el.setAttribute("class", "letter");
      el.innerText = " ";
      this.guess[i] = " ";
      wordEl.appendChild(el);
    }
  },
  Pressletter: function (e) {
    this.CheckLetter(e.key.toLowerCase());
  },

  Clickletter: function (letter) {
    this.CheckLetter(letter);
    let el = document.getElementById("letter" + letter.toUpperCase());
    el.className = "letter off";
  },

  CheckLetter: function (letter) {
    if (this.letters.indexOf(letter) === -1) return;
    if (this.storageLetters.indexOf(letter) !== -1) return;
    this.Storeletter(letter);

    let el = document.querySelectorAll("span.letter");
    for (let i = 0; i < this.word.length; i++) {
      if (letter.toLowerCase() === this.word[i]) {
        el[i].innerText = letter;
        this.guess[i] = letter;
      }
    }
    if (this.word.indexOf(letter) === -1) {
      console.log("raté lettre");
    }
    if (this.word.join("") === this.guess.join("")) {
      console.log("gagné jeu");
    }
  },

  Storeletter: function (letter) {
    let el = document.querySelector(".storage-letters");
    el.innerText += ` ${letter}, `;
    this.storageLetters.push(letter);
  },
};
