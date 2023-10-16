class Ball {
  // 초기 속도가 없으면 gravity만 적용되지만, 초기 속도가 있으면 원하는 정도로 먼저 나아가다가 중력을 받을 수 있음
  constructor(posX, posY, velAngle, velMag, velX, velY, mass, h, s, v) {
    //나가는 방향, 정도가 중요할 것
    this.pos = createVector(posX, posY);
    this.vel = createVector(velX, velY);
    this.vel.rotate(velAngle);
    this.vel.mult(velMag);
    this.acc = createVector();
    this.mass = mass;
    this.rad = this.mass * 5;
    this.color = color(h, s, v);
  }

  applyForce(force) {
    const calcedAcc = p5.Vector.div(force, this.mass);
    // const calcedAcc = force.div(this.mass);
    this.acc.add(calcedAcc);
  }

  update() {
    this.vel.add(this.acc);
    // this.vel.limit(5);
    this.pos.add(this.vel);
    // this.acc.set(0, 0);
    // this.acc.setMag(0);
    this.acc.mult(0);
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }

  isDead() {
    //조건 : 그 조건에 만족할 경우 나가리~ // 생겨나는 타이밍은 같지만, 죽는 타이밍은 살짝 다름?
    // if(this.pos.x >=0 + this.rad)//화면 안에 있는 경우 + 원의 중심에서 마진 r을 기준으로
    return (
      this.pos.X < -this.rad || //&& : and ||: or
      this.pos.x > width + this.rad ||
      // this.pos.y < -this.rad || //위로 올라가면 죽는 조건
      this.pos.y > height + this.rad
    );
  }
}
