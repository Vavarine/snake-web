import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

import Snake from './Snake.js';
import Food from './Food.js';
import Sprite from "./Sprite.js"

export default class Game {
  constructor(res, cols, rows, foodImage, snakeImages) {

    this.res = res;
    this.cols = cols
    this.rows = rows
    this.snakes = []
    this.foods = [];
    this.foodSprite = new Sprite(foodImage, this.res);

    this.snakeSprites = Object.keys(snakeImages).reduce((acc, cur) => ({ ...acc, [cur]: new Sprite(snakeImages[cur], this.res) }), {});

    console.log("snakeSprites", this.snakeSprites)

    this.socket = io("http://localhost:3333", { transports: ['websocket'] });

    createCanvas(cols * res, rows * res);
    drawingContext.imageSmoothingEnabled = false;

    this.setup()
  }

  setup() {
    this.socket.on("connect", () => {
      console.log("connected");

      this.socket.emit('join')
      this.setupControls()
    })

    this.socket.on('update', (data) => {
      const snakes = data.snakes.map(snakeData => {
        const { x, y, body } = snakeData;

        return new Snake(x, y, body, this.res, this.snakeSprites)
      })

      const foods = data.foods.map(foodData => {
        const { x, y } = foodData;

        return new Food(x, y, this.res, this.foodSprite)
      })

      this.snakes = snakes;
      this.foods = foods;
    })

    this.socket.on('joined', (data) => {
      console.log("joined", data);
    })

    const foodPosition = this.getFoodRandomPosition(this.cols, this.rows);
    this.food = new Food(foodPosition.x, foodPosition.y, this.res, this.foodSprite);
  }

  draw() {
    this.foods.forEach(food => food.draw());
    this.snakes.forEach(snake => snake.draw());
  }

  setupControls() {
    addEventListener('keydown', (e) => {
      const map = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right'
      }

      console.log("keydown", e.key)

      const dir = map?.[e.key];

      this.socket.emit('changeDir', { dir })
    })
  }

  getFoodRandomPosition(cols, rows) {
    return {
      x: floor(random(0, cols - 1)),
      y: floor(random(0, rows - 1))
    }
  }

  gameOver(snake) {
    // this.snakes = [new Snake(10, 10, this.res)];
  }
}