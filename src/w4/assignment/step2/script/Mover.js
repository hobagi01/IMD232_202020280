class Mover {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(0);
    this.acc = createVector(0);
    this.mass = mass;
    this.rad = mass;
    this.isHover = false;
    this.isDragging = false;
    this.draggingOffset = createVector(0, 0);
  }

  applyForce(force) {
    const f = force.copy().div(this.mass);
    this.acc.add(f);
  }

  update() {}

  edgeBounce() {
    const bounce = -0.7;
    if (this.pos.x < 0 + this.rad) {
      this.pos.x = 0 + this.rad;
      this.vel.x *= bounce;
    } else if (this.pos.x > width - 1 - this.rad) {
      this.pos.x = width - 1 - this.rad;
      this.vel.x *= bounce;
    }
    if (this.pos.y > height - 1 - this.rad) {
      this.pos.y = height - 1 - this.rad;
      this.vel.y *= bounce;
    }
  }

  display() {
    noStroke();
    fill(0);
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }

  mouseMoved(mX, mY) {
    this.isHover =
      (this.pos.x - mX) ** 2 + (this.pos.y - mY) ** 2 <= this.rad ** 2;
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
    }
  }

  mouseDragged(mX, mY) {
    if (this.isDragging) {
    }
  }

  mouseReleased() {
    this.isDragging = false;
  }
}
