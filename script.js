let gridContainer = document.querySelector(".gridContainer");
let gridSizeDisplay = document.querySelector(".gridSizeDisplay");
let body = document.querySelector("body");
let slider = document.getElementById("slider");
let blackBtn = document.getElementById("blackBtn");
let eraserBtn = document.getElementById("eraserBtn");
let colorPicker = document.getElementById("colorpicker");
let toggleBlack = false;
let toggleInk = false;
let toggleErase = false;
let toggleColor = false;
let spans = document.querySelectorAll("#s1, #s2, #s3");

// EVENT LISTENERS
function check() {}

slider.addEventListener("input", function () {
  createGrid(slider.value, slider.value); // takes value from slider and uses it to create grid
  gridSizeDisplay.innerHTML = `${slider.value} x ${slider.value}`; // displays grid size
});

blackBtn.addEventListener("click", function () {
  toggleBlack = !toggleBlack; //toggles black button on or off
  toggleErase = false;
  if (toggleBlack == true) {
    blackBtn.classList.add("on");
  } else {
    blackBtn.classList.remove("on");
  }
  if (toggleErase == true) {
    eraserBtn.classList.add("on");
  } else if (toggleErase == false) {
    eraserBtn.classList.remove("on");
  }
  spans[0].textContent = toggleBlack;
  spans[1].textContent = toggleErase;
});

eraserBtn.addEventListener("click", function () {
  toggleErase = !toggleErase;
  toggleBlack = false;
  if (toggleBlack) {
    blackBtn.classList.add("on");
  } else if (!toggleBlack) {
    blackBtn.classList.remove("on");
  }
  if (toggleErase) {
    eraserBtn.classList.add("on");
  } else if (!toggleErase) {
    eraserBtn.classList.remove("on");
  }
  spans[0].textContent = toggleBlack;
  spans[1].textContent = toggleErase;
});

colorPicker.addEventListener("input", function () {
  toggleColor = !toggleColor;
  toggleBlack = false; // toggles black button to false
  toggleErase = false;
  spans[0].textContent = toggleBlack;
  spans[1].textContent = toggleErase;

  blackBtn.classList.remove("on");
  eraserBtn.classList.remove("on");
});

// Incrementally darken the grid
function blackColor(y) {
  let rgbColor = window.getComputedStyle(y).backgroundColor;
  let hslColor = rgbToHsl(rgbColor);
  console.log(hslColor);
  let lightness = hslColor[2];
  lightness -= 10;
  if (lightness < 0) lightness = 0;
  y.style.backgroundColor = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${lightness}%)`;
}

// set grid to color based on colorpicker.value
function color(y) {
  y.style.backgroundColor = colorPicker.value;
}
// set grid to white/eraser
function erase(y) {
  y.style.backgroundColor = "white";
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
        if (toggleInk) {
          gridContainer.classList.add("custom-cursor");
        } else {
          gridContainer.classList.remove("custom-cursor");
        }
      });
      grid.addEventListener("mouseover", function () {
        if (toggleInk && toggleBlack) {
          blackColor(grid);
        } else if (toggleInk && toggleErase) {
          erase(grid);
          console.log(grid.backgroundColor);
        } else if (toggleInk && toggleColor) {
          color(grid);
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
