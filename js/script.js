"use strict";

const imgEl = document.getElementById("bg_img");
const imgCoverEl = document.getElementById("cover");
const musicTitleEl = document.getElementById("music_title");
const musicArtistEl = document.getElementById("music_artist");
const songProgressEL = document.getElementById("song_progress");
const progressBarEL = document.getElementById("progress");
const currentTimeEL = document.getElementById("current_time");
const durationEL = document.getElementById("duration");

const prevBtnEl = document.getElementById("prev");
const playBtnEl = document.getElementById("play");
const nextBtnEl = document.getElementById("next");

const songs = [
    {
        path: "songs_and_img/Chocolate.mp3",
        name: "Chocolate",
        cover_img: "songs_and_img/Chocolate_img.png",
        artist: "The 1975",
    },
    {
        path: "songs_and_img/Funky_Monks.mp3",
        name: "Funky Monks",
        cover_img: "songs_and_img/FM_img.png",
        artist: "Red Hot Chili Peppers",
    }
];

const music = new Audio();
let music_index = 0;
let isPlaying = false;

function togglePlay() {
    isPlaying ? pauseMusic() : playMusic();
}

function playMusic() {
    isPlaying = true;
    playBtnEl.classList.replace("fa-play", "fa-pause");
    playBtnEl.setAttribute("title", "Pause");
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtnEl.classList.replace("fa-pause", "fa-play");
    playBtnEl.setAttribute("title", "Play");
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    musicTitleEl.textContent = song.name;
    musicArtistEl.textContent = song.artist;
    imgCoverEl.src = song.cover_img;
    imgEl.src = song.cover_img;
}

function changeSong(direction) {
    music_index = (music_index + direction + songs.length) % songs.length;
    loadMusic(songs[music_index]);
    playMusic();
}

function setProgressBar(e) {
    const width = songProgressEL.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function updateProgressBar() {
    if (music.duration) {
        const { duration, currentTime } = music;
        const progressPercent = (currentTime / duration) * 100;
        progressBarEL.style.width = `${progressPercent}%`;

        const formatTime = (time) =>
            String(Math.floor(time / 60)) + ":" + String(Math.floor(time % 60)).padStart(2, "0");

        currentTimeEL.textContent = formatTime(currentTime);
        durationEL.textContent = formatTime(duration);
    }
}

function btnEvents() {
    playBtnEl.addEventListener("click", togglePlay);
    nextBtnEl.addEventListener("click", () => changeSong(1));
    prevBtnEl.addEventListener("click", () => changeSong(-1));

    songProgressEL.addEventListener("click", setProgressBar);
    music.addEventListener("ended", () => changeSong(1));
    music.addEventListener("timeupdate", updateProgressBar);
}

document.addEventListener("DOMContentLoaded", () => {
    loadMusic(songs[music_index]);
    btnEvents();
});
