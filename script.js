const optBox = document.querySelector(".optionBox");

const controlorsBox = document.querySelector(".controlorsBox");
optBox.addEventListener("change", () => {
  if (optBox.value === "keyboard") {
    controlorsBox.style.display = "none";
  }
  else if (optBox.value === "button") {
    controlorsBox.style.display = "flex";
  }

})



const scorePara = document.querySelector(".scorePara");
const hiScorePara = document.querySelector(".hiScorePara");
const btns = document.querySelectorAll(".btn");
let inputDir = { x: 0, y: 0 };
let hiscoreValue = 0;
let snakeArr = [
  { x: 5, y: 6 },
];
let food = { x: 10, y: 5 };
let speed = 6;
let lastPaintTime = 0;
let score = 0;
// logics
function gameLoop(ctime) {
  requestAnimationFrame(gameLoop);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}


function isColide(snakeArr) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
      return true;
    }
  }
  if (snakeArr[0].x >= 18.5 || snakeArr[0].x <= 0 || snakeArr[0].y >= 13 || snakeArr[0].y <= 0) {
    return true;
  }
  return false;

}

function gameEngine() {
  // part1: uodating snake and food
  if (isColide(snakeArr)) {
    score = 0;
    inputDir = { x: 0, y: 0 };
    snakeArr = [{ x: 8, y: 10 }];
    gameOverBox = document.querySelector(".gameOverBox")
    gameOverBox.style.display = "flex";
    const playAgainBtn = document.querySelector(".playAgainBtn")
    playAgainBtn.addEventListener("click", () => {
      scorePara.textContent = `Score: ${score}`;

      gameOverBox.style.display = "none";
    })
  }
  if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    score++;
    if (score > hiscoreValue) {
      hiscoreValue = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreValue));
      hiScorePara.textContent = `High Score: ${hiscoreValue}`;
    }

    scorePara.textContent = `Score: ${score}`;
    let a = 2;
    let b = 12;
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    // console.log(food)
  }
  // Moving the snake element
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  // part2: Render snake and food
  const game = document.querySelector(".game");
  game.innerHTML = "";
  snakeArr.forEach((element, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = element.y;
    snakeElement.style.gridColumnStart = element.x;
    snakeElement.classList.add("head");
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snakeBody");
    }
    game.appendChild(snakeElement);
  });
  // display food element
  foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  game.appendChild(foodElement);
}
// Main Logic
window.requestAnimationFrame(gameLoop);

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreValue = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreValue));
} else {
  hiscore = JSON.parse(hiscore);
  hiScorePara.textContent = `High Score: ${hiscore}`;
}
document.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  switch (e.key) {
    case 'ArrowUp':
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case 'ArrowDown':
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case 'ArrowLeft':
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case 'ArrowRight':
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
})

btns.forEach((element) => {
  element.addEventListener("click", () => {
    inputDir = { x: 0, y: 1 };

    if (element.id === "btnUp") {
      console.log("btn up");
      inputDir.x = 0;
      inputDir.y = -1;
    }
    else if (element.id === "btnDown") {
      console.log("btn down");
      inputDir.x = 0;
      inputDir.y = 1;
    }
    else if (element.id === "btnLeft") {
      console.log("btn left");
      inputDir.x = -1;
      inputDir.y = 0;
    }
    else if (element.id === "btnRight") {
      console.log("btn right");
      inputDir.x = 1;
      inputDir.y = 0;
    }
  })
})

// qstTypeBox.addEventListener("change", () => {
//   qstType = qstTypeBox.value.toLowerCase();
//   if (qstType === "short") {
//     shortFnc();
//   } else {
//     longFnc();
//   }
// })