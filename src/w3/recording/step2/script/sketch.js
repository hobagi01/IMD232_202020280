function setup() {
  setCanvasContainer('canvas', 3, 2, true);
  background('orange');
}
function draw() {
  background('orange');
  fill(0);
  //   if (mouseX > width / 2) {
  //     rect(0, 0, width / 2, height);
  //   } else {
  //     rect(0, 0, width / 2, height);
  //   }

  //   2등분씩 했을 경우 if ~ else 이용
  //   if (mouseX > width / 2) {
  //     if (mouseY > height / 2) {
  //       rect(width / 2, height / 2, width / 2, height / 2);
  //     } else {
  //       rect(width / 2, 0, width / 2, height / 2);
  //     }
  //   } else {
  //     if (mouseY > height / 2) {
  //       rect(0, height / 2, width / 2, height / 2);
  //     } else {
  //       rect(0, 0, width / 2, height / 2);
  //     }
  //   }

  //   3등분 했을 경우 if ~ else but, 일부분 선택안됨
  //   if (mouseX > width / 3) {
  //     if (mouseY > height / 2) {
  //       rect(width / 3, height / 2, width / 3, height / 2);
  //     } else {
  //       rect(width / 3, 0, width / 3, height / 2);
  //     }
  //   } else if (mouseX > (2 * width) / 3) {
  //     if (mouseY > height / 2) {
  //       rect((2 * width) / 3, height / 2, width / 3, height / 2);
  //     } else {
  //       rect((2 * width) / 3, 0, width / 3, height / 2);
  //     }
  //   } else {
  //     if (mouseY > height / 2) {
  //       rect(0, height / 2, width / 3, height / 2);
  //     } else {
  //       rect(0, 0, width / 3, height / 2);
  //     }
  //   }

  //   3등분 했을 경우 if ~ else but, 아직 정리 안됨
  //   if (mouseX > width / 3) {
  //     if (mouseX > (2 * width) / 3) {
  //       if (mouseY > height / 2) {
  //         rect(width / 3, height / 2, width / 3, height / 2);
  //       } else {
  //         rect(width / 3, 0, width / 3, height / 2);
  //       }
  //     } else {
  //       if (mouseY > height / 2) {
  //         rect(width / 3, height / 2, width / 3, height / 2);
  //       } else {
  //         rect(width / 3, 0, width / 3, height / 2);
  //       }
  //     }
  //   } else {
  //     if (mouseY > height / 2) {
  //       rect(0, height / 2, width / 3, height / 2);
  //     } else {
  //       rect(0, 0, width / 3, height / 2);
  //     }
  //   }

  // 하고자 하는 말
  //   if (2/3보다 큼?){

  //   }else if(1/3보다 큼?){//일단 2/3보다는 작은데, 1/3보다는 큼?

  //   }else{ // 일단 2/3보다는 작은데, 1/3보다도 작음

  //   }

  // 3등분 했을 때, 최종 정리
  if (mouseX > (2 / 3) * width) {
    if (mouseY > height / 2) {
      rect((2 / 3) * width, height / 2, width / 3, height / 2);
    } else {
      rect((2 / 3) * width, 0, width / 3, height / 2);
    }
  } else if (mouseX > (1 / 3) * width) {
    //일단 2/3보다는 작은데, 1/3보다는 큼?
    if (mouseY > height / 2) {
      rect(width / 3, height / 2, width / 3, height / 2);
    } else {
      rect(width / 3, 0, width / 3, height / 2);
    }
  } else {
    // 일단 2/3보다는 작은데, 1/3보다도 작음
    if (mouseY > height / 2) {
      rect(0, height / 2, width / 3, height / 2);
    } else {
      rect(0, 0, width / 3, height / 2);
    }
  }
}
