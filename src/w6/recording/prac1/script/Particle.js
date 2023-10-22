class Particle {
  constructor(x, y, hue, vx, vy) {
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector();
    this.lifespan = 60;
    this.hue = hue;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.add(gravity);
    this.lifespan--;
  }

  display() {
    fill(this.hue, 100, 50, map(this.lifespan, 0, 60, 0, 100));
    noStroke();
    ellipse(this.position.x, this.position.y, 10, 10);
  }

  isDead() {
    return this.lifespan <= 0 || this.position.y > height;
  }
}
