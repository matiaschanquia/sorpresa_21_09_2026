/* =========================================
   NAVEGACIÓN ENTRE PANTALLAS
   ========================================= */

let currentScreen = 1;

function nextScreen() {
  const current = document.getElementById(`screen-${currentScreen}`);
  current.classList.remove("active");

  currentScreen++;

  const next = document.getElementById(`screen-${currentScreen}`);

  if (next) {
    next.classList.add("active");
  }
}

/* =========================================
   VOLVER A LA PANTALLA ANTERIOR
   ========================================= */

function previousScreen() {

  // Evita volver antes de la primera pantalla
  if (currentScreen <= 1) return;

  const current = document.getElementById(
    `screen-${currentScreen}`
  );

  current.classList.remove("active");

  currentScreen--;

  const previous = document.getElementById(
    `screen-${currentScreen}`
  );

  previous.classList.add("active");

}


/* =========================================
   REPRODUCTOR DE AUDIO REAL
   =========================================

   El audio se encuentra en index.html:

   <audio id="audio" src="musica.mp3">

   Solo tenés que poner "musica.mp3"
   dentro de la carpeta del proyecto.

   El reproductor obtiene automáticamente:
   - duración total
   - tiempo transcurrido
   - progreso
   - final de la canción
*/


const audio = document.getElementById("audio");

const playButton = document.getElementById("play-button");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");

const elapsed = document.getElementById("elapsed");
const duration = document.getElementById("duration");


/* =========================================
   FORMATO DEL TIEMPO
   ========================================= */

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${minutes}:${String(secs).padStart(2, "0")}`;
}


/* =========================================
   PLAY / PAUSE
   ========================================= */

function toggleMusic() {

  if (!audio) return;

  if (audio.paused) {

    audio.play();

    playButton.textContent = "Ⅱ";

  } else {

    audio.pause();

    playButton.textContent = "▶";
  }
}


/* =========================================
   CUANDO EL AUDIO CARGA SU DURACIÓN
   ========================================= */

audio.addEventListener("loadedmetadata", () => {

  duration.textContent = formatTime(audio.duration);

});


/* =========================================
   ACTUALIZAR LA BARRA MIENTRAS SUENA
   ========================================= */

audio.addEventListener("timeupdate", () => {

  if (!audio.duration) return;

  const percentage =
    (audio.currentTime / audio.duration) * 100;

  progressBar.style.width = `${percentage}%`;

  elapsed.textContent =
    formatTime(audio.currentTime);

});


/* =========================================
   CLIC EN LA BARRA = CAMBIAR DE MOMENTO
   ========================================= */

progress.addEventListener("click", (event) => {

  if (!audio.duration) return;

  const rect = progress.getBoundingClientRect();

  const clickPosition =
    event.clientX - rect.left;

  const percentage =
    clickPosition / rect.width;

  audio.currentTime =
    percentage * audio.duration;

});


/* =========================================
   CUANDO TERMINA LA CANCIÓN
   ========================================= */

audio.addEventListener("ended", () => {

  playButton.textContent = "▶";

  progressBar.style.width = "0%";

  elapsed.textContent = "0:00";

  audio.currentTime = 0;

});

/* =========================================
   AGREGAR FLORES AL TOCAR EL BOTÓN
   ========================================= */

function addFlowers() {

  const garden = document.getElementById("flower-garden-final");

  const numberOfFlowers = 3;

  for (let i = 0; i < numberOfFlowers; i++) {

    const flower = document.createElement("div");

    flower.classList.add(
      "css-flower",
      "temporary-flower"
    );

    // Posición aleatoria
    const position = Math.random() * 85 + 5;

    flower.style.left = `${position}%`;

    // Pequeña variación de tamaño
    const scale = 0.75 + Math.random() * 0.35;

    flower.style.transform = `scale(${scale})`;


    // CABEZA

    const head = document.createElement("div");

    head.classList.add("flower-head");


    // 5 pétalos

    for (let j = 0; j < 5; j++) {

      const petal = document.createElement("div");

      petal.classList.add("petal");

      head.appendChild(petal);
    }


    // TALLO

    const stem = document.createElement("div");

    stem.classList.add("stem");


    // HOJA

    const leaf = document.createElement("div");

    leaf.classList.add("leaf");


    // ARMAMOS LA FLOR

    flower.appendChild(head);
    flower.appendChild(stem);
    flower.appendChild(leaf);

    garden.appendChild(flower);


    // La eliminamos del HTML después de desaparecer

    setTimeout(() => {

      flower.remove();

    }, 9000);

  }
}