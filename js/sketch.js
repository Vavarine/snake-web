import Game from "./Game.js";

const res = 20;
const cols = 50;
const rows = 30;

let game;
let foodImage;
let snakeImages;

function preload() {
  foodImage = loadImage("assets/images/food.png");

  snakeImages = {
    body: loadImage("/assets/images/body.png"),
    head: loadImage("/assets/images/head.png"),
    headOpenMouth: loadImage("/assets/images/head_open_mouth.png"),
    tail: loadImage("/assets/images/tail.png"),
    corner: loadImage("/assets/images/body_corner.png"),
    cornerFull: loadImage("/assets/images/body_corner_full.png"),
    full: loadImage("/assets/images/body_full.png"),
  }
}

function setup() {
  drawingContext.imageSmoothingEnabled = false;

  game = new Game(res, cols, rows, foodImage, snakeImages);
}

function draw() {
  clear()

  if (!game) return
  game.draw()
}

window.preload = preload
window.setup = setup
window.draw = draw
