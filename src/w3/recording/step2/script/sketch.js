// 온라인 수업
// function setup() {
//   setCanvasContainer('canvas', 3, 2, true);
//   background('orange');
// }
// function draw() {
//   background('orange');
//   fill(0);
//   //   if (mouseX > width / 2) {
//   //     rect(0, 0, width / 2, height);
//   //   } else {
//   //     rect(0, 0, width / 2, height);
//   //   }

//   //   2등분씩 했을 경우 if ~ else 이용
//   //   if (mouseX > width / 2) {
//   //     if (mouseY > height / 2) {
//   //       rect(width / 2, height / 2, width / 2, height / 2);
//   //     } else {
//   //       rect(width / 2, 0, width / 2, height / 2);
//   //     }
//   //   } else {
//   //     if (mouseY > height / 2) {
//   //       rect(0, height / 2, width / 2, height / 2);
//   //     } else {
//   //       rect(0, 0, width / 2, height / 2);
//   //     }
//   //   }

//   //   3등분 했을 경우 if ~ else but, 일부분 선택안됨
//   //   if (mouseX > width / 3) {
//   //     if (mouseY > height / 2) {
//   //       rect(width / 3, height / 2, width / 3, height / 2);
//   //     } else {
//   //       rect(width / 3, 0, width / 3, height / 2);
//   //     }
//   //   } else if (mouseX > (2 * width) / 3) {
//   //     if (mouseY > height / 2) {
//   //       rect((2 * width) / 3, height / 2, width / 3, height / 2);
//   //     } else {
//   //       rect((2 * width) / 3, 0, width / 3, height / 2);
//   //     }
//   //   } else {
//   //     if (mouseY > height / 2) {
//   //       rect(0, height / 2, width / 3, height / 2);
//   //     } else {
//   //       rect(0, 0, width / 3, height / 2);
//   //     }
//   //   }

//   //   3등분 했을 경우 if ~ else but, 아직 정리 안됨
//   //   if (mouseX > width / 3) {
//   //     if (mouseX > (2 * width) / 3) {
//   //       if (mouseY > height / 2) {
//   //         rect(width / 3, height / 2, width / 3, height / 2);
//   //       } else {
//   //         rect(width / 3, 0, width / 3, height / 2);
//   //       }
//   //     } else {
//   //       if (mouseY > height / 2) {
//   //         rect(width / 3, height / 2, width / 3, height / 2);
//   //       } else {
//   //         rect(width / 3, 0, width / 3, height / 2);
//   //       }
//   //     }
//   //   } else {
//   //     if (mouseY > height / 2) {
//   //       rect(0, height / 2, width / 3, height / 2);
//   //     } else {
//   //       rect(0, 0, width / 3, height / 2);
//   //     }
//   //   }

//   // 하고자 하는 말
//   //   if (2/3보다 큼?){

//   //   }else if(1/3보다 큼?){//일단 2/3보다는 작은데, 1/3보다는 큼?

//   //   }else{ // 일단 2/3보다는 작은데, 1/3보다도 작음

//   //   }

//   // 3등분 했을 때, 최종 정리
//   if (mouseX > (2 / 3) * width) {
//     if (mouseY > height / 2) {
//       rect((2 / 3) * width, height / 2, width / 3, height / 2);
//     } else {
//       rect((2 / 3) * width, 0, width / 3, height / 2);
//     }
//   } else if (mouseX > (1 / 3) * width) {
//     //일단 2/3보다는 작은데, 1/3보다는 큼?
//     if (mouseY > height / 2) {
//       rect(width / 3, height / 2, width / 3, height / 2);
//     } else {
//       rect(width / 3, 0, width / 3, height / 2);
//     }
//   } else {
//     // 일단 2/3보다는 작은데, 1/3보다도 작음
//     if (mouseY > height / 2) {
//       rect(0, height / 2, width / 3, height / 2);
//     } else {
//       rect(0, 0, width / 3, height / 2);
//     }
//   }
// }

//수업시간
// let pos;
// let vel;
// let radius = 25;

// function setup() {
//   setCanvasContainer('canvas', 3, 2, true);
//   background(255);
//   pos = createVector(width / 2, height / 2); //pos와 vel이 뭔지 알려줌
//   vel = createVector(3, 5);
//   console.log(pos);
//   console.log(vel);
//   ellipse(pos.x, pos.y, 50); //제일 처음에 중앙에 있는 모습을 보여주고 싶을 경우
// }
// function draw() {
//   background(255);
//   pos.add(vel);
//   // if (pos.x < 0) {
//   //   vel.x *= -1; // 음수일 경우, 왼쪽으로 감
//   // } else if (pos.x > width) {
//   //   vel.x *= -1;
//   // }
//   if (pos.x - radius < 0 || pos.x + radius > width) {
//     vel.x *= -1;
//   }
//   if (pos.y - radius < 0 || pos.y + radius > height) {
//     vel.y *= -1;
//   }

//   ellipse(pos.x, pos.y, 2 * radius);
// }

// 시간없으셔서 여기에 이어서 진행
let pos;
let vel;
let acc;
let radius = 50;
// 변수

function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background(255);
  pos = createVector(width / 2, height / 2); //pos와 vel이 뭔지 알려줌
  vel = createVector(0, 0);
  acc = createVector(0, 1);
  console.log(pos);
  console.log(vel); // 변수 값 넣음ㅇ
  ellipse(pos.x, pos.y, 50); //제일 처음에 중앙에 있는 모습을 보여주고 싶을 경우
}
function draw() {
  background(255);
  update();
  // acc = p5.Vector.random2D();
  // acc.mult(0.5);
  // vel.add(acc);
  // vel.limit(5);
  // pos.add(vel);
  infiniteEdge();
  // if (pos.x < 0) {
  //   pos.x = width;
  // } else if (pos.x > width) {
  //   pos.x = 0;
  // }
  // if (pos.y < 0) {
  //   pos.y = height;
  // } else if (pos.y > height) {
  //   pos.y = 0;
  // }
  display();
}

function display() {
  fill('red');
  ellipse(pos.x, pos.y, 2 * radius);
}
function update() {
  acc = p5.Vector.random2D();
  acc.mult(0.5);
  vel.add(acc);
  vel.limit(5);
  pos.add(vel);
  infiniteEdge();
}
function infiniteEdge() {
  if (pos.x < 0) {
    pos.x = width;
  } else if (pos.x > width) {
    pos.x = 0;
  }
  if (pos.y < 0) {
    pos.y = height;
  } else if (pos.y > height) {
    pos.y = 0;
  }
}
