class Emitter {
  constructor() {
    this.gravity = createVector(0, 0.1);
  }

  emit(x, y, count) {
    for (let i = 0; i < count; i++) {
      let hue = random(360);
      let angle = random(TWO_PI);
      let magnitude = random(19, 20);
      let vx = cos(angle) * magnitude;
      let vy = sin(angle) * magnitude;
      let p = new Particle(x, y, hue, vx, vy);
      particles.push(p);
    }
  }
}
