"use strict";
//selecting elmenet
const player0el = document.querySelector(".player--0");
const player1el = document.querySelector(".player--1");

let score0Player = document.getElementById("score--0");
let score1Player = document.getElementById("score--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");
let total0Score = document.querySelector(".total0Score");
let total1Score = document.querySelector(".total1Score");
const Description = document.getElementById("Description");
const howPlaying = document.querySelector(".how_playing");
const overlay = document.querySelector(".blur");
console.log(overlay);

//function for reset number of player
score0Player.textContent = 0;
score1Player.textContent = 0;
diceEl.classList.add("hidden");
let clickCount = 0; // تعداد عدد النقرات
let curenntScore = 0;
let scors = [0, 0];
let activePlayer = 0;
let playing = true;

//function to active player
const playerActive = function () {
  document.querySelector(`.total${activePlayer}Score`).textContent = 0;

  curenntScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0el.classList.toggle("player--active");
  player1el.classList.toggle("player--active");
};
//rolling dice function
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.genarating arandom dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Reset animation
    diceEl.style.animation = "none";
    void diceEl.offsetWidth; // Trigger reflow

    //3. Delay and set animation speed based on click count
    setTimeout(function () {
      diceEl.style.animation = "anim 0.8s linear " + (clickCount + 1);
    }, 10);

    //2.display the dice
    diceEl.classList.remove("hidden");
    if (dice !== 1) {
      if (dice === 2) {
        diceEl.style.transform =
          "rotatex(90deg) rotateY(270deg) rotateZ(90deg)";
      } else if (dice === 3) {
        diceEl.style.transform = "rotatex(0deg) rotateY(0deg) rotateZ(360deg)";
      } else if (dice === 4) {
        diceEl.style.transform =
          "rotatex(0deg) rotateY(180deg) rotateZ(360deg)";
      } else if (dice === 5) {
        diceEl.style.transform =
          "rotatex(190deg) rotateY(270deg) rotateZ(280deg)";
      } else if (dice === 6) {
        diceEl.style.transform = "rotatex(90deg) rotateY(0deg) rotateZ(360deg)";
      }
      score0Player = dice;
      score1Player = dice;
      curenntScore += dice;
      document.querySelector(`.total${activePlayer}Score`).textContent =
        curenntScore;
    } else {
      //switch to another player
      playerActive();

      if (dice === 1) {
        diceEl.style.transform = "rotatex(0deg) rotateY(90deg) rotateZ(360deg)";
      }
    }
  }

  //4.chosse the sid of dice
});
btnHold.addEventListener("click", () => {
  if (playing) {
    //1- add the curent score to active player
    scors[activePlayer] += curenntScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scors[activePlayer];
    //if you >= 100 should have winer
    if (scors[activePlayer] >= 100) {
      diceEl.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("winning__player");
      document.querySelector(
        `.player--${activePlayer} .info_score `
      ).style.backgroundColor = "#635e5ebf";
      document.getElementById(
        `name--${activePlayer}`
      ).textContent = `🥳🎉player ${activePlayer} is winning `;
    } else {
      //switch player
      playerActive();
    }
  }
});

// reset the game
btnNew.addEventListener("click", function () {
  console.log("reset");
  diceEl.classList.add("hidden");
  playing = true;
  curenntScore = 0;

  //1- reset all score to zero
  scors = [0, 0];
  document.querySelector(`#score--0`).textContent = curenntScore;
  document.querySelector(`#score--1`).textContent = curenntScore;
  document.querySelector(`.total0Score`).textContent = curenntScore;
  document.querySelector(`.total1Score`).textContent = curenntScore;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("winning__player");
  document.querySelector(
    `.player--${activePlayer} .info_score `
  ).style.backgroundColor = "#0000ff6b";
  //curent score is 0
  document.getElementById("name--0").textContent = `player 1`;
  document.getElementById("name--1").textContent = `player 2`;
});

// discraption game
Description.addEventListener("click", function () {
  howPlaying.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
const closeModal = document.querySelector(".close-modal");
const closeDescraption = function () {
  howPlaying.classList.add("hidden");
  overlay.classList.add("hidden");
};
closeModal.addEventListener("click", closeDescraption);
overlay.addEventListener("click", closeDescraption);
