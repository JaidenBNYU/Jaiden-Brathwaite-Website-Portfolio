function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(0);
  cursor(CROSS);
}

let worms = [];
function draw() {
  background(0);

  for (let i = 0; i < worms.length; i++) {
    worms[i].display();
  }
}

function mousePressed() {
  worms.push(new Worm(mouseX, mouseY, random(100), floor(random(20, 200))));
}

class Worm {
  constructor(initX, initY, thickness, numSegments) {
    this.xLoc = [];
    this.yLoc = [];
    this.numSegments = numSegments;

    for (let i = 0; i < numSegments; i++) {
      this.xLoc[i] = initX;
      this.yLoc[i] = initY;
    }
    this.thickness = thickness;
    this.counter = 0;

    this.n = random(0.1);
    this.speed = random(60);
    this.x = initX;
    this.y = initY;
    this.offset = random(70);
    this.redness = random(50, 200);
    this.greenness = random(50, 200);
    this.blueness = random(50, 200);
  }

  display() {
    this.xLoc[this.numSegments - 1] = this.x;
    this.yLoc[this.numSegments - 1] = this.y;

    for (let i = 0; i < this.numSegments - 1; i++) {
      this.xLoc[i] = this.xLoc[i + 1];
      this.yLoc[i] = this.yLoc[i + 1];

      let diameter =
        cos(map(i, 0, this.numSegments - 1, 0, PI)) * this.thickness;

      let r = this.redness * (1 + sin(map(i, 0, this.numSegments - 1, 0, PI)));

      let g =
        this.greenness * (1 - sin(map(i, 0, this.numSegments - 1, 0, PI)));

      let b = this.blueness * (1 + cos(map(i, 0, this.numSegments - 1, 0, PI)));

      let colorWave =
        (1 +
          cos(map(i, 0, this.numSegments - 1, 0, PI * 4) + this.counter * 2)) /
        2;

      stroke(r * colorWave + 100, g * colorWave + 60, b * colorWave + 95);
      ellipse(this.xLoc[i], this.yLoc[i], diameter);
    }

    this.x += this.speed * (1 - 2 * noise(this.counter));
    this.y += this.speed * (1 - 2 * noise(this.counter + this.offset));

    this.counter += this.n;

    if (this.x > height + this.thickness / 2) {
      this.x = 0;
    }
    if (this.x < -this.thickness / 2) {
      this.x = height;
    }
    if (this.y > width + this.thickness / 2) {
      this.y = 0;
    }
    if (this.y < -this.thickness / 2) {
      this.y = width;
    }
  }
}
