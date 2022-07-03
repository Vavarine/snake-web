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
    this.body.forEach((bodyPart, i) => {

      const { x, y } = bodyPart;
      const posX = x * this.size;
      const posY = y * this.size;
      const nextBodyDir = this.body[i - 1]?.dir;


      const flip = bodyPart.dir === "left";
      const corner = nextBodyDir !== bodyPart.dir;

      if (i === 0) {
        const dir = bodyPart.dir !== "left" && bodyPart.dir;

        this.snakeSprites.head.draw(posX, posY, dir, flip);
        return
      }

      if (i === this.body.length - 1) {
        const dir = bodyPart.dir !== "left" && bodyPart.dir;

        this.snakeSprites.tail.draw(posX, posY, dir, flip);
        return
      }

      if (corner) {
        const xFlip = bodyPart.dir === "up" && nextBodyDir === "left" || bodyPart.dir === "down" && nextBodyDir === "right";
        const yFlip = bodyPart.dir === "right" && nextBodyDir === "up" || bodyPart.dir === "left" && nextBodyDir === "down";

        this.snakeSprites.corner.draw(posX, posY, bodyPart.dir, xFlip, yFlip);
        return
      }

      this.snakeSprites.body.draw(posX, posY, bodyPart.dir, flip);
    });
  }
}