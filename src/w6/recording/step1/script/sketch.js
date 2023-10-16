class Emitter {
  constructor(emittingPosX, emittingPosY) {
    this.emittingPos = createVector(emittingPosX, emittingPosY);
    this.balls = []; //정확히는 particles / 아래에 있는 balls와는 완전히 다름 , 아래는 let balls , 여기는 class 안에 있는 balls
  } //한점에서 쫄쫄쫄 나올 것
  createBall() {
    this.balls.push(
      new ball(
        this.emittingPos.x,
        this.emittingPos.y,
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
    this.balls.forEach((each) => {
      each.applyForce();
    });
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

class ball {
  // 되도록 Ball로 해주는 게 좋을 것
  constructor(posX, posY, mass, h, s, v) {
    this.pos = createVector(posX, posY);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = mass;
    this.rad = this.mass * 5;
    this.color = color(h, s, v);
  }

  applyForce(force) {
    const calcedAcc = p5.Vector.div(force, this.mass);
    // const calcedAcc = force.div(this.mass); // force가 값이 바뀌어버려서 나중에 사용하려 했을 때 이미 나눈 값으로 나옴
    this.acc.add(calcedAcc);
  }
  update() {
    this.vel.add(this.acc);
    // this.vel.limit(5);
    this.pos.add(this.vel);
    // this.acc.set(0,0);
    // this.acc.setMag(0); //길이를 0으로 하여라 , 가끔 오류날 때 있다드라
    this.acc.mult(0); //0을 곱하면 무조건 0 , 가장 많이 사용하는 방법
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }
}

let emitter;
let balls = [];
let gravity;
let wind;

function setup() {
  setCanvasContainer('canvas', 2, 1, true);

  colorMode(HSL, 360, 100, 100);

  emitter = new Emitter(width / 2, 0);

  for (let n = 0; n < 10; n++) {
    balls.push(new ball(random(width), 0, random(1, 20), random(360), 100, 50));
  }

  gravity = createVector(0, 0.1);
  wind = createVector(0.5, 0);

  background(255);
}
function draw() {
  background(255);
  balls.forEach((each) => {
    const scaledG = p5.Vector.mult(gravity, each.mass);
    each.applyForce(scaledG);
    each.applyForce(wind);
    each.update();
    each.display();
  }); //function(){} = () => {} // (a) => {} a: balls [0] , balls[1]...
  emitter.createBall();
  emitter.applyGravity(gravity);
  emitter.applyForce(wind);
}

function mousePressed() {
  for (let n = 0; n < balls.length; n++) {
    balls[n] = new ball(random(width), 0, random(1, 20), random(360), 100, 50);
  } // 전에 만든것 덮음
}
