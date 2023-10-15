class Attractor {
  constructor(x, y, mass) {
    // 움직이는데 위치, 질량이 필요 / 초기값 설정
    this.pos = createVector(x, y);
    this.mass = mass;
  }

  attract(mover) {
    let dirVector = p5.Vector.sub(this.pos, mover.pos); //directionVector / mover에 pos가 있어야함
    let distance = dirVector.mag();
    distance = constrain(distance, 5, 25); // mim, max 값 넣어서 값을 확실히 볼 수 있도록 함
    let strength = (this.mass * mover.mass) / distance ** 2; // g를 원하는 대로 설정 가능(크게 : 강하게 / 작게 : 약하게) / **2 : 제곱
    return dirVector.setMag(strength); // setMag(단위 벡터 만들어서 특정 길이로 조정해줌) / .mag(길이 가졍옴)
  }
  display() {
    ellipse(this.pos.x, this.pos.y, 100);
  }
}
