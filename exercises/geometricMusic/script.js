//Considere os exemplos e os códigos apresentados na seção Sound do repositório abaixo para desenvolver um experimento com a biblioteca 
//p5.sound do p5.js. 

let osc; // Oscilador para gerar o som
let currentNote; // Frequência da nota atual
let shapes = []; // Array para armazenar as formas geométricas
let notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25]; // Notas musicais (C4 a E5)
let shapeTypes = ["circle", "square", "triangle", "line", "ellipse", "rect", "triangle", "point", "quad", "arc"]; // Tipos de figuras

function setup() {
  createCanvas(800, 600);
  osc = new p5.Oscillator('sine'); // Criar um oscilador
  osc.start();
  osc.amp(0); // Inicialmente sem som
  currentNote = notes[0]; // Nota inicial
}

function draw() {
  background(240); // Cor de fundo
  // Desenhar todas as formas armazenadas
  for (let shape of shapes) {
    shape.display();
  }
}

function keyPressed() {
  let num = int(key); // Convertendo a tecla pressionada para número
  if (num >= 0 && num <= 9) {
    currentNote = notes[num]; // Mudar a nota com base no número
    let shapeType = shapeTypes[num]; // Selecionar o tipo de forma
    let x = random(width); // Posição aleatória em x
    let y = random(height); // Posição aleatória em y
    let color = [random(255), random(255), random(255)]; // Cor aleatória
    shapes.push(new Shape(x, y, shapeType, currentNote, color)); // Adicionar nova forma ao array
    osc.freq(currentNote); // Alterar a frequência do oscilador para a nova nota
    osc.amp(0.5, 0.1); // Aumentar o volume
  }
}

function mousePressed() {
  for (let shape of shapes) {
    if (shape.isMouseOver()) {
      // Alterar a altura do som ao clicar na forma
      let newFreq = shape.frequency * 1.5; // Aumentar a frequência
      osc.freq(newFreq);
      shape.frequency = newFreq; // Atualizar a frequência na forma

      // Alterar a cor da forma ao clicar nela
      shape.color = [random(255), random(255), random(255)]; // Nova cor aleatória
    }
  }
}

class Shape {
  constructor(x, y, type, frequency, color) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.frequency = frequency;
    this.color = color;
  }

  display() {
    stroke(0);
    fill(this.color[0], this.color[1], this.color[2], 150); // Usar a cor da forma
    switch (this.type) {
      case 'circle':
        ellipse(this.x, this.y, 50, 50);
        break;
      case 'square':
        rect(this.x - 25, this.y - 25, 50, 50);
        break;
      case 'triangle':
        triangle(this.x, this.y - 25, this.x - 25, this.y + 25, this.x + 25, this.y + 25);
        break;
      case 'line':
        line(this.x - 25, this.y, this.x + 25, this.y);
        break;
      case 'ellipse':
        ellipse(this.x, this.y, 70, 40);
        break;
      case 'rect':
        rect(this.x - 30, this.y - 20, 60, 40);
        break;
      case 'point':
        point(this.x, this.y);
        break;
      case 'quad':
        quad(this.x - 25, this.y - 25, this.x + 25, this.y - 25, this.x + 25, this.y + 25, this.x - 25, this.y + 25);
        break;
      case 'arc':
        arc(this.x, this.y, 50, 50, 0, HALF_PI);
        break;
    }
  }

  isMouseOver() {
    // Verificar se o mouse está sobre a forma (raio de 25 pixels)
    return dist(mouseX, mouseY, this.x, this.y) < 25;
  }
}