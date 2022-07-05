export default class Snake {
  constructor(x, y, body, res, snakeSprites, id, nickname, color) {
    this.x = x * res;
    this.y = y * res;
    this.size = res;
    this.dir = "right";
    this.body = body;
    this.snakeSprites = snakeSprites;
    this.id = id;
    this.nickname = nickname;
    this.color = color
  }

  draw(foods) {
    const aboutToEat = foods.some(food => {
      const distance = dist(this.x, this.y, food.x, food.y);
      return distance < this.size * 2;
    })

    this.body.forEach((bodyPart, i) => {
      const { x, y } = bodyPart;
      const posX = x * this.size;
      const posY = y * this.size;
      const nextBodyDir = this.body[i - 1]?.dir;
      const flip = bodyPart.dir === "left";
      const corner = nextBodyDir !== bodyPart.dir;

      if (i === 0) {
        const dir = bodyPart.dir !== "left" && bodyPart.dir;

        if (aboutToEat) {
          this.snakeSprites.headOpenMouth.draw(posX, posY, dir, this.color, flip);
        } else {
          this.snakeSprites.head.draw(posX, posY, dir, this.color, flip);
        }
        return
      }

      if (i === this.body.length - 1) {
        const dir = bodyPart.dir !== "left" && bodyPart.dir;

        this.snakeSprites.tail.draw(posX, posY, dir, this.color, flip);
        return
      }

      if (corner) {
        const xFlip = bodyPart.dir === "up" && nextBodyDir === "left" || bodyPart.dir === "down" && nextBodyDir === "right";
        const yFlip = bodyPart.dir === "right" && nextBodyDir === "up" || bodyPart.dir === "left" && nextBodyDir === "down";

        if (bodyPart.hasFood) {
          this.snakeSprites.cornerFull.draw(posX, posY, bodyPart.dir, this.color, xFlip, yFlip);
        } else {
          this.snakeSprites.corner.draw(posX, posY, bodyPart.dir, this.color, xFlip, yFlip);
        }

        return
      }

      if (bodyPart.hasFood) {
        this.snakeSprites.full.draw(posX, posY, bodyPart.dir, this.color, flip);

        return
      }

      this.snakeSprites.body.draw(posX, posY, bodyPart.dir, this.color, flip);
    });
  }
}