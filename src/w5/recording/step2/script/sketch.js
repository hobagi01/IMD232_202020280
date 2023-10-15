let anArray = [];

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  //   line(10, 10, 10, height - 10);
  //   line(20, 10, 20, height - 10);
  //   line(30, 10, 30, height - 10);
  //   line(40, 10, 40, height - 10);
  //   line(50, 10, 50, height - 10);
  //   line(60, 10, 60, height - 10);
  //   line(70, 10, 70, height - 10);
  //   line(80, 10, 80, height - 10);
  //   line(90, 10, 90, height - 10);
  for (let a = 0; a < width; a += 10) {
    line(a + 10, 10, a + 10, height - 10); // 조건이 부합할 때까지 반복 시행
  }
  for (let a = 0; a < anArray.length; a++) {
    console.log('anArray[${a}]', anArray[a]);
  }
  for (let a = 0; a < 20; a++) {
    circle(a * 10, height / 2, 20);
  }
}
function draw() {}
