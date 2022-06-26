export default class Snake {
  constructor(x, y, res) {
    this.x = x * res;
    this.y = y * res;
    this.size = res;
    this.dir = "right";
    this.body = [{ x: this.x, y: this.y }, { x: this.x - this.size, y: this.y }, { x: this.x - this.size * 2, y: this.y }];
  }

  draw() {
    this.body.forEach(bodyPart => {
      const gapSize = this.size / 10;
      const gapX = bodyPart.x + gapSize;
      const gapY = bodyPart.y + gapSize;

      fill(0);
      rect(gapX, gapY, this.size - gapSize * 2, this.size - gapSize * 2);
    });

    this.move();
  }

  move() {
    const map = {
      'up': { x: 0, y: -1 },
      'down': { x: 0, y: 1 },
      'left': { x: -1, y: 0 },
      'right': { x: 1, y: 0 }
    }

    this.x += map[this.dir].x * this.size;
    this.y += map[this.dir].y * this.size;

    this.body.unshift({ x: this.x, y: this.y });
    this.body.pop();
  }

  grow() {
    this.body.push({ x: this.x, y: this.y });
  }
}