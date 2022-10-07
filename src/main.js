"use strict";

const $s3 = document.querySelector(".s3");
const $s3_imgBox = document.querySelector(".img-content");
const $s3_content = document.querySelector(".text-content");
const $h_nav = document.querySelector(".logo-gnb-topset");
const $event_wrap = document.querySelector(".event-wrap");

//nav
function navAddEvt() {
  console.log("aa");
  $event_wrap.style.position = "fixed";
}
function navRemoveEvt() {
  console.log("cc");
  $event_wrap.style.position = "relative";
}

let isEvt_nav = (entries, observer) => {
  console.log(!entries[0].isIntersecting);
  !entries[0].isIntersecting ? navAddEvt() : navRemoveEvt();
};

let option2 = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};
const observer_nav = new IntersectionObserver(isEvt_nav, option2);
observer_nav.observe($h_nav);

//s3
function s3AddClass() {
  $s3_imgBox.classList.add("s3_act_img");
  $s3_content.classList.add("s3_act_content");
}
function s3RemoveClass() {
  $s3_imgBox.classList.remove("s3_act_img");
  $s3_content.classList.remove("s3_act_content");
}

//cb
let isEvt_s3 = (entries, observer) => {
  entries[0].isIntersecting ? s3AddClass() : s3RemoveClass();
};

//root & target option
let option1 = {
  root: null,
  rootMargin: "0px",
  threshold: 1,
};

//call
const observer_s3 = new IntersectionObserver(isEvt_s3, option1);
observer_s3.observe($s3);
