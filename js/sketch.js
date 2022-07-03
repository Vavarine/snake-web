import Game from "./Game.js";

const res = 20;
const cols = 50;
const rows = 30;

let game;
let foodImage;
let snakeImages;

function preload() {
  foodImage = loadImage("assets/food.png");

  snakeImages = {
    body: loadImage("assets/body.png"),
    head: loadImage("assets/head.png"),
    tail: loadImage("assets/tail.png"),
    corner: loadImage("assets/body_corner.png"),
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

