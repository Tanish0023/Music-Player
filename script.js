// import { musicJSONfetchName, songSearch } from "./song search.js";

const genreArray = ["All", "hip hop", "pop", "worship"];
const audioEle = new Audio();

const bottomBackwardEle = document.getElementById("bottom-backward");
const bottomForwardEle = document.getElementById("bottom-forward");
const musicGif = document.getElementById("music-play-gif");
const musicGifPtag = document.getElementById("music-play-gif-songname");
const bottomDurationEle = document.getElementById("bottom-duration");
const topSearchEle = document.getElementById("top-search");
const topBtnSearchEle = document.getElementById("top-btn-search");
const songListEle = document.getElementById("song-list");
songListEle.innerText = "";

async function musicJSONfetch(genreArrayDisplay) {
  try {
    const response = await fetch("music.json");

    if (!response) {
      throw new Error("JSON not found!!");
    }
    const data = await response.json();
    main(data, genreArrayDisplay);
  } catch (error) {
    console.error(error);
  }
}

async function musicJSONfetchName(name) {
  try {
    const response = await fetch("music.json");

    if (!response) {
      throw new Error("JSON not found!!");
    }
    const data = await response.json();
    songSearch(data, name);
  } catch (error) {
    console.error(error);
  }
}

function songSearch(data, name) {
  genreArray.forEach((genre) => {
    if (genre !== "All") {
      for (let i = 0; i < data[genre].length; i++) {
        if (data[genre][i]["songName"].toLowerCase() === name.trim()) {
          songListEle.innerText = "";
          const songDataEle = document.createElement("div");
          songDataEle.classList.add("song-data");

          songDataEle.style.backgroundColor = "blue";
          songDataEle.style.margin = "10px";

          const songNameEle = document.createElement("p");
          songNameEle.classList.add("song-name-left");
          const songCoverEle = document.createElement("img");
          songCoverEle.classList.add("song-cover-sm");
          const songPlayBtnLeft = document.createElement("i");
          songPlayBtnLeft.classList.add(
            "fa-solid",
            "fa-circle-play",
            "songPlayBtn-sm"
          );

          // play and pause control
          songPlayBtnLeft.addEventListener("click", () => {
            songPlayBtnLeft.classList.add("fa-circle-play");
            songPlay(data[genre][i]["songPath"]);
            musicDisplay(data[genre][i]);
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            musicGif.style.opacity = 1;
            musicGifPtag.textContent = data[genre][i]["songName"];
            bottomDurationEle.textContent =
              Math.floor(totalSec / 60) + (totalSec % 60) / 100;
          });

          const songDurationleft = document.createElement("p");
          const songDataleft = document.createElement("div");
          songDataleft.classList.add("song-data-left");

          songNameEle.textContent = data[genre][i]["songName"];
          songCoverEle.src = data[genre][i]["songCover"];
          songCoverEle.alt = "Cover Img";
          const totalSec = data[genre][i]["duration"];
          songDurationleft.textContent =
            Math.floor(totalSec / 60) + ":" + (totalSec % 60);

          songDataEle.appendChild(songCoverEle);
          songDataEle.appendChild(songNameEle);
          songDataleft.appendChild(songDurationleft);
          songDataleft.appendChild(songPlayBtnLeft);
          songDataEle.appendChild(songDataleft);

          songListEle.appendChild(songDataEle);
        }
      }
    }
  });
}

function songPlay(path) {
  audioEle.src = path;
  if (audioEle.paused || audioEle.currentTime <= 0) {
    audioEle.play();
  } else {
    audioEle.pause();
    audioEle.play();
  }
}

if (audioEle.currentTime === 0) {
  audioEle.pause();
}

// **************************** BOTTOM BTN *******************************
const masterPlay = document.getElementById("masterplay");

masterPlay.addEventListener("click", () => {
  if (audioEle.paused || audioEle.currentTime <= 0) {
    audioEle.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    musicGif.style.opacity = 1;
  } else {
    audioEle.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    musicGif.style.opacity = 0;
  }
});

// **************************** PROGRESS BAR *******************************
const myProgressBar = document.getElementById("songProgressBar");

audioEle.addEventListener("timeupdate", () => {
  let progress = parseInt((audioEle.currentTime / audioEle.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioEle.currentTime = (myProgressBar.value * audioEle.duration) / 100;
});

// **************************** ARRAY DISPLAY *******************************
function genreArrayDisplay(genreSelected) {
  const selectGenreEle = document.getElementById("genre-select");
  selectGenreEle.innerText = "";

  genreArray.forEach((genre) => {
    const genreEle = document.createElement("option");
    genreEle.textContent = genre;
    selectGenreEle.appendChild(genreEle);
  });

  musicJSONfetch(genreSelected);
}

function musicDisplay(data) {
  const songCoverEle = document.getElementById("song-cover");
  songCoverEle.innerText = "";
  const songNameEle = document.getElementById("song-name");
  songNameEle.innerText = "";
  const artistNameEle = document.getElementById("artist-name");
  artistNameEle.innerText = "";

  const songCoverImg = document.createElement("img");
  songCoverImg.src = data["songCover"];

  const songNamePtag = document.createElement("p");
  songNamePtag.textContent = data["songName"];

  const artistNamePtag = document.createElement("p");
  artistNamePtag.textContent = data["artistName"];

  songCoverEle.appendChild(songCoverImg);
  songNameEle.appendChild(songNamePtag);
  artistNameEle.appendChild(artistNamePtag);
}

function dataDisplay(data, genre) {
  for (let i = 0; i < data[genre].length; i++) {
    const songDataEle = document.createElement("div");
    songDataEle.classList.add("song-data");

    songDataEle.style.backgroundColor = "blue";
    songDataEle.style.margin = "10px";

    const songNameEle = document.createElement("p");
    songNameEle.classList.add("song-name-left");
    const songCoverEle = document.createElement("img");
    songCoverEle.classList.add("song-cover-sm");
    const songPlayBtnLeft = document.createElement("i");
    songPlayBtnLeft.classList.add(
      "fa-solid",
      "fa-circle-play",
      "songPlayBtn-sm"
    );

    // play and pause control
    songPlayBtnLeft.addEventListener("click", () => {
      songPlayBtnLeft.classList.add("fa-circle-play");
      songPlay(data[genre][i]["songPath"]);
      musicDisplay(data[genre][i]);
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      musicGif.style.opacity = 1;
      musicGifPtag.textContent = data[genre][i]["songName"];
      bottomDurationEle.textContent =
        Math.floor(totalSec / 60) + (totalSec % 60) / 100;
    });

    const songDurationleft = document.createElement("p");
    const songDataleft = document.createElement("div");
    songDataleft.classList.add("song-data-left");

    songNameEle.textContent = data[genre][i]["songName"];
    songCoverEle.src = data[genre][i]["songCover"];
    songCoverEle.alt = "Cover Img";
    const totalSec = data[genre][i]["duration"];
    songDurationleft.textContent =
      Math.floor(totalSec / 60) + ":" + (totalSec % 60);

    songDataEle.appendChild(songCoverEle);
    songDataEle.appendChild(songNameEle);
    songDataleft.appendChild(songDurationleft);
    songDataleft.appendChild(songPlayBtnLeft);
    songDataEle.appendChild(songDataleft);

    songListEle.appendChild(songDataEle);
  }
}

function main(data, genreSelected) {
  songListEle.innerText = "";
  if (genreSelected === "All") {
    genreArray.forEach((genreSelected) => {
      if (genreSelected !== "All") {
        dataDisplay(data, genreSelected);
      }
    });
  } else {
    dataDisplay(data, genreSelected);
  }

  topBtnSearchEle.addEventListener("click", () => {
    if (genreArray.includes(topSearchEle.value.toLowerCase())) {
      genreArrayDisplay(topSearchEle.value.toLowerCase());
    } else {
      // genreArray.forEach((genreSelected) => {
      //   for (let i = 0; i < data[genre].length; i++) {
      //     if (genreSelected === data[genre][i]["songName"]) {
      //       musicJSONfetchName();
      //     }
      //   }
      // });
      musicJSONfetchName(topSearchEle.value.toLowerCase());
    }

    topSearchEle.value = "";
  });
}

genreArrayDisplay("All");

function getOption() {
  const selectElement = document.getElementById("genre-select");
  musicJSONfetch(selectElement.value);
}

// bottomBackwardEle.addEventListener("click", () => {
//   if (i - 1 >= 0) {
//     // songPlay(data[genre][i - 1]["songPath"]);
//     i++;
//     console.log("backward");
//   } else {
//     // songPlay(data[genreArray[i]][genre.length - 1]["songPath"]);
//   }
// });

// bottomForwardEle.addEventListener("click", () => {
//   if (i - 1 > -1) {
//     songPlay(data[genre][i + 1]["songPath"]);
//     console.log("forward");
//   } else {
//     songPlay(data[genreArray[i]][genre.length - 1]["songPath"]);
//   }
// });
