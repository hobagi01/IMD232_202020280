const { Engine, Runner, Render, Composite, Bodies, Mouse, MouseConstraint } =
  Matter;

const oWidth = 800;
const oHeight = 600;

// create engine
const engine = Engine.create();
const world = engine.world;

// create runner
const runner = Runner.create();
Runner.run(runner, engine);

let group;
let ropeA;
let ropeB;
let ropeC;
let mouse;

function createStarVertices(x, y, radius, points) {
  const angle = (Math.PI * 2) / points;
  let vertices = [];
  for (let i = 0; i < points * 2; i++) {
    const currentRadius = i % 2 === 0 ? radius : radius / 2;
    const posX = x + Math.cos(angle * i) * currentRadius;
    const posY = y + Math.sin(angle * i) * currentRadius;
    vertices.push({ x: posX, y: posY });
  }
  return vertices;
}

function setup() {
  setCanvasContainer('canvas', oWidth, oHeight, true);

  const starVertices = createStarVertices(200, 10, 25, 7);
  const concaveStar = decomp.quickDecomp(starVertices);

  group = Matter.Body.nextGroup(true);

  ropeA = Matter.Composites.stack(200, 50, 10, 1, 10, 10, function (x, y) {
    return Matter.Bodies.fromVertices(x, y, concaveStar, {
      collisionFilter: { group: group },
    });
  });

  Matter.Composites.chain(ropeA, 0.3, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
    render: { type: 'line' },
  });

  Matter.Composite.add(
    ropeA,
    Matter.Constraint.create({
      bodyB: ropeA.bodies[0],
      pointB: { x: -25, y: 0 },
      pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
      stiffness: 0.5,
      render: {
        visible: false,
      },
    })
  );

  group = Matter.Body.nextGroup(true);

  ropeB = Matter.Composites.stack(400, 50, 10, 1, 10, 10, function (x, y) {
    return Matter.Bodies.circle(x, y, 20, {
      collisionFilter: { group: group },
    });
  });

  Matter.Composites.chain(ropeB, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
    render: { type: 'line' },
  });

  Matter.Composite.add(
    ropeB,
    Matter.Constraint.create({
      bodyB: ropeB.bodies[0],
      pointB: { x: -10, y: 0 },
      pointA: { x: ropeB.bodies[0].position.x, y: ropeB.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  group = Matter.Body.nextGroup(true);

  ropeC = Matter.Composites.stack(600, 50, 13, 1, 10, 10, function (x, y) {
    return Matter.Bodies.rectangle(x - 20, y, 50, 20, {
      collisionFilter: { group: group },
      chamfer: 5,
    });
  });

  Matter.Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });

  Matter.Composite.add(
    ropeC,
    Matter.Constraint.create({
      bodyB: ropeC.bodies[0],
      pointB: { x: -20, y: 0 },
      pointA: { x: ropeC.bodies[0].position.x, y: ropeC.bodies[0].position.y },
      stiffness: 0.5,
    })
  );

  Matter.Composite.add(world, [
    ropeA,
    ropeB,
    ropeC,
    Matter.Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
  ]);

  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = (pixelDensity() * width) / oWidth;
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
    },
  });

  Composite.add(world, mouseConstraint);

  background('#272727');
  Render.mouse = mouse;
  Runner.run(runner, engine);
}

function draw() {
  background('#272727');
  fill(200, 200, 100);
  drawRope(ropeA);
  fill(0, 200, 200);
  drawRope(ropeB);
  fill(120, 80, 300);
  drawRope(ropeC);
}

function drawRope(rope) {
  for (let i = 0; i < rope.bodies.length; i++) {
    let vertices = rope.bodies[i].parts[0].vertices;
    noStroke();
    beginShape();
    for (let j = 0; j < vertices.length; j++) {
      vertex(vertices[j].x, vertices[j].y);
    }
    endShape(CLOSE);
  }
}
