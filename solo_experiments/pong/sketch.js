// O seguinte projeto apresenta o clássico Snake Game, nele você controla uma cobrinha verde e tenta comer o máximo possível de frutas sem bater com a cara na parede ou engolir o próprio corpo
// Primeiro aperte no Canvas e movimente a cabeça da cobra com as teclas de movimentação para subir, descer, ir para direita e para a esquerda, à medida que você come frutas seu corpo cresce mais um pouquinho, tente comer o máximo possível!

let snake;
let fruit;
let gridSize = 20;
let cols, rows;
let score = 0;
let gameOver = false;
let button;
let fruitColor;

// Variables for sound
let eatSound;
let gameOverSound;

function preload() {
  // Load sound files
  eatSound = loadSound('eat_sound.mp3');
  gameOverSound = loadSound('game_over_sound.mp3');
}

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  cols = floor(width / gridSize);
  rows = floor(height / gridSize);
  snake = new Snake();
  fruit = createFruit();
  fruitColor = color(random(255), random(255), random(255));
  button = createButton('Play Again');
  button.position(-50, -50); // Initially position the button off-screen
  button.mousePressed(resetGame);
  button.hide();
}

function draw() {
  if (gameOver) {
    showGameOver();
    return;
  }
  
  background(51);
  
  // Draw border
  fill(255, 0, 0);
  noStroke();
  rect(0, 0, width, gridSize); // top
  rect(0, 0, gridSize, height); // left
  rect(0, height - gridSize, width, gridSize); // bottom
  rect(width - gridSize, 0, gridSize, height); // right
  
  snake.update();
  snake.show();

  if (snake.eat(fruit)) {
    eatSound.play(); // Play eat sound
    fruit = createFruit();
    fruitColor = color(random(255), random(255), random(255));
    score++;
  }

  fill(fruitColor);
  rect(fruit.x, fruit.y, gridSize, gridSize);

  displayScore();

  if (snake.endGame()) {
    gameOverSound.play(); // Play game over sound
    gameOver = true;
  }
}

function displayScore() {
  textSize(18);
  fill(255);
  text("Score: " + score, 10, 20);
}

function createFruit() {
  let x, y;
  do {
    x = floor(random(cols)) * gridSize;
    y = floor(random(rows)) * gridSize;
  } while (x < gridSize || x >= width - gridSize || y < gridSize || y >= height - gridSize);
  return createVector(x, y);
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(cols / 2), floor(rows / 2));
    this.xdir = 0;
    this.ydir = 0;
    this.growFlag = false;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
    if (!this.growFlag) {
      this.body.shift();
    }
    this.growFlag = false;
  }

  grow() {
    this.growFlag = true;
  }

  endGame() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x >= cols - 1 || x < 1 || y >= rows - 1 || y < 1) {
      return true;
    }
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === x && part.y === y) {
        return true;
      }
    }
    return false;
  }

  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x === pos.x / gridSize && y === pos.y / gridSize) {
      this.grow();
      return true;
    }
    return false;
  }

  show() {
    fill(0, 255, 0); // Green color for the snake
    noStroke();
    for (let i = 0; i < this.body.length; i++) {
      rect(this.body[i].x * gridSize, this.body[i].y * gridSize, gridSize, gridSize);
    }
  }
}

function showGameOver() {
  background(255, 0, 0);
  textSize(32);
  fill(255);
  textAlign(CENTER);
  text("Game Over", width / 2, height / 2);
  button.position(width / 2 - 50, height / 2 + 20); // Center the button
  button.show();
}

function resetGame() {
  gameOver = false;
  score = 0;
  snake = new Snake();
  fruit = createFruit();
  fruitColor = color(random(255), random(255), random(255));
  button.hide();
  button.position(-50, -50); // Move the button off-screen again
  loop();
}

function keyPressed() {
  if (keyCode === UP_ARROW && snake.ydir === 0) {
    snake.setDir(0, -1);
  } else if (keyCode === DOWN_ARROW && snake.ydir === 0) {
    snake.setDir(0, 1);
  } else if (keyCode === LEFT_ARROW && snake.xdir === 0) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW && snake.xdir === 0) {
    snake.setDir(1, 0);
  }
}
