// O seguinte projeto apresenta o clássico Pong, nele você joga contra outra pessoa para tentar fazer antes do seu oponentee 10 gols.
// Primeiro aperte em Play 1v1, o jogador da esquerda irá controlar seu goleiro com as teclas w para subir e s para descer, já o jogador da direita controla-rá  com as teclas de PgUp e PgDn para subir e descer respectivamente.


let ball;
let leftPaddle, rightPaddle;
let leftScore = 0;
let rightScore = 0;
let gameStarted = false; // Variável para controlar se o jogo começou ou não

function setup() {
  createCanvas(800, 400);
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
}

function draw() {
  background(0);
  
  if (gameStarted) {
    // Se o jogo começou, desenhar o jogo normalmente
    drawCenterLine();
    ball.update();
    ball.show();
    ball.edges();
    ball.paddleCollision(leftPaddle);
    ball.paddleCollision(rightPaddle);
    ball.checkScore();

    leftPaddle.update();
    rightPaddle.update();
    leftPaddle.show();
    rightPaddle.show();

    displayScores();
  } else {
    // Se o jogo não começou, desenhar a tela inicial
    textAlign(CENTER, CENTER);
    textSize(60);
    fill(255);

    if (leftScore >= 10 || rightScore >= 10) {
      // Tela de fim de jogo
      let winner = leftScore > rightScore ? "Jogador Esquerdo" : "Jogador Direito";
      textSize(40);
      text(`${winner} Ganhou!`, width / 2, height / 2 - 50);

      // Botão "Play Again 1v1"
      rectMode(CENTER);
      fill(100); // Cinza escuro
      rect(width / 2, height / 2 + 50, 240, 60); // Aumentei as dimensões
      fill(255);
      textSize(32);
      text("Play Again 1v1", width / 2, height / 2 + 50);

      // Detectar clique no botão para reiniciar o jogo
      if (mouseIsPressed && mouseX > width / 2 - 120 && mouseX < width / 2 + 120 &&
          mouseY > height / 2 + 20 && mouseY < height / 2 + 80) {
        leftScore = 0;
        rightScore = 0;
        gameStarted = true;
      }
    } else {
      // Tela inicial
      // Retângulo cinza ao redor de "PONG"
      rectMode(CENTER);
      fill(100); // Cinza escuro
      rect(width / 2, height / 2 - 50, 220, 80); // Ajuste as dimensões conforme necessário

      // Texto "PONG" de forma mais retangular
      fill(255);
      textSize(48); // Ajuste o tamanho conforme necessário
      text("PONG", width / 2, height / 2 - 50);

      // Retângulo cinza ao redor de "Play 1v1"
      rectMode(CENTER);
      fill(100); // Cinza escuro
      rect(width / 2, height / 2 + 50, 200, 60); // Ajuste as dimensões conforme necessário

      // Texto "Play 1v1"
      fill(255);
      textSize(32);
      text("Play 1v1", width / 2, height / 2 + 50);

      // Detectar clique no botão para iniciar o jogo
      if (mouseIsPressed && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 &&
          mouseY > height / 2 + 20 && mouseY < height / 2 + 80) {
        gameStarted = true;
      }
    }
  }
}

function drawCenterLine() {
  fill(255);
  noStroke();
  for (let i = 0; i < height; i += 20) {
    rect(width / 2 - 5, i, 10, 10);
  }
}

function displayScores() {
  fill(255);
  drawNumber(nf(leftScore, 2), width / 4 - 30, 30);
  drawNumber(nf(rightScore, 2), 3 * width / 4 - 30, 30);
}

function drawNumber(num, x, y) {
  let digits = String(num).padStart(2, '0');
  for (let i = 0; i < digits.length; i++) {
    drawDigit(digits[i], x + i * 40, y);
  }
}

function drawDigit(digit, x, y) {
  let pixels = [
    [[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]], // 0
    [[0, 1, 0], [1, 1, 0], [0, 1, 0], [0, 1, 0], [1, 1, 1]], // 1
    [[1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 0], [1, 1, 1]], // 2
    [[1, 1, 1], [0, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]], // 3
    [[1, 0, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [0, 0, 1]], // 4
    [[1, 1, 1], [1, 0, 0], [1, 1, 1], [0, 0, 1], [1, 1, 1]], // 5
    [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 1], [1, 1, 1]], // 6
    [[1, 1, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]], // 7
    [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]], // 8
    [[1, 1, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]]  // 9
  ];

  let pattern = pixels[digit];
  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      if (pattern[i][j] === 1) {
        rect(x + j * 10, y + i * 10, 10, 10);
      }
    }
  }
}

class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random([-8, 8]);
    this.ySpeed = random([-6, 6]);
    this.r = 12;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  edges() {
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  checkScore() {
    if (this.x < 0) {
      rightScore++;
      this.reset();
    } else if (this.x > width) {
      leftScore++;
      this.reset();
    }

    if (leftScore >= 10 || rightScore >= 10) {
      gameStarted = false;
    }
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }

  paddleCollision(paddle) {
    if (
      this.y > paddle.y &&
      this.y < paddle.y + paddle.h &&
      ((this.x - this.r < paddle.x + paddle.w && paddle.isLeft) ||
      (this.x + this.r > paddle.x && !paddle.isLeft))
    ) {
      this.xSpeed *= -1.1;
    }
  }
}

class Paddle {
  constructor(isLeft) {
    this.w = 20;
    this.h = 100;
    this.isLeft = isLeft;
    this.y = height / 2 - this.h / 2;
    this.x = this.isLeft ? 0 : width - this.w;
    this.ySpeed = 0;
  }

  update() {
    if (this.isLeft) {
      if (keyIsDown(87)) {
        this.ySpeed = -8;
      } else if (keyIsDown(83)) {
        this.ySpeed = 8;
      } else {
        this.ySpeed = 0;
      }
    } else {
      if (keyIsDown(UP_ARROW)) {
        this.ySpeed = -8;
      } else if (keyIsDown(DOWN_ARROW)) {
        this.ySpeed = 8;
      } else {
        this.ySpeed = 0;
      }
    }
    this.y += this.ySpeed;
    this.y = constrain(this.y, 0, height - this.h);
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}
