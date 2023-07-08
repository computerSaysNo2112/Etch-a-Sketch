let inputGridSize = document.getElementById("myInput");
let inputGridSizeButton = document.getElementById("myInputButton");
let container = document.querySelector(".container");

inputGridSizeButton.addEventListener("click", function () {
  createGrid(40, 40);
});

function createGrid(width, height) {
  container.innerHTML = "";
  for (i = 0; i < width; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    for (j = 0; j < height; j++) {
      let grid = document.createElement("div");
      grid.classList.add("grid");
      row.appendChild(grid);
    }
  }
}

createGrid(10, 10);
