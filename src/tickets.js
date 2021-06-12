"use strict";

import { accessToken, spaceID } from "../config/contentful";

const entryID = "2leewETkIiBBffCNGNSQh5";
const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${accessToken}&content_type=ticketModule`;
const link2 = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/${entryID}?access_token=${accessToken}`;
window.addEventListener("load", start);

function start() {
  console.log("start");

  // show data at load
  loadJSON(link, showData);
  loadJSON(link2, showData2);
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
  //   console.log(data);

  const allTickets = data.items;

  let container = document.querySelector("#tickets-container");
  container.innerHTML = "";
  let ticketTemplate = document.querySelector("template");

  //sort the tickets in alphabetic order
  allTickets.sort(function (a, b) {
    if (a.fields.ticketType < b.fields.ticketType) {
      return -1;
    } else {
      return 1;
    }
  });

  allTickets.forEach((ticket) => {
    let klon = ticketTemplate.cloneNode(true).content;

    const allImages = data.includes.Asset;

    allImages.forEach((image) => {
      console.log(ticket);
      console.log(image.fields.file.url);
      if (ticket.fields.ticketType === image.fields.title) {
        klon.querySelector(
          "article"
        ).style.backgroundImage = `url(${image.fields.file.url})`;
      }
    });

    // Check if tickets are sold out
    if (ticket.fields.soldOut === true) {
      klon.querySelector(".ticket-button").textContent = `Sold out`;
      klon.querySelector(".ticket-button").disabled = true;
    } else {
      klon.querySelector(".ticket-button").textContent = `Buy now`;
      klon.querySelector(".ticket-button").disabled = false;
    }

    // if (ticket.fields.ticketType.includes("camping")) {
    //   klon.querySelector("a").textContent = "here";
    // }

    klon.querySelector(".ticket-type").textContent = ticket.fields.ticketType;
    klon.querySelector(".desc").textContent = ticket.fields.description;
    klon.querySelector("h4").textContent = ticket.fields.ageLimit;
    klon.querySelector(".price").textContent = ticket.fields.price;

    container.appendChild(klon);
  });
}

function showData2(data) {
  document.querySelector("h1").textContent = data.fields.header;
  document.querySelector(".refund").textContent = data.fields.refund;
  document.querySelector(".day-tickets").textContent = data.fields.dayTickets;
  document.querySelector(".other-info").textContent = data.fields.otherInfo;
}
