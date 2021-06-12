"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "7k6leOigNpIaVOJ3Nf9Mrb";
const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/${entryID}?access_token=${accessToken}`;
const artistsLink = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=individualArtist`;

window.addEventListener("load", start);

function start() {
  console.log("start");

  // if ("fonts" in document) {
  //   let font = new FontFace(
  //     "Pilowlava-Regular",
  //     "url(/__/fonts/Pilowlava-Regular.woff2) format('woff2'), url(/__/fonts/Pilowlava-Regular.woff) format('woff')"
  //   );

  //   Promise.all([font.load()]).then(function (loadedFonts) {
  //     // Render them at the same time
  //     loadedFonts.forEach(function (font) {
  //       document.fonts.add(font);
  //     });
  //   });
  // }

  // if ("fonts" in document) {
  //   let font = new FontFace(
  //     "Pilowlava-Regular",
  //     "url(https://lauraragnars.dk/fonts/Pilowlava-Regular.woff2) format('woff2'), url(https://lauraragnars.dk/fonts/Pilowlava-Regular.woff) format('woff')"
  //   );

  //   Promise.all([font.load()]).then(function (loadedFonts) {
  //     // Render them at the same time
  //     loadedFonts.forEach(function (font) {
  //       document.fonts.add(font);
  //     });
  //   });
  // }

  // show data at load
  loadJSON(link, showData);
  loadJSON(artistsLink, showHeadliners);

  countdown();
  animateText();
}

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

  document.querySelector(".about-text-header").textContent =
    data.fields.aboutHeader;
  document.querySelector(".about-text").textContent = data.fields.aboutText;
}

function showHeadliners(data) {
  console.log("show headliners", data);

  data.items.forEach((artist) => {
    if (artist.fields.isHeadliner === true) {
      console.log(artist.fields.artistName);

      let div = document.createElement("div");
      div.classList.add("headliner-item");
      div.classList.add("cursor-link");
      div.textContent = artist.fields.artistName;

      div.addEventListener("click", () => {
        location.href = "artist.html?id=" + artist.sys.id;
      });

      document.querySelector("#headliners").append(div);
    }
  });
}

function countdown() {
  const countDownDate = new Date("Jun 4, 2022 16:00:00").getTime();

  const myfunc = setInterval(function () {
    let now = new Date().getTime();
    let timeleft = countDownDate - now;

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    document.querySelector(".days").textContent = days;
    document.querySelector(".hours").textContent = hours;
    document.querySelector(".mins").textContent = minutes;
    document.querySelector(".secs").textContent = seconds;
  }, 1000);
}

function animateText() {
  document.fonts.ready.then(function () {
    const elem = document.querySelector(".splash-text");
    const text = new Blotter.Text("DISTORTION Ø", {
      family: "Pilowlava-Regular",
      weight: 100,
      size: 150,
      fill: "white",
    });

    let material = new Blotter.RollingDistortMaterial();

    material.uniforms.uSineDistortAmplitude.value = 0.04;

    let blotter = new Blotter(material, {
      texts: text,
    });

    let scope = blotter.forText(text);

    scope.appendTo(elem);
  });
}
