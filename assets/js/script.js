window.guessLetter = (e) => {
  console.log(e);
};
addEventListener("click", (event) => {
  console.log(event.target);
  event.target.setAttribute("class", "letter Off");
});

addEventListener("keyup", (e) => {
  if (e.keyCode === 65) {
    event.preventDefault();
    console.log(e.target);
  }
});
