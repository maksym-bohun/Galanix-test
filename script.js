const input = document.querySelector(".input");
const sendButton = document.querySelector(".send-btn");
const resetButton = document.querySelector(".reset-btn");
const tableContainer = document.querySelector(".table-container");
let checkboxes = document.querySelectorAll(".checkbox");
const counter = document.querySelector(".counter");
let currentCountry;

const fetchData = async (country) => {
  try {
    const res = await fetch(
      "http://universities.hipolabs.com/search?country=" + country
    );
    console.log(res.ok);
    let data = await res.json();
    if (data.length === 0) {
      data = "empty";
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};

let checkboxesChecked = [];

const createTable = async () => {
  checkboxesChecked = [];
  tableContainer.innerHTML = "";
  if (input.value.trim().length > 0) {
    currentCountry = input.value;
    localStorage.setItem("currentCountry", currentCountry);
    const data = await fetchData(input.value);
    if (data === "empty") {
      const message = document.createElement("h2");
      message.className = "heading-secondary";
      message.textContent = "Incorrent input! Try another country.";
      tableContainer.appendChild(message);
      return;
    }
    const table = document.createElement("table");
    table.innerHTML = "";
    table.innerHTML = `
      <tr>
          <th class='table__numbers'>#</th>
          <th>Name</th>
          <th>Country</th>
          <th>Website</th>
      </tr>`;

    data.map((university, i) => {
      const tableRow = document.createElement("tr");
      const webPages = university.web_pages.map((page) => {
        return `<a href='${page}'>${page}</a>`;
      });
      const webPagesString = webPages.join(",  ");

      tableRow.innerHTML = `
        <td class='table__numbers'>${i + 1}</td>
        <td>${university.name}</td>
        <td>${university.country}</td>
        <td class='url-list'>${webPagesString}</td>
        <td><input type='checkbox' class='checkbox' id='checkbox-${
          i + 1
        }'/></td>
    `;
      table.appendChild(tableRow);
    });
    tableContainer.appendChild(table);
  } else return;
};

const updateCounter = () => {
  if (localStorage.getItem(currentCountry)) {
    checkboxes = document.querySelectorAll(".checkbox");
    localStrgCheckboxes = JSON.parse(localStorage.getItem(currentCountry));
    checkboxes.forEach((checkbox, i) => {
      if (localStrgCheckboxes.includes(i + 1)) {
        checkbox.checked = true;
      }
    });
  }
};

sendButton.addEventListener("click", async (e) => {
  e.preventDefault();
  await createTable();
  updateCounter();
  checkboxes = document.querySelectorAll(".checkbox");
});

input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    sendButton.click();
  }
});

resetButton.addEventListener("click", () => {
  tableContainer.innerHTML = "";
  input.value = "";
  updateCounter();
  counter.textContent = "";
  localStorage.setItem("currentCountry", "");
});

tableContainer.addEventListener("change", () => {
  checkboxes.forEach((checkbox, i) => {
    if (checkbox.checked && !checkboxesChecked.includes(i + 1)) {
      console.log(checkbox, i);
      checkboxesChecked.push(i + 1);
      localStorage.setItem(currentCountry, JSON.stringify(checkboxesChecked));
    } else if (!checkbox.checked && checkboxesChecked.includes(i + 1)) {
      checkboxesChecked.splice(checkboxesChecked.indexOf(i + 1), 1);
      localStorage.setItem(currentCountry, JSON.stringify(checkboxesChecked));
      console.log("//////////////////////////////////");
      console.log(
        checkboxesChecked.splice(checkboxesChecked.indexOf(i + 1), 1)
      );
      console.log("//////////////////////////////////");
    }
    console.log(checkboxesChecked);
    console.log(i);
  });
  counter.textContent = JSON.parse(localStorage.getItem(currentCountry)).length;
});

window.addEventListener("DOMContentLoaded", () => {
  updateCounter();
});
