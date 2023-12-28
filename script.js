const genreArray = ["All", "hip hop", "pop", "worship"];
let playlistObj = {};
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
const myProgressBar = document.getElementById("songProgressBar");
const playlistInputEle = document.getElementById("playlist-create");
const currentPlaylistEle = document.getElementById("current-playlist");
const myPlaylistEle = document.getElementById("my-playlist");

document.getElementById("playlist-create-btn").addEventListener("click", () => {
  let playlistName = playlistInputEle.value;
  playlistObj[playlistName] = [];
  playlistInputEle.value = "";

  myPlaylistEle.innerText = "";

  const playlistPtagEle = document.createElement("p");
  playlistPtagEle.textContent = "Your Playlist: ";
  playlistPtagEle.classList.add("playlist-p-tag");
  myPlaylistEle.appendChild(playlistPtagEle);

  Object.keys(playlistObj).forEach((playlist) => {
    const myPlaylistBtnEle = document.createElement("button");
    myPlaylistBtnEle.classList.add("my-playlist-btn");
    myPlaylistBtnEle.textContent = playlist;
    myPlaylistEle.appendChild(myPlaylistBtnEle);

    myPlaylistBtnEle.addEventListener("click", () => {
      currentPlaylistEle.innerText = "";
      const currentPlaylistPtag = document.createElement("p");
      currentPlaylistPtag.textContent = "Current Playlist";
      currentPlaylistEle.appendChild(currentPlaylistPtag);

      for (let i = 0; i < playlistObj[playlist].length; i++) {
        const data = playlistObj[playlist][i];
        const currentPlaylistBtnEle = document.createElement("button");
        currentPlaylistBtnEle.textContent = data[0]["songName"];

        currentPlaylistEle.appendChild(currentPlaylistBtnEle);

        currentPlaylistBtnEle.addEventListener("click", () => {
          songPlay(data[0]["songPath"]);
          musicDisplay(data);
          const totalSec = data[0]["duration"];

          masterPlay.classList.remove("fa-play-circle");
          masterPlay.classList.add("fa-pause-circle");
          musicGif.style.opacity = 1;
          musicGifPtag.textContent = data[0]["songName"];
          bottomDurationEle.textContent =
            Math.floor(totalSec / 60) + (totalSec % 60) / 100;

          // **************************** PROGRESS BAR *******************************

          audioEle.addEventListener("timeupdate", () => {
            let progress = parseInt(
              (audioEle.currentTime / audioEle.duration) * 100
            );
            myProgressBar.value = progress;

            bottomDurationEle.textContent =
              Math.floor((totalSec - audioEle.currentTime) / 60) +
              ":" +
              ((totalSec - audioEle.currentTime) % 60).toFixed(0);
          });

          myProgressBar.addEventListener("change", () => {
            audioEle.currentTime =
              (myProgressBar.value * audioEle.duration) / 100;
          });
        });
      }
    });
  });
});

function getOption() {
  const selectElement = document.getElementById("genre-select");
  musicJSONfetch(selectElement.value);
}

// *************************** MUSIC JSON FETCH *******************************

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

// ***************************** SONG SEARCH **********************************

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
        if (
          data[genre][i]["songName"].toLowerCase() === name.trim() ||
          data[genre][i]["artistName"].toLowerCase() === name.trim()
        ) {
          const songDataEle = document.createElement("div");
          songDataEle.classList.add("song-data");

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

            // **************************** PROGRESS BAR *******************************

            audioEle.addEventListener("timeupdate", () => {
              let progress = parseInt(
                (audioEle.currentTime / audioEle.duration) * 100
              );
              myProgressBar.value = progress;
              bottomDurationEle.textContent =
                Math.floor((totalSec - audioEle.currentTime) / 60) +
                ":" +
                ((totalSec - audioEle.currentTime) % 60).toFixed(0);
            });

            myProgressBar.addEventListener("change", () => {
              audioEle.currentTime =
                (myProgressBar.value * audioEle.duration) / 100;
            });
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

// ******************************* SONG PLAY ********************************

function songPlay(path) {
  audioEle.src = path;
  if (audioEle.paused || audioEle.currentTime <= 0) {
    audioEle.play();
  } else {
    audioEle.pause();
    audioEle.play();
  }
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

// ********************* MUSIC COVER AND DETAILS DISPLAY **********************

function musicDisplay(data) {
  const songCoverEle = document.getElementById("song-cover");
  songCoverEle.innerText = "";
  const songNameEle = document.getElementById("song-name");
  songNameEle.innerText = "";
  const artistNameEle = document.getElementById("artist-name");
  artistNameEle.innerText = "";
  const addToPlaylistEle = document.getElementById("add-to-playlist-btn");
  addToPlaylistEle.innerText = "";

  const songCoverImg = document.createElement("img");
  songCoverImg.src = data["songCover"];

  const songNamePtag = document.createElement("p");
  songNamePtag.textContent = data["songName"];

  const artistNamePtag = document.createElement("p");
  artistNamePtag.textContent = data["artistName"];

  const addToPlaylistBtn = document.createElement("button");
  addToPlaylistBtn.textContent = "Add To Playlist";

  addToPlaylistBtn.addEventListener("click", () => {
    const addPlaylistName = prompt("Enter the playlist name: ");
    for (let i = 0; i < Object.keys(playlistObj).length; i++) {
      if (addPlaylistName === Object.keys(playlistObj)[i]) {
        playlistObj[Object.keys(playlistObj)[i]].push([data]);
      }
    }
  });

  songCoverEle.appendChild(songCoverImg);
  songNameEle.appendChild(songNamePtag);
  artistNameEle.appendChild(artistNamePtag);
  addToPlaylistEle.appendChild(addToPlaylistBtn);
}

// *************************** SONG DATA DISPLAY ******************************

function dataDisplay(data, genre) {
  for (let i = 0; i < data[genre].length; i++) {
    const songDataEle = document.createElement("div");
    songDataEle.classList.add("song-data");

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

      // **************************** PROGRESS BAR *******************************

      audioEle.addEventListener("timeupdate", () => {
        let progress = parseInt(
          (audioEle.currentTime / audioEle.duration) * 100
        );
        myProgressBar.value = progress;

        bottomDurationEle.textContent =
          Math.floor((totalSec - audioEle.currentTime) / 60) +
          ":" +
          ((totalSec - audioEle.currentTime) % 60).toFixed(0);
      });

      myProgressBar.addEventListener("change", () => {
        audioEle.currentTime = (myProgressBar.value * audioEle.duration) / 100;
      });
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
    songListEle.innerText = "";
    if (genreArray.includes(topSearchEle.value.toLowerCase())) {
      genreArrayDisplay(topSearchEle.value.toLowerCase());
    } else {
      musicJSONfetchName(topSearchEle.value.toLowerCase());
    }

    topSearchEle.value = "";
  });
}

// --body-color: antiquewhite;
// --main-bg-color-white: white;
// --border-hover-grey: grey;
// --hover-black: black;
// --background-div: rgba(94, 245, 142, 0.7);
// --create-btn: rgba(4, 63, 22, 0.7);

function toggleTheme(obj) {
  var r = document.querySelector(":root");
  if (obj.checked) {
    r.style.setProperty("--body-color", "antiquewhite");
    r.style.setProperty("--main-bg-color-white", "white");
    r.style.setProperty("--border-hover-grey", "grey");
    r.style.setProperty("--hover-black", "white");
    r.style.setProperty("--background-div", "rgb(17, 41, 90)");
    r.style.setProperty("--create-btn", "rgba(4, 63, 22, 0.7)");
  } else {
    r.style.setProperty("--body-color", "antiquewhite");
    r.style.setProperty("--main-bg-color-white", "white");
    r.style.setProperty("--border-hover-grey", "grey");
    r.style.setProperty("-hover-black", "black");
    r.style.setProperty("--background-div", "rgba(94, 245, 142, 0.7)");
    r.style.setProperty("--create-btn", "rgba(4, 63, 22, 0.7)");
  }
}

genreArrayDisplay("All");
