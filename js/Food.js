export default class Food {
  constructor(x, y, res, sprite) {
    this.x = x * res;
    this.y = y * res;
    this.sprite = sprite;
  }

  draw() {
    this.sprite.draw(this.x, this.y);
  }
}