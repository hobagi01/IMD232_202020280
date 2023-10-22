class Ball {
  constructor(posX, posY, velAngle, velMag, mass, Hue) {
    this.pos = createVector(posX, posY);
    this.vel = createVector(1, 0);
    this.vel.rotate(velAngle);
    this.vel.mult(velMag);
    this.acc = createVector();
    this.mass = mass;
    this.rad = 6;
    this.lifespan = 60;
    this.Hue = Hue;
  }

  applyForce(force) {
    const calcedAcc = p5.Vector.div(force, this.mass);
    this.acc.add(calcedAcc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.mult(0.89);
    this.acc.mult(0);
    this.lifespan--;
  }

  display() {
    colorMode(HSB, 100);
    noStroke();
    fill(this.Hue, 100, 100, this.lifespan * 2);
    ellipse(this.pos.x, this.pos.y, this.rad * 2);
  }

  isDead() {
    return (
      this.pos.x < -this.rad ||
      this.pos.x > width + this.rad ||
      this.pos.y > height + this.rad ||
      this.lifespan < 0
    );
  }
}
