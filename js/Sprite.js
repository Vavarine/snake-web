export default class Sprite {
  constructor(image, res) {
    this.image = image;
    this.res = res;

    this.image.loadPixels();
  }

  draw(x, y, dir = "right", color = "#000", xFlip = false, yFlip = false) {
    const spriteHeight = this.image.height;
    const spriteWitdh = this.image.width;
    const pixelSize = this.res / spriteHeight
    const spritePixels = this.image.pixels;

    const dirRadiansMap = {
      "up": 3 * PI / 2,
      "down": PI / 2,
      "left": PI,
      "right": 0,
    }

    push()
    translate(x + this.res / 2, y + this.res / 2);

    if (xFlip) scale(-1, 1)
    if (yFlip) scale(1, -1)

    rotate(dirRadiansMap[dir])

    for (let i = 0; i < spriteWitdh; i++) {
      for (let j = 0; j < spriteHeight; j++) {
        const pixelAlpha = spritePixels[(i + j * spriteWitdh) * 4 + 3];

        if (pixelAlpha !== 0) {
          noStroke();
          fill(color);
          rect((i * pixelSize) - this.res / 2, (j * pixelSize) - this.res / 2, pixelSize, pixelSize);
        }
      }
    }

    pop()
  }
}