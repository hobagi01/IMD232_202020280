// class Vehicle {
//   constructor(x, y, rad, speedMx, forceMx, color) {
//     this.pos = createVector(x, y);
//     this.vel = createVector();
//     this.acc = createVector();
//     this.mass = 1; //항상 넣는 편
//     this.rad = rad;
//     //기본적인 코드일것
//     this.speedMx = speedMx;
//     this.forceMx = forceMx;
//     this.color = color;
//   }

//   seek(target) {
//     //target.sub(this.pos);//target.sub 하면 위치 값이 변해버림
//     let desired = p5.Vector.sub(target, this.pos);
//     // desired.normalize();
//     // desired.mult(this.speedMx);
//     desired.setMag(this.speedMx);
//     let steering = p5.Vector.sub(desired, this.vel);
//     if (debug) {
//       push();
//       translate(this.pos.x, this.pos.y);
//       noFill();
//       stroke(127);
//       line(0, 0, desired.x * 10, desired.y * 10);
//       stroke(0, 0, 255);
//       line(0, 0, steering.x * 10, steering.y * 10);
//       pop();
//     }
//     steering.limit();
//     this.applyForce(steering);
//   }
//   applyForce(force) {
//     // force.div(this.mass);// 복사를 떠서 나누기를 해야 원래 질량 유지 가능
//     let calcedAcc = p5.Vector.div(force, this.mass); // 변수가 아닐경우 const로 주로 쓰는 편 // 원래의ㅣ acc와는 다른 것 : calcedAcc
//     this.acc.add(calcedAcc);
//   }
//   update() {
//     this.vel.add(this.acc);
//     this.pos.add(this.vel);
//     // 중력? 바람? 인력?을 넣기위해 초기화
//     this.acc.mult(0);
//   }

//   display() {
//     let angle = this.vel.heading();
//     push();
//     translate(this.pos.x, this.pos.y);
//     rotate(angle);
//     noStroke();
//     fill(this.color);
//     beginShape();
//     vertex(this.rad, 0);
//     vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
//     vertex(0, 0);
//     vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
//     endShape(CLOSE);
//     pop();
//   }
// }

class Vehicle {
  constructor(x, y, rad, speedMx, forceMx, color) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = 1;
    this.rad = rad;
    this.speedMx = speedMx;
    this.forceMx = forceMx;
    this.color = color;
  }

  seek(target) {
    // target.sub(this.pos);
    let desired = p5.Vector.sub(target, this.pos);
    // desired.normalize();
    // desired.mult(this.speedMx);
    desired.setMag(this.speedMx);
    let steering = p5.Vector.sub(desired, this.vel);
    if (debug) {
      push();
      translate(this.pos.x, this.pos.y);
      noFill();
      stroke(127);
      line(0, 0, desired.x * 10, desired.y * 10);
      stroke(0, 0, 255);
      line(0, 0, steering.x * 10, steering.y * 10);
      pop();
    }
    steering.limit(this.forceMx);
    this.applyForce(steering);
  }

  applyForce(force) {
    // force.div(this.mass);
    let calcedAcc = p5.Vector.div(force, this.mass);
    this.acc.add(calcedAcc);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    let angle = this.vel.heading();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    noStroke();
    fill(this.color);
    beginShape();
    vertex(this.rad, 0);
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
    vertex(0, 0);
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135)));
    endShape(CLOSE);
    pop();
  }
}
