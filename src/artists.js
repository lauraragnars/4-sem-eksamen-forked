"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "9Tp2XfVYOtuB36CZHDiPi";
const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=individualArtist`;

window.addEventListener("load", start);

let currentFilter = "*";
let allArtists;
let searchInput;

function start() {
  console.log("start");

  // show data at load
  loadJSON(link, setData);

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", setFilter);
  });

  document
    .querySelector("#artists-search")
    .addEventListener("input", searchList);
}

// loads data
function loadJSON(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((jsonData) => {
      callback(jsonData);
    });
}

function searchList(e) {
  console.log("search ist");
  searchInput = e.target.value;
  showData();
}

function setData(data) {
  allArtists = data.items;
  showData();
}

function setFilter() {
  document.querySelectorAll(".filter").forEach((button) => {
    button.classList.remove("selected-button");
  });
  console.log(this.dataset.kategori, "set filter");
  currentFilter = this.dataset.kategori;
  this.classList.add("selected-button");
  showData();
}

function showData() {
  const list = document.querySelector("#all-artists");
  list.innerHTML = "";
  console.log(allArtists);
  let filteredList;

  if (searchInput) {
    filteredList = allArtists.filter(filterListBySearch);
  } else {
    filteredList = allArtists;
  }

  if (currentFilter === "*") {
    filteredList = filteredList;
  } else {
    filteredList = filteredList.filter(filterList);
  }

  filteredList.sort(function (a, b) {
    if (a.fields.hasOwnProperty("isHeadliner")) {
      return -1;
    } else if (b.fields.hasOwnProperty("isHeadliner")) {
      return 1;
    }
  });

  // filteredList.sort(function (a, b) {
  //   return a.fields.hasOwnProperty("isHeadliner")
  //     ? -1
  //     : b.fields.hasOwnProperty("isHeadliner")
  //     ? 1
  //     : 0;
  // });

  filteredList.forEach((artist) => {
    let li = document.createElement("li");
    li.classList.add("cursor-link");
    // checks if the artist should be included in the
    // if (artist.fields.exludedFromArtists === true) {
    //   console.log("excluded");
    // } else { }
    li.textContent = artist.fields.artistName;

    // Checks if artist is headliner
    if (artist.fields.isHeadliner === true) {
      li.classList.add("headliner");
    }

    li.addEventListener("click", () => {
      location.href = "artist.html?id=" + artist.sys.id;
    });

    // add the <li> to the html list
    list.append(li);
  });
}

function filterList(artist) {
  if (artist.fields.day) {
    if (artist.fields.day.toLowerCase() === currentFilter) {
      return true;
    } else {
      return false;
    }
  }
}

function filterListBySearch(artist) {
  if (
    artist.fields.artistName.toLowerCase().includes(searchInput.toLowerCase())
  ) {
    return true;
  } else {
    return false;
  }
}
