// Escreva um programa que gere uma linha tracejada entre dois pontos. (Você não pode usar uma linha tracejada "pronta"). Seus traços 
// devem ter sempre um comprimento fixo, como 10 pixels, de modo que linhas mais longas precisem de mais traços. Conecte uma das
//  extremidades da linha ao cursor.

let beginPoint, cursorPoint;

function setup() {
  createCanvas(600, 650);
  beginPoint = null;
}


function mouseClicked(){
  
  beginPoint = [mouseX,mouseY];
  
  console.log("Begin point: ",beginPoint)
  
}

// ao ser clicado em algum lugar da tela o ponto inicial é escolhido então são montados os segmentos de reta até onde o cursor se encontra
function draw() {
  background(220);
  
  cursorPoint = [mouseX,mouseY];
  
  console.log("End point: ",cursorPoint);
  
  if (beginPoint != null) {
    point(beginPoint[0], beginPoint[1]);
    
    let pointDist = dist(beginPoint[0],beginPoint[1],cursorPoint[0],cursorPoint[1])
  
    console.log("Distância entre os pontos: ", pointDist);
    
    let segs = pointDist/25; // tamanho dos segmentos
    
    let iterX = (cursorPoint[0] - beginPoint[0])/segs;
    let iterY = (cursorPoint[1] - beginPoint[1])/segs;
    
    let x1,y1,x2,y2;
    x1 = beginPoint[0];
    y1 = beginPoint[1];
    
  for (let i=0;i<segs;i++){
    x2 = x1 + iterX;
    y2 = y1 + iterY;
    
    line(x1,y1,x2,y2);
    
    x1 = x2 + iterX;
    y1 = y2 + iterY;
    } 
  }
}