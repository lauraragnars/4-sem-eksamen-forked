"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "6mKjYA44DBq74sb8cpXyrt";
const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=merchStores`;
const link2 = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/${entryID}?access_token=${accessToken}`;
const link3 = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=merchItem`;
window.addEventListener("load", start);

function start() {
  console.log("start");

  // show data at load
  loadJSON(link, showData);
  loadJSON(link2, showData2);
  loadJSON(link3, showData3);
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
  const list = document.querySelector(".all-stores");
  const allStores = data.items;
  list.innerHTML = "";

  allStores.forEach((store) => {
    let li = document.createElement("li");
    li.textContent = `${store.fields.storeName.toUpperCase()},  ${store.fields.address} `;
    list.append(li);
  });
}

function showData3(data) {
  const allMerch = data.items;

  let container = document.querySelector(".merch-container");
  let merchTemplate = document.querySelector("template");

  allMerch.forEach((merch) => {
    let klon = merchTemplate.cloneNode(true).content;

    const allImages = data.includes.Asset;

    allImages.forEach((image) => {
      if (merch.fields.description === image.fields.title) {
        klon.querySelector("img").src = image.fields.file.url;
      }
    });

    klon.querySelector(".title").textContent = merch.fields.description;
    klon.querySelector(".price").textContent = merch.fields.price;

    container.appendChild(klon);
  });
}

function showData2(data) {
  document.querySelector("h1").textContent = data.fields.header;
  document.querySelector(".desc").textContent = data.fields.description;
}
