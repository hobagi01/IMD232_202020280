class Mover {
  constructor() {
    // reset에 들어가느 부분 넣으면 됨 / 변수를 갖고 있어야 하는 것에 this.를 항상 붙일 것
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(0, 0);
    this.acc = createVector();
  }
  update() {
    this.acc = p5.Vector.random2D();
    this.acc.mult(0.5);
    this.vel.add(this.acc);
    this.vel.limit(10);
    this.pos.add(this.vel);
  }

  infiniteEdge() {
    if (this.pos.x < 0) {
      this.pos.x += width;
    } else if (this.pos.x >= width) {
      this.pos.x -= width;
    }
    if (this.pos.y < 0) {
      this.pos.y += height;
    } else if (this.pos.y >= height) {
      this.pos.y -= height;
    }
  }
  display() {
    ellipse(this.pos.x, this.pos.y, 2 * rad);
  }
}
