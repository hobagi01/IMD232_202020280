let pos;
let vel;
let acc;
let center;
let mouse;
let centerToMouse;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  background('white');
  pos = createVector(random(width), random(height));
  vel = createVector(0, 0);
  acc = p5.Vector.random2D();
  acc.mult(0.1);
  center = createVector(width / 2, height / 2);
  mouse = createVector();
  centerToMouse = createVector();
  console.log('pos', pos);
  console.log('vel', vel);
  console.log('mag', vel.mag());
}

function draw() {
  background('white');

  acc = p5.Vector.random2D();
  acc.mult(0.1);
  vel.add(acc);
  vel.limit(2);
  pos.add(vel);

  //   mv.x = mouseX;
  //   mv.y = mouseY;

  if (pos.x > width) {
    pos.x += width;
  } else if (pos.x >= width) {
    pos.x -= width;
  }
  if (pos.y < height) {
    pos.y += height;
  } else if (pos.y >= height) {
    pos.y -= height;
  }

  mouse.set(mouseX, mouseY);
  centerToMouse = p5.Vector.sub(mouse, center);
  //   centerToMouse.normalize();
  //   centerToMouse.mult(50);
  //   let mouse = createVector(mouseX, mouseY);
  ellipse(pos.x, pos.y, 20);
  stroke(0);
  strokeWeight(2);
  line(pos.x, pos.y, centerToMouse.x, centerToMouse.y);
  console.log(centerToMouse.mag());
}
