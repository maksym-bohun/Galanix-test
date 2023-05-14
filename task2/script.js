// JS:
// 7) Напишите скрипт, который будет подсчитывать количество картинок на странице и выводить вверху страницы их количество и актуальную дату в формате ДД.ММ.ГГГГ ЧЧ:ММ.
// 8*) При клике на каждое изображение в сетке:
//  - во всплывающем окне поверх всего контента появляется центрированное по-вертикали и горизонтали изображение в полном размере.
// - также поверх контента, однако под большим изображением должен быть полупрозрачный затемняющий фон.
// - рядом с большим изображением должна быть кнопка, при клике на которую большая картинка скрывается.
// * в этом задании не рекомендуется использовать плагины всплывающих фотогалерей, явным образом решающие эту задачу.

let images = document.querySelectorAll(".image");
const section = document.querySelector("section");
const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal__background");
const closeModalBtn = document.querySelector(".modal__close-btn");
let imageWrappers = document.querySelectorAll(".image-wrapper");

console.log(container.childElementCount);
document.addEventListener("DOMContentLoaded", () => {
  const containerInnerHtml = localStorage.getItem("container");
  if (containerInnerHtml) container.innerHTML = JSON.parse(containerInnerHtml);
});

function updateImagesAmount() {
  return container.childElementCount;
}

const dateHandler = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getUTCMonth() + 1;
  const year = date.getFullYear();
  let hour = date.getHours();
  let min = date.getMinutes();
  //   console.log(date);

  if (+day < 10) day = "0" + day;
  if (+month < 10) month = "0" + month;
  if (+hour < 10) hour = "0" + hour;
  if (+min < 10) min = "0" + min;

  return `${day}.${month}.${year}  ${hour}:${min}`;
};

let date = dateHandler();
const numDateSection = document.createElement("div");
numDateSection.textContent = `${updateImagesAmount()} images. Date: ${date}`;
numDateSection.classList = "date";
const firstChild = section.firstChild;
section.insertBefore(numDateSection, firstChild);

setInterval(() => {
  date = dateHandler();
  document.querySelector(
    ".date"
  ).textContent = `${updateImagesAmount()} images. Date: ${date}`;
}, 1000);

// 8

let modalImage;

images.forEach((img) => {
  img.addEventListener("click", (e) => {
    console.log("CLICKED");
    modal.classList.remove("hidden");
    modalImage = document.createElement("img");
    modalImage.src = e.target.src.slice(21);
    modal.appendChild(modalImage);
  });
});

closeModalBtn.addEventListener("click", () => {
  modal.removeChild(modalImage);
  modal.classList.add("hidden");
});

////////////////////////////////////////////////////////////////////
// Bonus

imageWrappers.forEach((wrapper) => {
  const removeImgBtn = document.createElement("img");
  removeImgBtn.src = "task-2/close.png";
  removeImgBtn.classList = "remove-img";
  wrapper.appendChild(removeImgBtn);
});

const removedWrappers = [];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-img")) {
    const wrapper = e.target.closest(".image-wrapper");
    if (wrapper) {
      wrapper.remove();
      localStorage.setItem("container", JSON.stringify(container.innerHTML));
    }
  }
});
