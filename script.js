const songs = [
  { name: "Honey Kisses", src: "music/cancion1.mp3" },
  { name: "Music free", src: "music/cancion2.mp3" },
  { name: "MONTAGEM DIREÇÃO", src: "music/cancion3.mp3", cover: "img/cover3.jpg"},
  { name: "MONTAGEM COMA", src: "music/cancion4.mp3", cover: "img/cover4.jpg"},
  { name: "MONTAGEM TOMADA", src: "music/cancion5.mp3", cover: "img/cover5.jpg"}
];

let currentIndex = 0;
const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("nowPlaying");

function playSong(index) {
  currentIndex = index;
  audio.src = songs[index].src;
  audio.play();

  nowPlaying.textContent = "Reproduciendo: " + songs[index].name;

  document.getElementById("cover").src = songs[index].cover;
}
function togglePlay() {
  if (audio.src === "") return;
  audio.paused ? audio.play() : audio.pause();  
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  playSong(currentIndex);
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
}
function changeVolume(value) {
  audio.volume = value;
}   
audio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  document.getElementById("progress").style.width = percent + "%";

  document.getElementById("currentTime").textContent = formatTime(audio.currentTime);
  document.getElementById("duration").textContent = formatTime(audio.duration);
}
function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
audio.addEventListener("ended", () => {
  nextSong();
}); 