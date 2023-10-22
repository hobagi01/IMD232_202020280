class Particle {
  constructor(x, y, h, s, v) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, random(1, 3)); // 떨어지는 속도를 느리게 설정
    this.size = 10;
    this.angle = random(TWO_PI);
    this.rotationSpeed = random(-0.1, 0.1); // 더 빠른 회전 속도 설정
    this.color = color(h, s, v);
  }

  applyForce(force) {
    this.velocity.add(force);
    this.velocity.mult(0.96);
  }

  update() {
    this.position.add(this.velocity);
    this.angle += this.rotationSpeed;
  }

  isDead() {
    return this.position.y > height;
  }

  display() {
    noStroke();
    fill(this.color);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rect(0, 0, this.size, this.size);
    pop();
  }
}
