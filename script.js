"use strict";

// DOM variables
const colorPicker = document.querySelector(".color_picker");
const rowDisplay = document.querySelector(".row");
const columnDisplay = document.querySelector(".column");
const slider = document.querySelector(".slider");
const gridLinesBtn = document.querySelector(".gridLines");
const rainbowBtn = document.querySelector(".rainbow");
const eraserBtn = document.querySelector(".eraser");
const clearBtn = document.querySelector(".clear");
const container = document.querySelector(".container");

// global variables
let square;
let size;
let color;
let style;

let activeColor = "#ff8700";
let activeFontColor = "#fff";

let inactiveColor = "#fff";
let inactiveFontColor = "#000";

// boolean variables
let isDrawing = false;

// create sketch area
function createGrid(size) {
  // clear container
  container.textContent = "";

  // determine size of the squares
  const squareHeight = 700 / size;
  const squareWidth = 700 / size;

  // create grid using squares
  for (let i = 0; i < size * size; i++) {
    square = document.createElement("div");
    square.className = "gridCells";
    square.style.height = `${squareHeight}px`;
    square.style.width = `${squareWidth}px`;
    container.appendChild(square);
  }
}

function colorSquare() {
  this.style.backgroundColor = colorPicker.value;
}

// change grid size
slider.addEventListener("input", (e) => {
  size = e.target.value;

  container.textContent = "";

  // update row and height text
  rowDisplay.textContent = size;
  columnDisplay.textContent = size;

  // update grid container
  createGrid(size);
  reset(size);
  // return size;
});

// SKETCH AREA
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

  // erase selected colors
  if (eraserBtn.classList.contains("active")) {
    e.target.style.backgroundColor = "#fff";
  }
});

// FUNCTIONS
// changeBtnColors
function activeButton(e) {
  e.target.classList.toggle("active");
  if (e.target.classList.contains("active")) {
    e.target.style.backgroundColor = activeColor;
    e.target.style.color = activeFontColor;
  } else {
    e.target.style.backgroundColor = inactiveColor;
    e.target.style.color = inactiveFontColor;
  }
}

function inactive(btn) {
  btn.style.backgroundColor = inactiveColor;
  btn.style.color = inactiveFontColor;
}

function reset(size) {
  // update row and height text
  slider.value = size;
  rowDisplay.textContent = size;
  columnDisplay.textContent = size;

  // update grid container
  createGrid(size);

  // color reset
  container.style.backgroundColor = inactiveColor;
  colorPicker.value = "rgb(0,0,0)";

  // button resets
  inactive(gridLinesBtn);
  gridLinesBtn.textContent = "GRID LINES: OFF";
  // gridLinesBtn.classList.add("active");

  rainbowBtn.classList.remove("active");
  inactive(rainbowBtn);

  eraserBtn.classList.remove("active");
  inactive(eraserBtn);
}

// BUTTONS
// remove grid lines
gridLinesBtn.addEventListener("click", (e) => {
  let gridCells = document.querySelectorAll(".gridCells");
  let gridLines = Array.from(gridCells);

  for (let i = 0; i < gridLines.length; i++) {
    gridLines[i].classList.toggle("show_grid");
  }

  if (!e.target.classList.contains("active")) {
    e.target.textContent = "GRID LINES: ON";
  }

  if (e.target.classList.contains("active")) {
    e.target.textContent = "GRID LINES: OFF";
  }
  activeButton(e);
});

// rainbow colors
rainbowBtn.addEventListener("click", (e) => {
  activeButton(e);
});

// erase colors
eraserBtn.addEventListener("click", (e) => {
  activeButton(e);
});

// clear all
clearBtn.addEventListener("click", (e) => {
  reset(1);
});
