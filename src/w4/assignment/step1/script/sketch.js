let bodies = []; // 상수 되도록 안쓰는 게 좋은 게 : 변하면 안되는 수이기 때문 / 변할 수 있는 함수이기 때문 -> 그래서 let으로 쓰는 게 나음
const bodyNum = 30;
const G = 1;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  init();
  background(255);
}

function draw() {
  background(255); // 중력 작용을 하는 부분

  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      if (i !== j) {
        let forceForJ = bodies[i].attract(bodies[j]); // 30개가 들어감/ bodies의 상수 값들에 번호를 부여해서 각각 중력을 작용시킴
        bodies[j].applyForce(forceForJ);
      }
    }

    bodies[i].update();
    bodies[i].display(); // array 각각에 값을 적용하는 것. 그래서 each 사용해도 무방
  }
}

function mousePressed() {
  if (isMouseInsideCanvas()) {
    bodies = []; // array에 이미 30가지의 값이 들어가 있기 때문에 값이 중첩되기 때문에 초기화를 시켜야 한다.
    init();
  }
}

function init() {
  for (let i = 0; i < bodyNum; i++) {
    // 반복문이라 계속 넣어들어감 bodies에 값을 넣어주는 것
    bodies.push(new Body(random(width), random(height), random(0.1, 2))); // array이 30개가 있음을 알려줌
  }
}
