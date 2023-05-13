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
const imageWrappers = document.querySelectorAll(".image-wrapper");

function updateImagesAmount() {
  const images = document.querySelectorAll(".image");
  return images.length;
}

const dateHandler = () => {
  const date = new Date();
  let day = date.getDay();
  let month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();

  if (+day < 10) day = "0" + day;
  if (+month < 10) month = "0" + month;

  return `${day}.${month}.${year}  ${hour}:${min}`;
};

let date = dateHandler();
const numDatesection = document.createElement("div");
numDatesection.textContent = `${updateImagesAmount()} images. Date: ${date}`;
numDatesection.classList = "date";
const firstChild = section.firstChild;
section.insertBefore(numDatesection, firstChild);

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

// Bonus

imageWrappers.forEach((wrapper) => {
  const removeImgBtn = document.createElement("img");
  removeImgBtn.src = "task-2/close.png";
  removeImgBtn.classList = "remove-img";
  wrapper.appendChild(removeImgBtn);
});

document.addEventListener("click", (e) => {
  console.log(e.target.className);
  if (e.target.className == "remove-img") {
    e.target.closest("div").classList.add("hidden");
    imageWrappers.forEach((wrapper) => {
      if (wrapper === e.target.closest("div")) {
        wrapper.remove();
      }
    });
  }
});
