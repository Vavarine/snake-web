export default class Snake {
  constructor(x, y, body, res, snakeSprites) {
    this.x = x * res;
    this.y = y * res;
    this.size = res;
    this.dir = "right";
    this.body = body;
    this.snakeSprites = snakeSprites;
  }

  draw() {
    this.body.forEach(bodyPart => {
      const { x, y } = bodyPart;
      const posX = x * this.size;
      const posY = y * this.size;

      const gapSize = this.size / 10;
      const gapX = posX + gapSize;
      const gapY = posY + gapSize;



      fill(0);
      rect(gapX, gapY, this.size - gapSize * 2, this.size - gapSize * 2);
    });
  }
}