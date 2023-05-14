const input = document.querySelector(".input");
const sendButton = document.querySelector(".send-btn");
const resetButton = document.querySelector(".reset-btn");
const tableContainer = document.querySelector(".table-container");
const checkboxes = document.querySelectorAll(".checkbox");

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

const createTable = async () => {
  console.log("creating");
  tableContainer.innerHTML = "";
  if (input.value.trim().length > 0) {
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

    console.log(data);
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

sendButton.addEventListener("click", async (e) => {
  e.preventDefault();
  await createTable();
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
});
