class Vehicle {
  constructor(x, y, mass, rad, speedMx, forceMx, color) {
    //constructor : 생성자 함수, Vehicle 객체를 생성할 때 사용
    this.pos = createVector(x, y); //위치
    this.vel = p5.Vector.random2D(); // 속도
    this.acc = createVector(); // 가속도
    this.mass = mass; //질량
    this.rad = rad; //반지름
    this.speedMx = speedMx; // 객체의 최대 속도
    this.forceMx = forceMx; // 객체에 적용 가능한 최대 힘
    this.neighborhooodRad = 50;
    this.color = color; //객체 색상
  }

  cohesion(others) {
    //주변 차량들과의 응집력 계산, 차량이 다른 차량들과 함께 모여 이동하도록 하는 함수

    //cohesion() 함수는 주변 차량들의 위치를 합한 후, 그 크기를 나누어 평균 위치를 계산
    //이때, 평균 위치를 향해 차량이 이동하도록 힘을 가함 -> 차량은 다른 차량들과 함께 모여 이동하게 됨

    let cnt = 0; //cnt (count) 변수 : 0 으로 초기화
    const steer = createVector(0, 0); // steer : 이동 방향 저장하기 위한 벡터 / 초기값 : 0벡터로 설정
    others.forEach((each) => {
      // others 배열에 있는 각 each 객체에 대한 반복문
      if (each !== this) {
        // each 객체가 현재 처리 중인 객체 자신(this)와 동일하지 않은 경우에만 아래의 코드로 실행함(즉, 자기자신과의 상호작용은 제외됨)
        const distSq =
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        // 현재 객체(this)와 each 객체 사이 거리의 제곱 계산, 거리 : 유클리디안 거리의 제곱(두 점 사이 거리 계산하는 방법 -> (x2 - x1)^2 + (y2 - y1)^2 )
        if (distSq < this.neighborhooodRad ** 2) {
          // 계산된 거리의 제곱이 이웃반경(this.neighborhooodRad)의 제곱보다 작은경우에만 아래 코드 실행
          // 주어진 객체, each 객체 사이 거리가 이웃 반경 내에 있는지 확인
          steer.add(each.pos);
          // 벡터 현재 이웃 객체 each의 위치(each.pos)를 더함 -> 이웃 객체들의 위치 합이 저장됨
          cnt++; //이웃 객체 수 증가, 이웃 객체가 이웃 반경 내에 있는 경우에만 카운터 증가
        }
      }
    });
    if (cnt > 0) {
      //cnt가 0보다 큰경우 아래 코드 실행
      steer.div(cnt); // steer 벡터를 이웃 객체 수(cnt)로 나눔 -> 이웃 객체들의 평균 위치 나타냄 / 평균 위치를 향해 차량이 이동하도록 힘을 가함 => 차량은 다른 차량들과 함께 모여 이동하게 됨
      steer.sub(this.pos); //현재 객체 위치 벡터(this.pos)를 steer 백터에서 빼서, 이웃 객체들의 평균 위치에서 현재 객체 위치 빼서 방향 조절
      steer.setMag(this.speedMx); // steer 벡터 크기 최대 속도(this.speedMx)로 설정 -> 객체들이 움직이는 방향을 최대 속도에 맞게 조절
      steer.sub(this.vel); // 현재 객체 속도 벡터(this.vel)를 steer 벡터에서 빼서 -> 현재 객체 속도, 방향 조절
      steer.limit(this.forceMx); // steer 벡터 크기 최대 힘(this.forceMx)로 제한 -> 객체가 특정 범위 벗어나는 힘 받지 않도록 함
    }
    return steer; // 최종적으로 계산된 steer 벡터를 반환 -> 이웃 객체들과의 상호작용을 통해 얻은 이동 방향을 나타냄
  }

  align(others) {
    //주변 차량들과 일치성 계산해서, 차량이 다른 차량들과 같은 방향으로 이동하도록 하는 함수
    //다른 차량들과 같은 방향으로 이동하면, 충돌 가능성이 낮아지고, 차량의 효율성이 향상됨
    let cnt = 0; //cnt : 주변 차량들 수(count)를 저장하는 변수
    const steer = createVector(0, 0); // steer 변수 : 차량이 이동할 방향을 나타내는 벡터
    others.forEach((each) => {
      // others 배열에 있는 각 each 객체에 대해 반복
      if (each !== this) {
        // 객체가 현재 처리 중인 객체 자신(this)과 동일하지 않은 경우에만 아래의 코드로 실행
        const distSq = // 객체와 현재 처리 중인 객체 사이 거리의 제곱을 계산
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhooodRad ** 2) {
          // 객체와 현재 처리중인 객체 사이 거리가 이웃 반경 내에 있는 경우에만 아래 코드로 실행
          steer.add(each.vel); // each 객체의 속도를 steer 벡터에 더함
          //   steer.add(p5.Vector.normalize(each.vel));
          cnt++; // 주변 차량 수(cnt)를 1 증가시킴
        }
      }
    });
    if (cnt > 0) {
      // 주변 차량이 있는 경우에만 아래 코드로 실행
      steer.div(cnt); // steer 벡터를 cnt로 나누어 평균 속도를 계산
      steer.setMag(this.speedMx); // steer 벡터 크기를 this.speedMx로 설정
      steer.sub(this.vel); // 현재 차량 속도에서 steer 벡터를 빼서, 차량이 steer 벡터의 방향으로 이동하도록 함
      steer.limit(this.forceMx); // steer 벡터 크기를 this.forceMx로 제한
    }
    return steer; //계산된 steer 벡터를 반환
  }

  separate(others) {
    //주변 차량들과의 분리를 계산하여, 차량이 다른 차량과 충돌하지 않도록 하는 함수
    let cnt = 0;
    const steer = createVector(0, 0);
    others.forEach((each) => {
      if (each !== this) {
        const dist = this.pos.dist(each.pos); //dist : each 객체와 현재 처리 중인 객체 사이 거리 계산
        if (dist > 0 && this.rad + each.rad > dist) {
          // each 객체와 현재 처리 중인 객체 사이 거리가 0보다 크고, 두 차량 반지름 합보다 큰 경우에만 아래 코드로 실행
          const distNormal = dist / (this.rad + each.rad); // distNormal : 두 차량 사이 거리를 두 차량 반지름 합으로 나눈 값
          const towardMeVec = p5.Vector.sub(this.pos, each.pos); // towardMeVec : 현재 처리중인 객체에서 each 객체로 향하는 벡터
          towardMeVec.setMag(1 / distNormal); // 벡터 크기를 1/distNormal로 설정
          steer.add(towardMeVec); // towardMeVec 벡터를 steer 벡터에 더함
          cnt++; // 주변 차량 수(cnt)를 1 증가시킴
        }
      }
    });
    if (cnt > 0) {
      //주변 차량이 있는 경우에만 아래 코드로 실행
      steer.div(cnt); // steer 벡터를 cnt로 나누어 평균 속도를 계산
      steer.setMag(this.speedMx); // steer 벡터 크기를 this.speedMx로 설정
      steer.sub(this.vel); // 현재 차량 속도에서 steer 벡터를 빼서, 차량이 steer 벡터의 방향으로 이동하도록 함
      steer.limit(this.forceMx); // steer 벡터 크기를 this.forceMx로 제한
    }
    return steer; // 계산된 steer 벡터를 반환
  }

  applyForce(force) {
    // 차량에 힘을 가하는 함수
    const forceDivedByMass = p5.Vector.div(force, this.mass); // 힘을 차량의 질량으로 나누어 힘의 크기를 질량에 맞게 조정
    this.acc.add(forceDivedByMass); // 조정된 힘을 차량의 가속도에 더함
  }

  update() {
    //차량 속도, 위치를 업데이트하는 함수
    this.vel.add(this.acc); // 차량의 가속도를 차량의 속도에 더함
    this.vel.limit(this.speedMx); // 차량의 속도를 최대 속도로 제한함
    this.pos.add(this.vel); // 차량의 속도를 차량의 위치에 더함
    this.acc.mult(0); // 차량의 가속도를 0으로 초기화
  }

  borderInfinite() {
    // 차량이 화면을 벗어나지 않도록 처리하는 함수
    if (this.pos.x < -infiniteOffset) {
      // 차량의 x 좌표가 화면 왼쪽 또는 오른쪽 경계를 벗어나는지 확인
      this.pos.x = width + infiniteOffset;
      // 차량의 x 좌표가 화면 위쪽 또는 오른쪽 경계를 벗어나면 화면 반대편으로 이동시킴
    } else if (this.pos.x > width + infiniteOffset) {
      // 차량의 x 좌표가 화면 왼쪽 또는 오른쪽 경계를 벗어나는지 확인
      this.pos.x = -infiniteOffset;
      // 차량의 x 좌표가 화면 위쪽 또는 오른쪽 경계를 벗어나면 화면 반대편으로 이동시킴
    }
    if (this.pos.y < -infiniteOffset) {
      // 차량의 y 좌표가 화면 위쪽 또는 아래쪽 경계를 벗어나는지 확인
      this.pos.y = height + infiniteOffset;
      //차량의 y 좌표가 화면 위쪽 또는 아래쪽 경계를 벗어나면 화면 반대편으로 이동시킴
    } else if (this.pos.y > height + infiniteOffset) {
      // 차량의 y 좌표가 화면 위쪽 또는 아래쪽 경계를 벗어나는지 확인
      this.pos.y = -infiniteOffset;
      //차량의 y 좌표가 화면 위쪽 또는 아래쪽 경계를 벗어나면 화면 반대편으로 이동시킴
    }
  }

  display() {
    // 차량을 화면에 표시하는 함수 -> 차량 시뮬레이션 시각화
    push(); // push(), pop() : canvas의 설정을 저장하고 복원하는 함수
    translate(this.pos.x, this.pos.y); //canvas 원점을 차량 위치(pos)로 이동시킴
    rotate(this.vel.heading()); // canvas를 차량 속도(vel) 벡터의 방향으로 회전시킴
    noStroke(); // 차량의 외곽선 그리지 않도록 설정
    fill(this.color); //  차량을 차량의 색상(color)으로 채움
    beginShape(); // beginShape(), endShape(CLOSE) : 차량의 모양을 그리기 시작하고 끝내는 함수
    vertex(this.rad, 0);
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135)));
    vertex(0, 0);
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135))); // 차량 모양을 구성하는 4개의 점을 그림
    endShape(CLOSE); // beginShape(), endShape(CLOSE) : 차량의 모양을 그리기 시작하고 끝내는 함수
    // noFill();
    // stroke(0, 0, 60);
    // ellipse(0, 0, 2 * this.rad);
    // stroke(0, 0, 80);
    // ellipse(0, 0, 2 * this.neighborhooodRad);
    pop(); // push(), pop() : canvas의 설정을 저장하고 복원하는 함수
  }
}
