const letters = [
  "A","A",
  "B","B",
  "C","C",
  "D","D",
  "E","E",
  "F","F",
  "G","G",
  "H","H",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createCard(letter) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.letter = letter;

  const front = document.createElement("div");
  front.classList.add("front");
  front.textContent = letter;

  const back = document.createElement("div");
  back.classList.add("back");
  back.textContent = "?";

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", flipCard);

  return card;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.letter === secondCard.dataset.letter;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function initGame() {
  shuffle(letters);
  const board = document.getElementById("game-board");

  letters.forEach((letter) => {
    const card = createCard(letter);
    board.appendChild(card);
  });
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  setTimeout(() => {
    if (document.querySelectorAll(".flip").length === letters.length) {
      setTimeout(() => alert("Congrats you won!"), 500);
    }
  }, 300);

  resetBoard();
}

initGame();
