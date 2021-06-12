"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "12epLU2zbSRAPyPIZlOoGB";

const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=individualArtist`;

window.addEventListener("load", start);

function start() {
  console.log("start");

  // show data at load
  loadJSON(link, showData);
}

// loads data
function loadJSON(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      callback(jsonData);
    });
}

const playlists = {
  live:
    "https://open.spotify.com/playlist/3Nhtd3UIA3ZOnbadvlB8eP?si=07aa078ef4eb4633",
  disco:
    "https://open.spotify.com/playlist/6b4H28FXufCiF0sENtL0iV?si=441a6a8cfc6f4ff6",
  teknotunnel:
    "https://open.spotify.com/playlist/1Zb53rJIv2HsbeYufPfDCR?si=6910ceb63d0f4dae",
  urban:
    "https://open.spotify.com/playlist/1o21gcE79dD0MyIglmhe1L?si=f5c966eefeec4227",
  rave:
    "https://open.spotify.com/playlist/7lsNafhgKHk144rOODp1Yn?si=14226af0c8fc4189",
};

function showData(data) {
  console.log(data);
  const container = document.querySelector(".program-container");
  const template = document.querySelector("template");
  container.innerHTML = "";

  const scener = ["Live", "Urban", "Rave", "Tekno Tunnel", "Disco"];

  scener.forEach((scene) => {
    let clone = template.cloneNode(true).content;
    clone.querySelector(".scene-title").textContent = scene + " stage";

    // const stage = scene.toLowerCase()

    if (scene !== "Tekno Tunnel") {
      clone.querySelector(".playlist").href = playlists[scene.toLowerCase()];
    } else {
      clone.querySelector(".playlist").href = playlists.teknotunnel;
    }

    data.items.forEach((artist) => {
      // first only select the artists that correspond to the right scene
      if (artist.fields.scene.toLowerCase() === scene.toLowerCase()) {
        // then check which day they're playing

        // Artists for friday
        if (artist.fields.day === "Friday") {
          let name = document.createElement("li");
          let time = document.createElement("li");

          name.textContent = artist.fields.artistName;
          time.textContent = artist.fields.time;

          time.classList.add("cursor-link");
          name.classList.add("cursor-link");

          name.addEventListener("click", () => {
            location.href = "artist.html?id=" + artist.sys.id;
          });

          clone.querySelector(".friday .artists").append(name);
          clone.querySelector(".friday .time").append(time);

          // Artists for Saturday
        } else if (artist.fields.day === "Saturday") {
          let name = document.createElement("li");
          let time = document.createElement("li");

          name.textContent = artist.fields.artistName;
          time.textContent = artist.fields.time;

          time.classList.add("cursor-link");
          name.classList.add("cursor-link");

          name.addEventListener("click", () => {
            location.href = "artist.html?id=" + artist.sys.id;
          });

          clone.querySelector(".saturday .artists").append(name);
          clone.querySelector(".saturday .time").append(time);
        }
      }
    });

    container.appendChild(clone);
  });
}
