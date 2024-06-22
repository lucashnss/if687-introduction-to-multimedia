let rectNum = 10;
function setup() {
  createCanvas(600, 650);
}

function draw() {
  background(220);
  
  for (let i=0;i<10;i++){
    
    // Os retângulos variam em [1] altura: à medida que o cursor é levado para cima os retângulos sobem mais, de acordo com rectsheight e y

    rectHeight = map(mouseY,650,0,0,650)
    rectsWidth = 600/rectNum;
    
    // Os retângulos variam em [2] cor: os tons de vermelho mudam com a variação horizontal do mouse,  e os tons de verde com a variação vertical

    r = map(mouseX,0,600,0,255);
    g = map(mouseY,0,650,0,255);
    b = 100;
    
    fill(r,g,b);
    
    
    let y = 650 - (i+1) * (rectHeight/ rectNum);
    let rectsheight = (i + 1) * ((rectHeight) / rectNum);
    
  // Os retântugulos também variam em [3] posição: a cada iteração o retângulo desloca sua posição x de acordo com sua largura
    rect(i*rectsWidth,y,rectsWidth,rectsheight);
  }
}