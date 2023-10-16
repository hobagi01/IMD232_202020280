class Emitter {
  constructor(emittingPosX, emittingPosY) {
    this.emittingPos = createVector(emittingPosX, emittingPosY);
    this.balls = [];
  }

  createBall() {
    this.balls.push(
      new Ball(
        this.emittingPos.x,
        this.emittingPos.y,
        (-TAU / 360) * -90 + random((TAU / 360) * -30, (TAU / 360) * 30), //angle
        random(2, 15), //위로 쏘아지는 힘
        random(1, 5),
        random(360),
        100,
        50
      )
    );
  }

  applyGravity(gravity) {
    this.balls.forEach((each) => {
      const scaledG = p5.Vector.mult(gravity, each.mass);
      each.applyForce(scaledG);
    });
  }

  applyForce(force) {
    // this.balls.forEach((each) => {
    //   each.applyForce(force);
    // });
    for (let index = this.balls.length - 1; index >= 0; index--) {
      this.balls[index].update();
      if (this.balls[index].isDead()) {
        this.balls.splice(index, 1);
      }
    }
  }

  update() {
    this.balls.forEach((each) => {
      each.update();
    });
  }

  display() {
    this.balls.forEach((each) => {
      each.display();
    });
  }
}
