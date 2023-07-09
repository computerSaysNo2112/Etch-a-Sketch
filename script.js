let inputGridSize = document.getElementById("inputGridSize");
let inputGridSizeButton = document.getElementById("gridSizeBtn");
let container = document.querySelector(".container");

inputGridSizeButton.addEventListener("click", function () {
  createGrid(inputGridSize.value, inputGridSize.value);
});

function createGrid(width, height) {
  container.innerHTML = ""; // clears crid
  for (i = 0; i < width; i++) {
    let row = document.createElement("div"); //creates row
    row.classList.add("row");
    container.appendChild(row);
    for (j = 0; j < height; j++) {
      let grid = document.createElement("div"); //created grid
      grid.classList.add("grid");
      row.appendChild(grid); //adds grids to row
      grid.addEventListener("mouseover", function () {
        //adding black ink
        grid.classList.add("blackInk");
      });
    }
  }
}

createGrid(10, 10);
