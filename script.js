const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color';

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setColor(newColor) {
    currentColor = newColor;
}

const grid = document.getElementById('grid');
const clearBtn = document.getElementById('clearBtn');
const eraserBtn = document.getElementById('eraserBtn');
const colorBtn = document.getElementById('colorBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');

sizeSlider.onmousemove = (e) => {
    displaysize(e.target.value);
}

sizeSlider.onchange = (e) => {
    displaysize(e.target.value);
    updateSize(e.target.value);
}

colorBtn.oninput = (e) => {
    setColor(e.target.value);
}

eraserBtn.onclick = () => {
    setColor('#ffffff');
}

clearBtn.onclick = () => {
    grid.innerHTML = '';
    setupGrid(DEFAULT_SIZE);
}

let mouseDown = false;
document.body.onmousedown = () => { mouseDown = true; }
document.body.onmouseup = () => { mouseDown = false; } 

function displaysize(size) {
    sizeValue.innerHTML = `${size} x ${size}`;
    sizeSlider.value = size;
}

function updateSize(size) {
    grid.innerHTML = '';
    setupGrid(size);
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    displaysize(size);
    for (let i = 0; i < size*size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', function(e) {
            if (!mouseDown) {
                return;   
            } else {
                e.target.style.background = currentColor;
            }
        })
        gridElement.addEventListener('mousedown', function(e) {
            e.target.style.background = currentColor;
        })
        grid.appendChild(gridElement);
    }
}

function startDrawing(e) {
    if (!mouseDown) {
        return;   
    } else {
        e.target.style.background = currentColor;
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE);
}