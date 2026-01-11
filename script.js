const songs = [
  { name: "MONTAGEM DIREÇÃO", src: "music/cancion3.mp3", cover: "img/cover3.jpg"},
  { name: "MONTAGEM COMA", src: "music/cancion4.mp3", cover: "img/cover4.jpg"},
  { name: "MONTAGEM TOMADA", src: "music/cancion5.mp3", cover: "img/cover5.jpg"},
  { name: "On the flip", src: "music/cancion6.mp3", cover: "img/cover6.jpg"},
  { name: "By myself", src: "music/cancion7.mp3", cover: "img/cover7.jpg"},
];

let currentIndex = 0;

const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("nowPlaying");
const playBtn = document.getElementById("playBtn");
const coverImg = document.getElementById("cover");

/* ▶️ Reproducir canción */
function playSong(index) {
  currentIndex = index;
  audio.src = songs[index].src;
  audio.play();

  nowPlaying.textContent = "Reproduciendo: " + songs[index].name;
  coverImg.src = songs[index].cover || "img/default.jpg";

  playBtn.textContent = "⏸";
}

/* ⏯ Toggle play / pausa */
function togglePlay() {
  if (!audio.src) return;

  const songName = songs[currentIndex].name;

  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
    nowPlaying.textContent = "Reproduciendo: " + songName;
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
    nowPlaying.textContent = "Pausado: " + songName;
  }
}

/* ⏭ Siguiente */
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
}

/* ⏮ Anterior */
function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
}

/* 🔊 Volumen */
function changeVolume(value) {
  audio.volume = value;
}

/* ⏱ Barra de progreso */
audio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  if (isNaN(audio.duration)) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  document.getElementById("progress").style.width = percent + "%";

  document.getElementById("currentTime").textContent = formatTime(audio.currentTime);
  document.getElementById("duration").textContent = formatTime(audio.duration);
}

/* 🖱 Click en barra de progreso */
function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

/* ⏱ Formato tiempo */
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

/* 🔁 Autoplay siguiente */
audio.addEventListener("ended", nextSong);

/* 🎵 CLICK EN PLAYLIST (LO QUE ME PEDISTE) */
document.querySelectorAll(".playlist li").forEach((li, index) => {
  li.dataset.index = index;
  li.addEventListener("click", () => {
    playSong(index);
  });
});