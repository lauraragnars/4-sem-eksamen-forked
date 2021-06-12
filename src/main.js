"use strict";
// import { accessToken, spaceID } from "./../config/contentful";

// const entryID = "5gg1gYX5ukguLwZB1jubOl";
// const link = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries/${entryID}?access_token=${accessToken}`;

if ("fonts" in document) {
  let font = new FontFace(
    "Pilowlava-Regular",
    "url(/__/fonts/Pilowlava-Regular.woff2) format('woff2'), url(/__/fonts/Pilowlava-Regular.woff) format('woff')"
  );

  Promise.all([font.load()]).then(function (loadedFonts) {
    // Render them at the same time
    loadedFonts.forEach(function (font) {
      document.fonts.add(font);
    });
  });
}

window.addEventListener("load", start);

function start() {
  console.log("start");

  blotter();

  let width = window.innerWidth;
  console.log(width);

  // event listeners

  // burger menu
  document
    .querySelector(".burger-menu-icon")
    .addEventListener("click", toggleBurgerMenu);

  console.log("mobile");
  // custom cursor
  document.addEventListener("mousemove", customCursorMove);
  document.querySelectorAll(".cursor-link").forEach((elm) => {
    elm.addEventListener("mouseover", onMouseOver);
    elm.addEventListener("mouseleave", onMouseLeave);
  });

  document.querySelectorAll(".cursor-link-big").forEach((elm) => {
    elm.addEventListener("mouseover", onMouseOverB);
    elm.addEventListener("mouseleave", onMouseLeaveB);
  });

  setTimeout(mouseListen, 2000);
}

function mouseListen() {
  console.log("mouse listen");
  // custom cursor
  document.addEventListener("mousemove", customCursorMove);
  document.querySelectorAll(".cursor-link").forEach((elm) => {
    elm.addEventListener("mouseover", onMouseOver);
    elm.addEventListener("mouseleave", onMouseLeave);
  });

  document.querySelectorAll(".cursor-link-big").forEach((elm) => {
    elm.addEventListener("mouseover", onMouseOverB);
    elm.addEventListener("mouseleave", onMouseLeaveB);
  });
}

// loads data
// function loadJSON(url, callback) {
//   fetch(url)
//     .then((response) => response.json())
//     .then((jsonData) => {
//       callback(jsonData);
//     });
// }

// function showData(data) {
//   console.log(data);
// }

function toggleBurgerMenu() {
  const burgerMenu = document.querySelector(".burger-menu");
  const burgerMenuText = document.querySelector(".burger-menu-text");

  if (burgerMenu.classList.contains("open")) {
    burgerMenu.classList.remove("open");
    burgerMenuText.textContent = "Menu";
  } else {
    burgerMenu.classList.add("open");
    burgerMenuText.textContent = "Close";
  }
}

function toggle(elm) {
  if (elm) {
    elm = false;
  } else if (elm === false) {
    elm = true;
  }

  return elm;
}

function blotter() {
  document.fonts.ready.then(function () {
    let text = new Blotter.Text("Ø", {
      family: "Pilowlava-Regular",
      size: 70,
      fill: "#fff",
    });

    let material = new window.Blotter.LiquidDistortMaterial();
    let blotter = new Blotter(material, { texts: text });

    material.uniforms.uSpeed.value = 0.1;
    material.uniforms.uVolatility.value = 0.1;
    let scope = blotter.forText(text);

    scope.appendTo(document.querySelector(".header-logo"));
  });
}

function customCursorMove(event) {
  console.log("customCursor");
  const x = event.pageX - 10;
  const y = event.pageY - 10;
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
}

function onMouseOver() {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.transform = "scale(2)";
}

function onMouseLeave() {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.transform = "scale(1)";
}

function onMouseOverB() {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.transform = "scale(3)";
}

function onMouseLeaveB() {
  const cursor = document.querySelector(".custom-cursor");
  cursor.style.transform = "scale(1)";
}
