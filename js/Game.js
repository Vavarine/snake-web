import Snake from './Snake.js';
import Food from './Food.js';
import Sprite from "./Sprite.js"

export default class Game {
  constructor(res, cols, rows, foodImage) {
    this.res = res;
    this.cols = cols
    this.rows = rows
    this.snakes = []
    this.food;
    this.foodSprite = new Sprite(foodImage, this.res);

    frameRate(5);
    createCanvas(cols * res, rows * res);

    this.setup(foodImage)
  }

  setup() {

    this.snakes = [new Snake(10, 10, this.res)];

    const foodPosition = this.getFoodRandomPosition(this.cols, this.rows);
    this.food = new Food(foodPosition.x, foodPosition.y, this.res, this.foodSprite);
  }

  draw() {
    this.food.draw();

    this.snakes.forEach(snake => {
      snake.draw();
      this.calculateSnakeColisions(snake)
      this.calculateSnakeFoodColision(snake)
    });
  }

  setupControls() {
    addEventListener('keydown', (e) => {
      const map = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right'
      }

      this.snakes[0].dir = map[e.key] || this.snakes[0].dir;
    })
  }

  getFoodRandomPosition(cols, rows) {
    return {
      x: floor(random(0, cols - 1)),
      y: floor(random(0, rows - 1))
    }
  }

  calculateSnakeColisions(snake) {
    if (snake.x < 0 || snake.x >= this.cols * this.res || snake.y < 0 || snake.y >= this.rows * this.res) {
      this.gameOver(snake);
    }
  }

  calculateSnakeFoodColision(snake) {
    if (snake.x === this.food.x && snake.y === this.food.y) {
      this.food.respawn(this.getFoodRandomPosition(this.cols, this.rows))
      snake.grow();
    }
  }


  gameOver(snake) {
    snake.body.forEach(bodyPart => {
      console.log(bodyPart)
    });

    this.snakes = [new Snake(10, 10, this.res)];
  }
}