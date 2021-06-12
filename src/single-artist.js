"use strict";

document.addEventListener("DOMContentLoaded", start);

import { accessToken, spaceID } from "../config/contentful";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const entryID = id;
const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/${entryID}?access_token=${accessToken}&include=10`;

function start() {
  // show data at load
  loadJSON(link, showData);
}

document.querySelector(".back-button a").addEventListener("click", () => {
  history.back();
});

// loads data
function loadJSON(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      callback(jsonData);
    });
}

function showData(data) {
  console.log(data);

  document.querySelector(".artist-name").textContent = data.fields.artistName;
  document.querySelector(".artist-info").textContent =
    data.fields.day + " / " + data.fields.scene + " / " + data.fields.time;
  //   https://open.spotify.com/embed/track/
  if (data.fields.spotifyTrackLink) {
    document.querySelector("iframe").src = data.fields.spotifyTrackLink;
  } else {
    document.querySelector(".player-container").style.display = "none";
  }

  if (data.fields.facebookLink) {
    document.querySelector(".facebook a").href = data.fields.facebookLink;
  } else {
    document.querySelector(".facebook").style.display = "none";
  }

  if (data.fields.instagramLink) {
    document.querySelector(".instagram a").href = data.fields.instagramLink;
  } else {
    document.querySelector(".instagram").style.display = "none";
  }

  if (data.fields.soundCloudLink) {
    document.querySelector(".soundcloud a").href = data.fields.soundCloudLink;
  } else {
    document.querySelector(".soundcloud").style.display = "none";
  }

  if (data.fields.spotifyLink) {
    document.querySelector(".spotify a").href = data.fields.spotifyLink;
  } else {
    document.querySelector(".spotify").style.display = "none";
  }

  if (
    data.fields.spotifyLink ||
    data.fields.soundCloudLink ||
    data.fields.instagramLink ||
    data.fields.facebookLink
  ) {
    console.log("some link are there");
  } else {
    console.log("no links");
    document.querySelector(".explore-text").style.display = "none";
  }

  if (data.fields.artistPhoto) {
    const assetID = data.fields.artistPhoto.sys.id;
    const imgLink = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/assets/${assetID}?access_token=${accessToken}`;
    loadJSON(imgLink, showImage);
  }

  document.querySelector(".artist-photo").style.backgroundColor = "#E8E2FF";
}

function showImage(data) {
  console.log(data);

  document.querySelector(
    ".artist-photo"
  ).style.backgroundImage = `url(${data.fields.file.url})`;
}
