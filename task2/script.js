// JS:
// 7) Напишите скрипт, который будет подсчитывать количество картинок на странице и выводить вверху страницы их количество и актуальную дату в формате ДД.ММ.ГГГГ ЧЧ:ММ.
// 8*) При клике на каждое изображение в сетке:
//  - во всплывающем окне поверх всего контента появляется центрированное по-вертикали и горизонтали изображение в полном размере.
// - также поверх контента, однако под большим изображением должен быть полупрозрачный затемняющий фон.
// - рядом с большим изображением должна быть кнопка, при клике на которую большая картинка скрывается.
// * в этом задании не рекомендуется использовать плагины всплывающих фотогалерей, явным образом решающие эту задачу.

const images = document.querySelectorAll(".image");
const section = document.querySelector("section");
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");

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
numDatesection.textContent = `${images.length} images. Date: ${date}`;
numDatesection.classList = "date";
const firstChild = section.firstChild;
section.insertBefore(numDatesection, firstChild);

setInterval(() => {
  date = dateHandler();
  document.querySelector(
    ".date"
  ).textContent = `${images.length} images. Date: ${date}`;
}, 1000);

// 8
