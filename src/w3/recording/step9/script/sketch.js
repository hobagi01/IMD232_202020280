let center;
let mouse;
let centerToMouse;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('pink');
  center = createVector(width / 2, height / 2);
  mouse = createVector();
  centerToMouse = createVector();
}
function draw() {
  background('pink');
  mouse.set(mouseX, mouseY);
  centerToMouse = p5.Vector.sub(mouse, center);
  strokeWeight(2);
  stroke('white');
  translate(center.x, center.y);
  line(0, 0, centerToMouse.x, centerToMouse.y);

  centerToMouse.normalize();
  centerToMouse.mult(50);
  strokeWeight(4);
  stroke('black');
  line(0, 0, centerToMouse.x, centerToMouse.y);
  console.log(centerToMouse.mag());
}
