// Utilize iteração para criar uma exibição interativa com uma série de dez linhas. Cada linha deve conectar o cursor a um dos pontos 
// distribuídos uniformemente pela tela.

function setup() {
    createCanvas(800,800)
  }
  
  function draw() {  
    background(200);
  
    for (let i = 0;i<10;i++){
      line(mouseX, mouseY,(800/10)*i,0);
    }  
  }