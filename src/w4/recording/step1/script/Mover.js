class Mover {
  constructor(x, y, radius) {
    this.pos = createVector(x, y); // 위치
    this.vel = p5.Vector.random2D(); // 속도
    this.vel.mult(2);
    // this.vel = createVector(0, 0); // 속도
    this.acc = createVector(0, 0); // 가속도 위의 세개는 vector
    this.radius = radius; //반지름
    this.mass = radius ** (1 / 2); //질량
  }

  applyForce(force) {
    // force.div(this.mass); // 외부에서 어떤 힘이 들어오면 내 질량으로 나눠버림
    let divedForce = p5.Vector.div(force, this.mass); // force 값은 변화시키지 않고 질량 값에 가함
    this.acc.add(divedForce); //
  }

  update() {
    //cLass에서 function 적어줄 때 앞에 function 적지 말기
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  edgeBounce() {
    if (this.pos.x < 0 + this.radius) {
      let delta = this.pos.x - (0 + this.radius);
      this.pos += -2 * delta; // -2배
      this.vel.x *= -1; // 맞고 튕길때의 값
    } else if (this.pos.x > width - 1 - this.radius) {
      let delta = this.pos.x - (width - 1 - this.radius);
      this.pos.x += -2 * delta; // -2배
      this.vel.x *= -1; // 맞고 튕길때의 값
    }
    if (this.pos.y > height - 1 - this.radius) {
      let delta = this.pos.y - (height - 1 - this.radius);
      this.pos.y += -2 * delta; // -2배
      this.vel.y *= -1; // 맞고 튕길때의 값
    }
  }
  display() {
    ellipse(this.pos.x, this.pos.y, 2 * this.radius); //항상 this가 들어가야 함
  }
}
