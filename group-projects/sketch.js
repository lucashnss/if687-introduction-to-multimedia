let grid;
let cols = 10;
let rows = 20;
let blockSize = 30;
let currentPiece;
let gameOver = false;
let score = 0;
let level = 1;
let lineToNextLevel = 1;
let speed;
let musicRate = 1;
let restartButton; // Adicionando uma variável para o botão de reiniciar

let colors = [
  [255, 0, 0], // Vermelho
  [0, 0, 255], // Azul
  [0, 255, 0], // Verde
  [255, 255, 255], // Branco
];

let shapes = [
  [[1, 1], [1, 1]], // Quadrado
  [[1, 0], [1, 0], [1, 1]], // L vertical
  [[0, 1], [0, 1], [1, 1]], // L vertical invertido
  [[1, 1, 1], [1, 0, 0]], // L horizontal
  [[1, 1, 1], [0, 0, 1]], // L horizontal invertido
  [[1], [1], [1]] // I reto 
];

let song;
let gameState = 'menu';
let difficulty = 'easy';
let bgImages = []; // Array para armazenar as imagens de fundo

function preload() {
  song = loadSound('tetris.mp3');
  
  soundWater = loadSound('agua.mp3');
  soundFire = loadSound('fogo.mp3');
  soundAir = loadSound('ar.mp3');
  soundEarth = loadSound('terra.mp3');

  // Carregando as imagens de fundo para os 10 níveis
  for (let i = 1; i <= 10; i++) {
    bgImages[i] = loadImage(`background${i}.jpg`);
  }
}

function setup() {
  createCanvas(cols * blockSize, rows * blockSize);
  textAlign(CENTER, CENTER);
  textSize(32);
  song.loop();
  song.setVolume(0.15);
  soundWater.setVolume(0.4);
  soundEarth.setVolume(0.7);
  soundAir.setVolume(0.8);
  setDifficulty(difficulty);
  
  // Inicializar o botão de reiniciar
  restartButton = createButton('Jogar de Novo');
  restartButton.position(width / 2 - 50, height / 2 + 40);
  restartButton.mousePressed(restartGame);
  restartButton.hide(); // Esconder o botão inicialmente
}

function draw() {
  background(220);
  
  // Desenha a imagem de fundo correspondente ao nível atual
  if (gameState === 'playing' || gameState === 'levelUp') {
    background(bgImages[level]);
  } else {
    background(220);
  }
  
  if (gameState === 'menu') {
    drawMenu();
  } else if (gameState === 'playing') {
    if (!gameOver) {
      drawGrid();
      currentPiece.show();
      currentPiece.moveDown();
      drawScore();
      drawLevel();
    } else {
      textSize(32);
      fill(255);
      textAlign(CENTER, CENTER);
      text('Game Over', width / 2, height / 2);
      song.stop();
      restartButton.show(); // Mostrar o botão de reiniciar
    }
  } else if (gameState === 'levelUp') {
    drawLevelUp();
  }
}

function drawMenu() {
  fill(0);
  textSize(64);
  text('TETRIS', width / 2, height / 4);

  textSize(32);
  fill(difficulty === 'easy' ? '#4CAF50' : 'black');
  text('Easy', width / 2, height / 2 - 40);

  fill(difficulty === 'medium' ? 'yellow' : 'black');
  text('Medium', width / 2, height / 2);

  fill(difficulty === 'hard' ? 'rgb(128,32,0)' : 'black');
  text('Hard', width / 2, height / 2 + 40);

  // Desenho das regras de destruição com blocos coloridos
  let x = width / 2 - 90;
  let y = height / 2 + 90;
  let spacing = 40;

  // Azul destrói Vermelho
  fill(0, 0, 255); // Azul
  rect(x, y, blockSize, blockSize);
  fill(0);
  text('breaks', x + blockSize + 65, y + blockSize / 2);
  fill(255, 0, 0); // Vermelho
  rect(x + blockSize + 130, y, blockSize, blockSize);

  // Vermelho destrói Branco
  y += spacing;
  fill(255, 0, 0); // Vermelho
  rect(x, y, blockSize, blockSize);
  fill(0);
  text('breaks', x + blockSize + 65, y + blockSize / 2);
  fill(255, 255, 255); // Branco
  rect(x + blockSize + 130, y, blockSize, blockSize);

  // Branco destrói Verde
  y += spacing;
  fill(255, 255, 255); // Branco
  rect(x, y, blockSize, blockSize);
  fill(0);
  text('breaks', x + blockSize + 65, y + blockSize / 2);
  fill(0, 255, 0); // Verde
  rect(x + blockSize + 130, y, blockSize, blockSize);

  // Verde destrói Azul
  y += spacing;
  fill(0, 255, 0); // Verde
  rect(x, y, blockSize, blockSize);
  fill(0);
  text('breaks', x + blockSize + 65, y + blockSize / 2);
  fill(0, 0, 255); // Azul
  rect(x + blockSize + 130, y, blockSize, blockSize);
}

function drawLevelUp() {
  textSize(18);
  fill(255);
  text('Level Up!', width / 2, height / 2 - 40);

  textSize(18);
  fill(255);
  text(`Level ${level}`, width / 2, height / 2);
  text('Press ENTER to continue', width / 2, height / 2 + 40);
  textAlign(CENTER, CENTER);
}

function drawScore() {
  textSize(16);
  fill(255);
  textAlign(LEFT, TOP);
  text('Score: ' + score, 10, 10);
}

function drawLevel() {
  textSize(16);
  fill(255);
  textAlign(RIGHT, TOP);
  text('Level: ' + level, width - 10, 10);
}

function drawGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      stroke(0);
      noFill();
      rect(x * blockSize, y * blockSize, blockSize, blockSize);
      if (grid[x][y] != 0) {
        fill(grid[x][y]);
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }
}

function keyPressed() {
  if (gameState === 'menu') {
    if (keyCode === DOWN_ARROW) {
      if (difficulty === 'easy') {
        difficulty = 'medium';
      } else if (difficulty === 'medium') {
        difficulty = 'hard';
      }
    } else if (keyCode === UP_ARROW) {
      if (difficulty === 'hard') {
        difficulty = 'medium';
      } else if (difficulty === 'medium') {
        difficulty = 'easy';
      }
    } else if (keyCode === ENTER) {
      gameState = 'playing';
      setDifficulty(difficulty);
      grid = create2DArray(cols, rows);
      currentPiece = new Piece();
      score = 0;
      level = 1;
      piecesToNextLevel = 15;
      gameOver = false;
      restartButton.hide(); // Esconder o botão de reiniciar quando o jogo começa
    }
  } else if (gameState === 'playing') {
    if (!gameOver) {
      if (keyCode === LEFT_ARROW) {
        currentPiece.moveLeft();
      } else if (keyCode === RIGHT_ARROW) {
        currentPiece.moveRight();
      } else if (keyCode === DOWN_ARROW) {
        currentPiece.moveDown();
      } else if (keyCode === 32) { // Barra de espaço
        currentPiece.rotate();
      }
    }
  } else if (gameState === 'levelUp' && keyCode === ENTER) {
    gameState = 'playing';
    setDifficulty(difficulty);
    grid = create2DArray(cols, rows);
    currentPiece = new Piece();
    gameOver = false;
  }
}

function restartGame() {
  // Reiniciar as variáveis do jogo
  gameState = 'playing';
  setDifficulty(difficulty);
  grid = create2DArray(cols, rows);
  currentPiece = new Piece();
  score = 0;
  level = 1;
  piecesToNextLevel = 15;
  gameOver = false;
  
  // Reiniciar a música
  song.stop();  // Parar qualquer instância anterior da música
  song.loop();  // Recomeçar a música
  song.setVolume(0.15);
  
  restartButton.hide(); // Esconder o botão de reiniciar
}


function setDifficulty(level) {
  if (level === 'easy') {
    speed = 3;
  } else if (level === 'medium') {
    speed = 4;
  } else if (level === 'hard') {
    speed = 6;
  }
  frameRate(speed);
}

function create2DArray(cols, rows) {
  let arr = [];
  for (let i = 0; i < cols; i++) {
    arr[i] = [];
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

class Piece {
  constructor() {
    let randIndex = floor(random(shapes.length));
    this.shape = shapes[randIndex];
    this.color = colors[floor(random(colors.length))]; // Seleciona cor aleatória
    this.x = floor(cols / 2);
    this.y = 0;
    if (this.collides()) {
      gameOver = true;
    }
  }

  moveDown() {
    this.y++;
    if (this.collides()) {
      this.y--;
      this.merge();
      score += 5;
      this.clearLines();
      currentPiece = new Piece();
      if (currentPiece.collides()) {
        gameOver = true;
      }
    }
  }

  moveLeft() {
    this.x--;
    if (this.collides()) {
      this.x++;
    }
  }

  moveRight() {
    this.x++;
    if (this.collides()) {
      this.x--;
    }
  }

  rotate() {
    let newShape = [];
    for (let y = 0; y < this.shape[0].length; y++) {
      newShape[y] = [];
      for (let x = 0; x < this.shape.length; x++) {
        newShape[y][x] = this.shape[this.shape.length - 1 - x][y];
      }
    }
    let oldShape = this.shape;
    this.shape = newShape;
    if (this.collides()) {
      this.shape = oldShape;
    }
  }

  collides() {
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j] == 1) {
          let newX = this.x + i;
          let newY = this.y + j;

          // Verifique se newX e newY estão dentro dos limites da grade
          if (newX < 0 || newX >= cols || newY >= rows) {
            return true;
          }

          // Verifica se há colisão com outra peça
          let otherColor = grid[newX][newY];
          if (otherColor != 0) {
            if (this.colorConflict(color(this.color), otherColor)) {
              grid[newX][newY] = 0; // Remove a peça em conflito
            } else {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  colorConflict(c1, c2) {
    // Compara as cores e aplica as regras de destruição
    if (c1.levels[0] == 0 && c1.levels[1] == 0 && c1.levels[2] == 255 && // Azul
      c2.levels[0] == 255 && c2.levels[1] == 0 && c2.levels[2] == 0) { // Vermelho
      soundWater.play();
      return true;
    }
    if (c1.levels[0] == 0 && c1.levels[1] == 255 && c1.levels[2] == 0 && // Verde
      c2.levels[0] == 0 && c2.levels[1] == 0 && c2.levels[2] == 255) { // Azul
      soundEarth.play();
      return true;
    }
    if (c1.levels[0] == 255 && c1.levels[1] == 255 && c1.levels[2] == 255 && // Branco
      c2.levels[0] == 0 && c2.levels[1] == 255 && c2.levels[2] == 0) { // Verde
      soundAir.play();
      return true;
    }
    if (c1.levels[0] == 255 && c1.levels[1] == 0 && c1.levels[2] == 0 && // Vermelho
      c2.levels[0] == 255 && c2.levels[1] == 255 && c2.levels[2] == 255) { // Branco
      soundFire.play();
      return true;
    }
    return false;
  }

  merge() {
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j] == 1) {
          grid[this.x + i][this.y + j] = color(this.color[0], this.color[1], this.color[2]);
        }
      }
    }
  }

  clearLines() {
    for (let y = rows - 1; y >= 0; y--) {
      let isFull = true;
      for (let x = 0; x < cols; x++) {
        if (grid[x][y] == 0) {
          isFull = false;
          break;
        }
      }
      if (isFull) {
        for (let yy = y; yy > 0; yy--) {
          for (let x = 0; x < cols; x++) {
            grid[x][yy] = grid[x][yy - 1];
          }
        }
        for (let x = 0; x < cols; x++) {
          grid[x][0] = 0;
        }

        lineToNextLevel--;
        //soundExtra.play();

        if (lineToNextLevel <= 0) {
          level++;
          lineToNextLevel = level;
          gameState = 'levelUp';
          song.stop();
          song.play();
        }

        score *= 2;
        y++;
      }
    }
  }

  show() {
    fill(this.color);
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j] == 1) {
          rect((this.x + i) * blockSize, (this.y + j) * blockSize, blockSize, blockSize);
        }
      }
    }
  }
}
