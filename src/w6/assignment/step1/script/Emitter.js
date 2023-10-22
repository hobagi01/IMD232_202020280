class Emitter {
  constructor(x, y) {
    this.particles = [];
    this.position = createVector(x, y);
  }

  update() {
    if (random(1) < 0.5) {
      // 파티클을 더 자주 생성
      this.createParticle();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.applyForce(gravity);
      p.update();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  display() {
    for (const p of this.particles) {
      p.display();
    }
  }

  createParticle() {
    const x = random(width);
    const y = random(-height / 2, 0); // 파티클이 화면 절반 이상 차 있도록 위치 설정
    const p = new Particle(x, y, random(360), 100, 100);
    this.particles.push(p);
  }
}
