const audioElement = document.getElementById("background-audio");
export const sounds = [
  "/Assets/Sound/Cave_Sound00.mp3",
  "/Assets/Sound/Cave_Sound01.mp3",
  "/Assets/Sound/Cave_Sound02.mp3",
  "/Assets/Sound/Cave_Sound03.mp3",
  "/Assets/Sound/Cave_Sound04.mp3",
  "/Assets/Sound/Cave_Sound05.mp3",
  
];

export function playRandomSound() {
  const randomIndex = Math.floor(Math.random() * sounds.length);
  audioElement.src = sounds[randomIndex];
  audioElement.play();
}

function scheduleSoundPlayback() {
  // Define el porcentaje de probabilidad (por ejemplo, 40%)
  const probability = 40;
  const randomChance = Math.random() * 100;

  if (randomChance < probability) {
    playRandomSound();
  }

  // Define el intervalo de tiempo en milisegundos (por ejemplo, cada 5 segundos)
  const interval = 30000;
  setTimeout(scheduleSoundPlayback, interval);
}

// Inicia la programación de la reproducción de sonidos
scheduleSoundPlayback();

  