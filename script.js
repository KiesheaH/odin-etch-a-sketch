"use strict";

// DOM variables
const colorPicker = document.querySelector(".color_picker");
const rowDisplay = document.querySelector(".row");
const columnDisplay = document.querySelector(".column");
const slider = document.querySelector(".slider");
const gridLinesBtn = document.querySelector(".gridLines");
const rainbowBtn = document.querySelector(".rainbow");
const darkenBtn = document.querySelector(".darken");
const lightenBtn = document.querySelector(".lighten");
const eraserBtn = document.querySelector(".eraser");
const clearBtn = document.querySelector(".clear");
const container = document.querySelector(".container");

// global variables
let grid;
let size;
let color;

// boolean variables
let isDrawing = false;

// display grid size
slider.addEventListener("input", (e) => {
  size = e.target.value;

  // update row and height text
  rowDisplay.textContent = size;
  columnDisplay.textContent = size;

  // update grid container
  createGrid(size);

  // color reset
  container.style.backgroundColor = "#fff";
  colorPicker.value = "#000";

  // button resets
  rainbowBtn.classList.remove("active");
  rainbowBtn.style.backgroundColor = "#fff";
  rainbowBtn.style.color = "#000";

  return size;
});

// change grid container by size
function createGrid(size) {
  // clear container
  container.textContent = "";

  // determine size of the grid cell
  const gridCellHeight = 700 / size;
  const gridCellWidth = 700 / size;

  // create grid
  for (let i = 0; i < size * size; i++) {
    grid = document.createElement("div");
    grid.className = "gridCells";
    grid.style.height = `${gridCellHeight}px`;
    grid.style.width = `${gridCellWidth}px`;
    grid.classList.add("show_grid");
    container.appendChild(grid);
  }
}

// remove grid lines
gridLinesBtn.addEventListener("click", function () {
  let gridCells = document.querySelectorAll(".gridCells");
  let gridLines = Array.from(gridCells);

  for (let i = 0; i < gridLines.length; i++) {
    gridLines[i].classList.toggle("show_grid");
  }
});

// rainbow colors
rainbowBtn.addEventListener("click", (e) => {
  e.target.classList.toggle("active");
  if (e.target.classList.contains("active")) {
    e.target.style.backgroundColor = "#ff8700";
    e.target.style.color = "#fff";
  } else {
    e.target.style.backgroundColor = "#fff";
    e.target.style.color = "#000";
  }
});

// darken colors
darkenBtn.addEventListener("click", (e) => {
  e.target.classList.toggle("active");
});

// lighten colors
lightenBtn.addEventListener("click", (e) => {
  e.target.classList.toggle("active");
});

// use etch-a-sketch
document.addEventListener("mousedown", () => {
  isDrawing = true;
});

document.addEventListener("mouseup", () => {
  isDrawing = false;
});

container.addEventListener("mouseover", (e) => {
  if (!isDrawing) return;
  if (!e.target.classList.contains("gridCells")) return;

  // drawing using selected color
  if (!rainbowBtn.classList.contains("active")) {
    e.target.style.backgroundColor = colorPicker.value;
    // drawing using rainbow colors
  } else {
    let r = Math.floor(Math.random() * 255 + 1);
    let b = Math.floor(Math.random() * 255 + 1);
    let g = Math.floor(Math.random() * 255 + 1);
    e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }
});
