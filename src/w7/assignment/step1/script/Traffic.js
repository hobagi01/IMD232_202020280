class Traffic {
  // 차량 시뮬레이션 위한 클래스
  constructor() {
    this.vehicles = []; // 차량 저장할 배열 초기화
  }

  run() {
    // 모든 차량에 대해 별도로(separate), 정렬(align), 응집(cohesion) 힘을 계산하고, 차량에 적용하는 함수
    this.vehicles.forEach((eachVehicle) => {
      // 차량 배열(this.vehicles)의 모든 차량(eachVehivle)에 대해 forEach() 함수 호출
      const separate = eachVehicle.separate(this.vehicles); // 각 차량에 대해 다른 차량들과의 분리 힘(separate)을 계산
      separate.mult(1); // 분리 힘의 크기를 1로 고정
      eachVehicle.applyForce(separate); // 각 차량에 분리 힘을 적용
      const align = eachVehicle.align(this.vehicles); // 각 차량에 대해 다른 차량들과의 정렬 힘(align)을 계산
      align.mult(0.5); // 정렬 힘의 크기를 0.5로 조정
      eachVehicle.applyForce(align); // 각 차량에 정렬 힘 적용
      const cohesion = eachVehicle.cohesion(this.vehicles); // 각 차량에 대해 다른 차량들과의 응집 힘(cohesion)을 계산
      cohesion.mult(0.5); // 응집 힘의 크기를 0.5로 조정
      eachVehicle.applyForce(cohesion); // 각 차량에 응집 힘을 적용함
      eachVehicle.update(); // 각 차량의 속도와 위치 업데이트
      eachVehicle.borderInfinite(); // 각 차량이 화면을 벗어나지 않도록 함
      eachVehicle.display(); // 각 차량을 화면에 표시
    });
  }

  addVehicle(x, y) {
    // 차량을 시뮬레이션에 추가하는 함수
    // const mass = floor(random(1, 3));
    const mass = 1; // 차량 질량 : 1
    this.vehicles.push(
      new Vehicle(x, y, mass, mass * 12, 5, 0.1, color(random(360), 100, 80))
    ); // 지정한 위치(x,y)에 새로운 차량을 생성하고, 차량 배열(this.vehicles)에 추가
  }
}
