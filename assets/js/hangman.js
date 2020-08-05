const hangman = {
  word: [],
  guess: [],
  letters: "abcdefghijklmnopqrstuvwxyz",
  storageLetters: [],
  essais: null,
  elDom: {
    word: document.querySelector("p.word"),
    letters: document.querySelectorAll("li.letter"),
    storageLetters: document.querySelector(".storage-letters"),
    progress: document.getElementById("progress"),
  },

  Initialise: function () {
    this.Stargame();
  },

  Stargame: function () {
    for (let i = 0; i < this.elDom.letters.length; i++) {
      this.elDom.letters[i].className = "letter on";
    }
    this.word = [];
    this.guess = [];
    this.storageLetters = [];
    this.elDom.word.innerHTML = "";
    this.elDom.storageLetters.innerHTML = "";
    this.essais = 7;
    this.elDom.progress.value = this.essais;
    this.Getword();
    this.Displayword();
  },

  Getword: function () {
    let words = Dictionary();
    let index = parseInt(Math.random() * words.length);
    this.word = words[index].split("");
  },
  Displayword: function () {
    this.elDom.word.innerHTML = "";
    for (let i = 0; i < this.word.length; i++) {
      let el = document.createElement("span");
      el.setAttribute("class", "letter");
      el.innerText = "";
      this.guess[i] = " ";
      this.elDom.word.appendChild(el);
    }
  },
  Pressletter: function (e) {
    // press only alphabet key
    if (this.letters.indexOf(e.key.toLowerCase()) === -1) return;
    this.CheckLetter(e.key.toLowerCase());
    let el = document.getElementById("letter" + e.key.toUpperCase());
    el.className = "letter off";
  },

  Clickletter: function (letter) {
    this.CheckLetter(letter);
    let el = document.getElementById("letter" + letter.toUpperCase());
    el.className = "letter off";
  },

  CheckLetter: function (letter) {
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
      this.essais--;
      this.elDom.progress.value = this.essais;
    }
    if (this.essais === 0) this.Endgame("lost");
    if (this.word.join("") === this.guess.join("")) this.Endgame("win");
  },

  Storeletter: function (letter) {
    this.elDom.storageLetters.innerText += ` ${letter}, `;
    this.storageLetters.push(letter);
  },

  Endgame: function (status) {
    this.Displayanswer();
    // remove Event
    for (let i = 0; i < this.elDom.letters.length; i++) {
      this.elDom.letters[i].className = "letter off";
    }
    this.storageLetters = this.letters.split("");

    // display modal and select option
    let modal = document.querySelector(".wrap-modal");
    modal.style.display = "initial";
    let message = document.getElementById("message");
    if (status === "win") message.innerText = "Bien joué !";
    else message.innerText = "Raté !";
    document.getElementById("yes").addEventListener("click", () => {
      modal.style.display = "none";
      this.Stargame();
    });
    document.getElementById("no").addEventListener("click", () => {
      modal.style.display = "none";
    });
  },
  Displayanswer: function () {
    let letters = document.querySelectorAll("span.letter");
    for (let i = 0; i < letters.length; i++) {
      letters[i].innerText = this.word[i];
    }
  },
};
