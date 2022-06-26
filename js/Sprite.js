export default class Sprite {
  constructor(image, res) {
    this.image = image;
    this.res = res;

    this.image.loadPixels();
  }

  draw(x, y, dir) {
    const spriteHeight = this.image.height;
    const spriteWitdh = this.image.width;
    const pixelSize = this.res / spriteHeight
    const spritePixels = this.image.pixels;

    for (let i = 0; i < spriteWitdh; i++) {
      for (let j = 0; j < spriteHeight; j++) {
        const pixelAlpha = spritePixels[(i + j * spriteWitdh) * 4 + 3];

        noStroke();
        fill(0, 0, 0, pixelAlpha);
        rect(x + (i * pixelSize), y + (j * pixelSize), pixelSize, pixelSize);
      }
    }
  }
}