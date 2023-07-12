let inputGridSize = document.getElementById("inputGridSize");
let slider = document.getElementById("slider");
let container = document.querySelector(".container");

slider.addEventListener("input", function () {
  createGrid(slider.value, slider.value);
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
        blackInk(this);
      }); // this refers to the current grid cell
    }
  }
}

function rgbToHsl(rgbColorString) {
  let sep = rgbColorString.indexOf(",") > -1 ? "," : " ";
  rgbColorString = rgbColorString.substr(4).split(")")[0].split(sep);

  // Convert strings to number
  let r = +rgbColorString[0] / 255,
    g = +rgbColorString[1] / 255,
    b = +rgbColorString[2] / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

function blackInk(grid) {
  // Get current background color
  let currentColor = window.getComputedStyle(grid).backgroundColor;

  // Convert RGB color to HSL color
  let hslColor = rgbToHsl(currentColor);

  // Extract lightness from HSL color
  let lightness = hslColor[2];

  // Decrease lightness by 10%
  lightness -= 10;

  // Ensure lightness doesn't go below 0% (goes to pure black then stops)
  if (lightness < 0) lightness = 0;

  // Set the new background color of the grid cell
  grid.style.backgroundColor = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${lightness}%)`;
}

createGrid(10, 10);
