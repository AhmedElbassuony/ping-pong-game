// Important Fields
const playerOneName = document.querySelector(".player:first-child .name");
const playerOneScore = document.querySelector(".player:first-child .score");
const playerTwoName = document.querySelector(".player:last-child .name");
const playerTwoScore = document.querySelector(".player:last-child .score");

// set Players
playerOne = {
  name: "player one",
  score: 0,
  block: document.querySelector(".block:first-child"),
  blockPosition: 200,
  color: "#660000",
};

playerTwo = {
  name: "player two",
  score: 0,
  block: document.querySelector(".block:last-child"),
  blockPosition: 200,
  color: "#0070FF",
};

// Set Ball
ball = {
  ballDiv: document.querySelector(".ball"),
  x: 490,
  y: 240,
  deltaX: 15,
  deltay: 15,
};

let movementLoop;

document.querySelector("button").addEventListener("click", startGame);

// Set Movement

ballMovement = () => {
  ball.x += ball.deltaX;
  ball.y += ball.deltay;
  ball.ballDiv.style.left = `${ball.x}px`;
  ball.ballDiv.style.top = `${ball.y}px`;
  if (ball.x < -10 || ball.x >= 1000) {
    ball.deltaX *= -1;
    if (ball.x <= 0) {
      playerTwoScore.innerHTML++;
      playerTwo.score++;
    } else {
      playerOneScore.innerHTML++;
      playerOne.score++;
    }
    ball.x = 490;
    ball.y = 240;
    ball.ballDiv.style.left = `${ball.x}px`;
    ball.ballDiv.style.top = `${ball.y}px`;
    clearInterval(movementLoop);
    if (playerOne.score !== 10 && playerTwo.score !== 10) {
      setTimeout(() => {
        movementLoop = setInterval(ballMovement, 50);
      }, 500);
    } else {
      if (playerOne.score === 10) {
        document.querySelector(".winner-div").style.display = "block";
        document.querySelector(".winner").innerHTML = playerOne.name;
        document.querySelector(".winner").style.color = playerOne.color;
      } else {
        document.querySelector(".winner-div").style.display = "block";
        document.querySelector(".winner").innerHTML = playerTwo.name;
        document.querySelector(".winner").style.color = playerTwo.color;
      }
    }
  }
  if (
    ball.x <= 35 &&
    ball.x >= 15 &&
    ball.y >= playerOne.blockPosition &&
    ball.y <= playerOne.blockPosition + 100
  ) {
    ball.deltaX *= -1;
  }
  if (
    ball.x >= 945 &&
    ball.x <= 965 &&
    ball.y >= playerTwo.blockPosition &&
    ball.y <= playerTwo.blockPosition + 100
  ) {
    ball.deltaX *= -1;
  }
  if (ball.y <= 0 || ball.y >= 480) {
    ball.deltay *= -1;
  }
};

// Start Game
function startGame() {
  let name1 = window.prompt("Enter First Player Name");
  let name2 = window.prompt("Enter Second Player Name");

  name1 === "" ? (name1 = "player one") : (name1 = name1);
  name2 === "" ? (name2 = "player two") : (name2 = name2);
  playerOneName.innerHTML = name1;
  playerTwoName.innerHTML = name2;
  playerOneScore.innerHTML = playerOne.score;
  playerTwoScore.innerHTML = playerTwo.score;
  playerOne.name = name1;
  playerTwo.name = name2;

  document.querySelector(".start-layer").style.display = "none";

  // Start ball move
  setTimeout(() => (movementLoop = setInterval(ballMovement, 50)), 1000);

  // set movement
  document.addEventListener("keydown", (event) => {
    if (event.key === "W" || event.key === "w") {
      let currentTop = playerOne.blockPosition;
      if (currentTop > 0) {
        currentTop -= 20;
        playerOne.block.style.top = `${currentTop}px`;
        playerOne.blockPosition = currentTop;
      }
    } else if (event.key === "s" || event.key === "s") {
      let currentTop = playerOne.blockPosition;
      if (currentTop < 400) {
        currentTop += 20;
        playerOne.block.style.top = `${currentTop}px`;
        playerOne.blockPosition = currentTop;
      }
    } else if (event.key === "ArrowUp") {
      let currentTop = playerTwo.blockPosition;
      if (currentTop > 0) {
        currentTop -= 20;
        playerTwo.block.style.top = `${currentTop}px`;
        playerTwo.blockPosition = currentTop;
      }
    } else if (event.key === "ArrowDown") {
      let currentTop = playerTwo.blockPosition;
      if (currentTop < 400) {
        currentTop += 20;
        playerTwo.block.style.top = `${currentTop}px`;
        playerTwo.blockPosition = currentTop;
      }
    }
  });
}
