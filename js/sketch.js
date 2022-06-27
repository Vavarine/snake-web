import Game from "./Game.js";
const res = 20;
const cols = 50;
const rows = 30;

let game;
let foodImage;

function preload() {
  foodImage = loadImage("assets/food.png");
}

function setup() {
  game = new Game(res, cols, rows, foodImage);
  game.setupControls()
}

function draw() {
  clear()
  game.draw()
}

window.preload = preload
window.setup = setup
window.draw = draw
