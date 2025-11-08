"use strict";

// DOM elements
let color = document.querySelector(".select");
let row = document.querySelector(".row");
let column = document.querySelector(".column");
let slider = document.querySelector(".slider");
let container = document.querySelector(".grid_container");
let gridLines = document.querySelector(".gridLines");
let rainbow = document.querySelector(".rainbow");
let darken = document.querySelector(".darken");
let lighten = document.querySelector(".lighten");
let eraser = document.querySelector(".eraser");
let clear = document.querySelector(".clear");

// reset grid

slider.addEventListener("input", (e) => {
  row.textContent = e.target.value;
  column.textContent = e.target.value;
  changeGrid(slider.value);
});

function changeGrid(size) {
  // clear existing grid
  container.textContent = "";

  // calculate the size of each grid cell
  const containerSize = 700;
  const cellSize = containerSize / size;

  // create grid cells based on input
  for (let i = 0; i < size * size; i++) {
    let cell = document.createElement("div");
    cell.classList.add("grid_cell");
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    container.appendChild(cell);
  }
}
