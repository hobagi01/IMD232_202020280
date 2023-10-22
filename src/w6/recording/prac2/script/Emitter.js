class Emitter {
  constructor(emittingPosX, emittingPosY) {
    this.emittingPos = createVector(emittingPosX, emittingPosY);
    this.balls = [];
    this.ballNum = 1; // Set the number of balls to 100
    this.hasCreatedBall = false;
  }

  createBall() {
    if (this.hasCreatedBall) {
      return;
    }
    for (let i = 0; i < this.ballNum; i++) {
      // Loop through 100 times to create 100 balls
      const angle = random(TAU);
      const p = new Ball(
        this.emittingPos.x,
        this.emittingPos.y,
        angle,
        random(19, 20),
        10,
        random(30, 100)
      );
      this.balls.push(p);
    }
    this.hasCreatedBall = true;
  }

  applyGravity(gravity) {
    this.balls.forEach((each) => {
      const scaledG = p5.Vector.mult(gravity, each.mass);
      each.applyForce(scaledG);
    });
  }

  update() {
    for (let i = this.balls.length - 1; i >= 0; i--) {
      this.balls[i].update();
      if (this.balls[i].isDead()) {
        this.balls.splice(i, 1);
      }
    }
  }

  display() {
    this.balls.forEach((each) => {
      each.display();
    });
  }
  isDead() {
    return this.balls.length === 0;
  }
}
