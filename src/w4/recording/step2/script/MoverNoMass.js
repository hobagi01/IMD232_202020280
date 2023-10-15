class MoverNoMass {
  constructor(x, y, r) {
    //radius : 매개변수
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0.1);
    this.radius = r; //저장해놓을 실질적인 칸, 그래서 this 없으면 안됨
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  checkEdges() {
    if (this.pos.x < 0) {
      // //0보다 얼마나 뚫고 갔는가?
      // let delta = this.pos.x - 0; //0: 기준으로 삼고 있는
      // // 그 뚫고간 거리에 -1를 곱해 방향을 뒤집고.
      // delta *= -1;
      // // 0을 기준으로 뒤집힌 거리를 더해준다.
      // this.pos.x = 0 + delta;
      this.pos.x -= 0;
      this.pos.x *= -1;
      this.pos.x += 0;
      this.vel.x *= -1;
    } else if (this.pos.x > width - 1) {
      this.pos.x -= width - 1;
      this.pos.x *= -1; // 정확한 위치로 튕김
      this.pos.x += width - 1;
      this.vel.x *= -1;
    }
    if (this.pos.y > height - 1) {
      this.pos.y -= height - 1;
      this.pos.y *= -1; // 정확한 위치로 튕김
      this.pos.y += height - 1;
      this.vel.y *= -1;
    }
  }

  display() {
    noStroke();
    fill(0);
    ellipse(this.pos.x, this.pos.y, 2 * this.radius);
  }

  displayVectors() {
    stroke('red');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.vel.x * 10,
      this.pos.y + this.vel.y * 10
    );
    stroke('blue');
    line(
      this.pos.x,
      this.pos.y,
      this.pos.x + this.acc.x * 100,
      this.pos.y + this.acc.y * 100
    );
  }
}
