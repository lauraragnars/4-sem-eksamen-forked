"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "6JL9DOKEJZW772ul83KQsl";

const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/${entryID}?access_token=${accessToken}`;

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

function showData(data) {
  console.log(data);
  document.querySelector(".headline1").textContent = data.fields.subHeadline1;
  document.querySelector(".about-text1").innerHTML = data.fields.aboutText;

  document.querySelector(".headline2").textContent = data.fields.subHeadline2;
  document.querySelector(".about-text2").innerHTML = data.fields.textContent;
}
