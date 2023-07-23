let gridContainer = document.querySelector(".gridContainer");
let blackButton = document.getElementById("black");
let gridSizeDisplay = document.querySelector(".gridSizeDisplay");
let slider = document.getElementById("slider");
let colorPicker = document.getElementById("colorpicker");
let toggleBlack = false;
let toggleInk = false;

// slider changes amount of grids
slider.addEventListener("input", function () {
  createGrid(slider.value, slider.value);
  gridSizeDisplay.innerHTML = `${slider.value} x ${slider.value}`;
});

blackButton.addEventListener("click", function () {
  toggleBlack = !toggleBlack;
  if (toggleBlack) {
    blackButton.classList.add("black");
  } else if (!toggleBlack) {
    blackButton.classList.remove("black");
  }
});

// change to black
function blackColor(y) {
  let rgbColor = window.getComputedStyle(y).backgroundColor;
  let hslColor = rgbToHsl(rgbColor);
  console.log(hslColor);
  let lightness = hslColor[2];
  lightness -= 10;
  if (lightness < 0) lightness = 0;
  y.style.backgroundColor = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${lightness}%)`;
}

// Create grid and add event-listener for changing color based on colorPicker
function createGrid(width, height) {
  gridContainer.innerHTML = ""; // clears crid
  for (i = 0; i < width; i++) {
    let row = document.createElement("div"); //creates row
    row.classList.add("row");
    gridContainer.appendChild(row); // adds row to container
    for (j = 0; j < height; j++) {
      let grid = document.createElement("div"); //creates grid
      grid.classList.add("grid");
      row.appendChild(grid); //adds grids to row
      grid.addEventListener("click", function () {
        toggleInk = !toggleInk;
      });
      grid.addEventListener("mouseover", function () {
        if (toggleInk & toggleBlack) {
          blackColor(grid);
        }
      });
    }
  }
}

createGrid(10, 10);

//converts rgb to hsl
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
