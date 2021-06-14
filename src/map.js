"use strict";

document.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  document.querySelector("svg").setAttribute("viewBox", "0 0 1380 920");

  document.querySelectorAll("#pins path").forEach((pin) => {
    pin.addEventListener("click", openPopUp);
    // pin.addEventListener("mouseover", bounce);
    // pin.addEventListener("mouseleave", bounceStop);
  });

  document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("click", categoryClick);
  });

  document.querySelector(".close").addEventListener("click", closePopUp);
}

function categoryClick() {
  closePopUp();
  const type = this.dataset.type;

  document.querySelectorAll("#pins path").forEach((pin) => {
    // check if the type clicked and the pin type match
    if (pin.dataset.type === type) {
      // add animation to the pins that match
      pin.classList.add("bounce-ani-once");
      pin.addEventListener("animationend", function () {
        pin.classList.remove("bounce-ani-once");
      });
    }
  });
}

function closePopUp() {
  const popup = document.querySelector(".popup");
  popup.classList.add("hide");

  document.querySelectorAll("#pins path").forEach((pin) => {
    pin.classList.remove("bounce-ani");
  });
}

function openPopUp(event) {
  document.querySelector(".popup .currentlyplaying").classList.add("hideinfo");

  document.querySelectorAll("#pins path").forEach((pin) => {
    pin.classList.remove("bounce-ani");
  });

  this.classList.add("bounce-ani");

  const popup = document.querySelector(".popup");
  popup.classList.add("hide");

  document.querySelector(".popup .info").textContent = this.dataset.info;
  document.querySelector(".popup .title").textContent = this.dataset.title;

  if (this.dataset.type === "stage") {
    document.querySelector(".popup .currentlyplaying").classList.remove("hideinfo");
    document.querySelector(".popup .currentlyplaying p").textContent = this.dataset.playing;
  }

  const x = event.pageX;
  const y = event.pageY - 150;

  popup.style.left = x + "px";
  popup.style.top = y + "px";

  popup.classList.remove("hide");
}
