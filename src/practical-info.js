"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "9Tp2XfVYOtuB36CZHDiPi";

const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=practicalInfoModule`;

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

// function showData(data) {
//   console.log(data);

//   //   data.items.forEach(elm => {

//   //   });
// }

function showData(data) {
  console.log(data);
  const container = document.querySelector(".practical-info-main");
  const template = document.querySelector("template");
  container.innerHTML = "";

  data.items.forEach((elm) => {
    let clone = template.cloneNode(true).content;
    clone.querySelector("summary").textContent = elm.fields.header;
    clone.querySelector("p").innerHTML = elm.fields.mainText;

    container.appendChild(clone);
  });
}
