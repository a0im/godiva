"use strict";
import notice from "../db/notice_title.json " assert { type: "json" };

//json
const noticeData = notice.notice;
// DOM
const $header = document.querySelector("header");
const $h_nav = document.querySelector(".logo-gnb-topset");
const $topBtn = document.querySelector(".topBtn");
const $eventWrap = document.querySelector(".event-wrap");
const $noticeBox = document.querySelector(".notice-bundle");
const $s2_itemList = document.querySelector(".s2-item-list");
const $s2_items = document.querySelectorAll(".s2-item-list > li");
const $s3 = document.querySelector(".s3");
const $s3_imgBox = document.querySelector(".img-content");
const $s3_content = document.querySelector(".text-content");

// ================= topBtn - 상단이동 , 버튼 숨김/표시 이벤트  ===================
// 클릭-상단이동 리스너
$topBtn.addEventListener("click", () => {
  setTimeout(() => {
    $h_nav.scrollIntoView({ behavior: "smooth" });
  }, 400);
});

// class 추가제거
function isEvt_arrow(entries) {
  if (!entries[0].isIntersecting) {
    $topBtn.classList.add("act-arrow");
  } else {
    $topBtn.classList.remove("act-arrow");
  }
}

//observer option
let option3 = {
  root: null,
  rootMargin: "250px 0px 0px 0px",
  threshold: 0,
};

//create observer obj
const observer_arrow = new IntersectionObserver(isEvt_arrow, option3);
observer_arrow.observe($header);

// ================= notice - 공지내용 일정 시간마다 위로 슬라이드 이벤트 ===================
const eleSize = 60;
let currIdx = 0;
let interval = null;

//함수 호출 묶음
let coreFn = () => {
  createNoticeEle();
  const $notiEle = document.querySelectorAll(".notice-bundle > p");
  createCloneNodes($notiEle);
  interval = setInterval(() => moveNotice(currIdx++), 2500);
  toggleInterval($notiEle);
};
coreFn();

//.notice-bundle내 요소 생성 함수
function createNoticeEle() {
  let element = "";
  noticeData.map(data => {
    element += `<p><a href="#">[${data.type.toUpperCase()}] ${data.title}<time>${data.date}</time><a/></p>`;
  });

  $noticeBox.innerHTML = element;
}

// 요소 복사 함수
function createCloneNodes($notiEle) {
  $notiEle.forEach(e => {
    let clone = e.cloneNode(true);
    clone.classList.add("clone");
    $noticeBox.appendChild(clone);
  });
  $noticeBox.classList.add("noti-animate");
}
//요소 이동 함수
function moveNotice(idx) {
  let currenPos = idx * eleSize;
  $noticeBox.style.bottom = `${currenPos}px`;
  resetIdx();
}

//요소 위치 초기화 함수
function resetIdx() {
  const notiLength = document.querySelector(".notice-bundle").children.length / 4;

  if (currIdx > notiLength) {
    setTimeout(() => {
      $noticeBox.classList.remove("noti-animate");
      $noticeBox.style.bottom = "0px";
      currIdx = 0;
    }, 350);
    setTimeout(() => $noticeBox.classList.add("noti-animate"), 401);
  }
}

//toggle interval 함수
function toggleInterval($notiEle) {
  $notiEle.forEach(pTag => {
    pTag.children[0].addEventListener("mouseenter", () => clearInterval(interval));
    pTag.children[0].addEventListener("mouseleave", () => {
      interval = setInterval(() => moveNotice(currIdx++), 2500);
    });
  });
}

// ============= s2 - 일정 시간마다 이미지 우측 이동 이벤트 ================
s2SlideEvnt();
function s2SlideEvnt() {
  const imgLength = $s2_items.length;
  const imgSize = 402;
  let currIdx = 0;
  let interval = null;

  //함수 호출 묶음
  let core = () => {
    createClone();
    interval = setInterval(() => moveImg(currIdx++), 2500);
    toggleInterval();
  };
  core();

  //요소 복사 함수
  function createClone() {
    $s2_items.forEach(item => {
      let clone = item.cloneNode(true);
      clone.classList.add("clone");
      $s2_itemList.appendChild(clone);
      $s2_itemList.classList.add("s2-animate");
    });
  }

  //요소 이동 & 초기화 함수
  function moveImg(Idx) {
    let currentPos = imgSize * -Idx;
    $s2_itemList.style.left = `${currentPos}px`;

    if (currIdx > imgLength) {
      setTimeout(() => {
        $s2_itemList.classList.remove("s2-animate");
        $s2_itemList.style.left = "0px";
        currIdx = 0;
      }, 470);
      setTimeout(() => $s2_itemList.classList.add("s2-animate"), 570);
    }
  }

  //toggle interval 함수
  function toggleInterval() {
    $s2_itemList.addEventListener("mouseenter", () => clearInterval(interval));
    $s2_itemList.addEventListener("mouseleave", () => (interval = setInterval(() => moveImg(currIdx++), 2500)));
  }
}

// ============= nav - nav영역 fixed 이벤트 ================
// 스타일 변경 함수
// let navAddEvt = () => ($eventWrap.style.transform = "scale(1.03)");
// let navRemoveEvt = () => ($eventWrap.style.transform = "scale(1)");
// let isEvt_nav = (entries, observer) => {
//   !entries[0].isIntersecting ? navAddEvt() : navRemoveEvt();
// };

// //Observer option
// let option2 = {
//   root: null,
//   rootMargin: "0px",
//   threshold: 0.1,
// };
// //create observer obj
// const observer_nav = new IntersectionObserver(isEvt_nav, option2);
// observer_nav.observe($h_nav);

// ============= s3 - 텍스트 슬라이드 이벤트   ================

//class 추가 제거 함수
function s3AddClass() {
  $s3_imgBox.classList.add("s3_act_img");
  $s3_content.classList.add("s3_act_content");
}
function s3RemoveClass() {
  $s3_imgBox.classList.remove("s3_act_img");
  $s3_content.classList.remove("s3_act_content");
}
let isEvt_s3 = entries => {
  entries[0].isIntersecting ? s3AddClass() : s3RemoveClass();
};

//Observer option
let option1 = {
  root: null,
  rootMargin: "0px",
  threshold: 0.8,
};

//create observer obj
const observer_s3 = new IntersectionObserver(isEvt_s3, option1);
observer_s3.observe($s3);
