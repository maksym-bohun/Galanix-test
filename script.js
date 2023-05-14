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
const deletedContainer = document.querySelector(".deleted-container");
const initialContainerHTML = ` 
        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/1.jpg" alt="image 1" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>

        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/2.jpg" alt="image 2" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>

        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/3.jpg" alt="image 3" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>

        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/4.jpg" alt="image 4" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>

        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/5.jpg" alt="image 5" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>

        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/6.jpg" alt="image 6" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>

        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/7.jpg" alt="image 7" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>

        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/8.jpg" alt="image 8" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>

        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/9.jpg" alt="image 9" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>

        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/10.jpg" alt="image 10" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>

        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/11.jpg" alt="image 11" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>

        <div class="image-wrapper">
          <div class="image-container">
            <img src="./task-2/12.jpg" alt="image 12" class="image" />
          </div>
          <img src='task-2/close.png' class='remove-img'/>
        </div>
     `;

document.addEventListener("DOMContentLoaded", () => {
  const containerInnerHtml = localStorage.getItem("container");
  if (containerInnerHtml && containerInnerHtml !== "")
    container.innerHTML = JSON.parse(containerInnerHtml);
  if (localStorage.getItem("deletedContainerHTML"))
    deletedContainer.innerHTML = JSON.parse(
      localStorage.getItem("deletedContainerHTML")
    );
  addRemovingButtons();
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

  if (+day < 10) day = "0" + day;
  if (+month < 10) month = "0" + month;
  if (+hour < 10) hour = "0" + hour;
  if (+min < 10) min = "0" + min;

  return `${day}.${month}.${year}  ${hour}:${min}`;
};

const addRemovingButtons = () => {
  imageWrappers.forEach((wrapper) => {
    const removeImgBtn = document.createElement("img");
    removeImgBtn.src = "task-2/close.png";
    removeImgBtn.classList = "remove-img";
    console.log(wrapper);
    if (wrapper.childElementCount < 2) wrapper.appendChild(removeImgBtn);
  });
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
    modal.classList.remove("hidden");
    console.log(modal);
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

const removedWrappers = [];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-img")) {
    const wrapper = e.target.closest(".image-wrapper");
    if (wrapper) {
      wrapper.remove();
      localStorage.setItem("container", JSON.stringify(container.innerHTML));
      removedWrappers.push(wrapper.outerHTML);
      let appendedElement;
      localStorage.setItem("removedWrappers", JSON.stringify(removedWrappers));
      deletedContainer.innerHTML = "";
      JSON.parse(localStorage.getItem("removedWrappers")).map((item) => {
        appendedElement = document.createElement("div");
        appendedElement.innerHTML = item;
        deletedContainer.appendChild(appendedElement);
        localStorage.setItem(
          "deletedContainerHTML",
          JSON.stringify(deletedContainer.innerHTML)
        );
      });
    }
  }
});

const restoreBtn = document.createElement("button");
restoreBtn.textContent = "Восстановить";
restoreBtn.classList.add("restore-btn");
section.appendChild(restoreBtn);

restoreBtn.addEventListener("click", () => {
  localStorage.setItem("container", initialContainerHTML);
  container.innerHTML = initialContainerHTML;
  localStorage.removeItem("removedWrappers");
  removedWrappers.length = 0;
  localStorage.setItem("deletedContainerHTML", "");
  deletedContainer.innerHTML = "";
});
