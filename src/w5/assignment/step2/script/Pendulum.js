class Pendulum {
  constructor(x, y, length, angle, rad) {
    this.angle = angle;
    this.angleVel = 0;
    this.angleAcc = 0;
    this.pos = createVector(x, y);
    this.length = length;
    this.ballPos = createVector(x, y);
    this.ballPos.add(
      cos(this.angle) * this.length,
      sin(this.angle) * this.length
    );
    this.newBallPos = createVector();
    this.newBallPos.add(
      cos(this.angle) * this.length,
      sin(this.angle) * this.length
    );
    this.rad = rad;
    this.draggingOffset = createVector();
    this.isHover = false;
    this.isDragging = false;
  }

  applyGravity(gravity) {
    this.angleAcc =
      (sin(this.angle - (TAU / 360) * 90) * -gravity.y) / this.length;
  }

  update() {
    if (!this.isDragging) {
      this.angleVel += this.angleAcc;
      this.angle += this.angleVel;
      this.angleVel *= 0.998;
    }
    this.ballPos.set(
      cos(this.angle) * this.length + this.pos.x,
      sin(this.angle) * this.length + this.pos.y
    );
    this.newBallPos.set(
      cos(this.angle) * this.length + this.ballPos.x,
      sin(this.angle) * this.length + this.ballPos.y
    );
  }

  newBallPos() {
    this.newBallPos(newBallPos.x, newBallPos.y);
  }

  display() {
    noStroke();
    fill(127);
    ellipse(this.pos.x, this.pos.y, 20);
    if (this.isDragging) {
      fill('#ff0000');
    } else if (this.isHover) {
      fill(127);
    } else {
      fill(191);
    }
    ellipse(this.ballPos.x, this.ballPos.y, 2 * this.rad);
    stroke(0);
    noFill();
    line(this.pos.x, this.pos.y, this.ballPos.x, this.ballPos.y);

    noStroke();
    fill(127);
    ellipse(this.ballPos.x, this.ballPos.y, 20);
    if (this.isDragging) {
      fill('#ff0000');
    } else if (this.isHover) {
      fill(127);
    } else {
      fill(191);
    }
    ellipse(this.newBallPos.x, this.newBallPos.y, 2 * this.rad);
    stroke(0);
    noFill();
    line(this.ballPos.x, this.ballPos.y, this.newBallPos.x, this.newBallPos.y);
  }

  mouseMoved(mX, mY) {
    this.isHover =
      (this.ballPos.x - mX) ** 2 + (this.ballPos.y - mY) ** 2 <= this.rad ** 2;
    this.isHover =
      (this.newBallPos.x - mX) ** 2 + (this.newBallPos.y - mY) ** 2 <=
      this.rad ** 2;
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
      this.isDragging = true;
      this.angleAcc = 0;
      this.angleVel = 0;
      this.draggingOffset.set(mX - this.ballPos.x, mY - this.ballPos.y);
      this.draggingOffset.set(mX - this.newBallPos.x, mY - this.newBallPos.y);
    }
  }

  mouseDragged(mX, mY) {
    if (this.isDragging) {
      const ballShouldBe = createVector(
        mX - this.draggingOffset.x,
        mY - this.draggingOffset.y
      );
      const angle = atan2(
        ballShouldBe.y - this.pos.y,
        ballShouldBe.x - this.pos.x
      );
      this.angle = angle;
    }
  }

  mouseReleased() {
    this.isDragging = false;
  }
}
