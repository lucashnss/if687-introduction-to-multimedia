// Esse projeto permite que você transforme músicas da sua preferência, ou áudios dos mais diversos, de acordo com o volume, pitch e timbre.
// Carregue um arquivo em MP3 ao apertar no botão de escolher arquivo e altere manualmente os parâmetros Volume, Pitch e Timbre para apreciar as diferentes experiências sonoras!

let audioFile;
let audio;
let volumeSlider, pitchSlider, timbreSlider;
let fileInput;

function setup() {
  createCanvas(800, 600);
  background(220);
  
  // Create file input for audio
  fileInput = createFileInput(handleFile);
  fileInput.position(10, 10);
  
  // Create sliders for volume, pitch, and timbre
  volumeSlider = createSlider(0, 1, 0.5, 0.01);
  volumeSlider.position(10, 50);
  volumeSlider.style('width', '200px');
  
  pitchSlider = createSlider(0.5, 2, 1, 0.01);
  pitchSlider.position(10, 90);
  pitchSlider.style('width', '200px');
  
  timbreSlider = createSlider(0, 1, 0.5, 0.01);
  timbreSlider.position(10, 130);
  timbreSlider.style('width', '200px');
  
  // Create labels for sliders
  textSize(16);
  fill(0);
  text('Volume', 220, 60);
  text('Pitch', 220, 100);
  text('Timbre', 220, 140);
}

function draw() {
  background(220);
  
  // Update audio parameters
  if (audio) {
    let vol = volumeSlider.value();
    let pitch = pitchSlider.value();
    let timbre = timbreSlider.value();
    
    audio.setVolume(vol);
    audio.rate(pitch);
    
    // Timbre adjustment (basic implementation)
    // For a more advanced timbre adjustment, more sophisticated audio processing is required
    // This example just changes the playback rate slightly for a simple timbre effect
    audio.pan(timbre * 2 - 1); // Simple pan effect for timbre simulation
  }
  
  // Display slider values
  fill(0);
  textSize(16);
  text(`Volume: ${nf(volumeSlider.value(), 1, 2)}`, 10, 45);
  text(`Pitch: ${nf(pitchSlider.value(), 1, 2)}`, 10, 85);
  text(`Timbre: ${nf(timbreSlider.value(), 1, 2)}`, 10, 125);
}

function handleFile(file) {
  if (file.type === 'audio') {
    if (audio) {
      audio.stop(); // Stop any currently playing audio
    }
    audioFile = file;
    loadSound(URL.createObjectURL(file.file), loadedAudio);
  } else {
    console.log('Not an audio file!');
  }
}

function loadedAudio(loadedAudio) {
  audio = loadedAudio;
  audio.play();
}
