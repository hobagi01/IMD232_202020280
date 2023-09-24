let pos;
let vel;
let acc;
let radius = 50;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('white');
  pos = createVector(width / 3, height / 2);
  vel = p5.Vector.random2D();
  //   vel.mult(5);
  vel.mult(0);
  acc = createVector(0, 0.01);
  console.log(vel.mag());
}
function draw() {
  background('white');
  update();
  infiniteEdge();
  display();
}

function update() {
  vel.add(acc); //속도도 매번 가속도가 붙음
  vel.limit(20); //가속도 한계 걸어주기 , 20보다 커지지는 않도록
  pos.add(vel);
}

function infiniteEdge() {
  vel.add(acc); //속도도 매번 가속도가 붙음
  vel.limit(20); //가속도 한계 걸어주기 , 20보다 커지지는 않도록
  pos.add(vel);
  if (pos.x < 0) {
    pos.x += width;
  } else if (pos.x >= width) {
    pos.x -= width;
  }
  if (pos.y < 0) {
    pos.y += height;
  } else if (pos.y >= height) {
    pos.y -= height;
  }
}
function display() {
  ellipse(pos.x, pos.y, 2 * radius);
}
