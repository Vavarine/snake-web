export default class Food {
  constructor(x, y, res, sprite) {
    this.x = x * res;
    this.y = y * res;
    this.size = res;
    this.sprite = sprite;
  }

  draw() {
    this.sprite.draw(this.x, this.y);
  }

  respawn(foodPosition) {
    this.x = foodPosition.x * this.size;
    this.y = foodPosition.y * this.size;
  }
}