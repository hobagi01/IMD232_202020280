// provide concave decomposition support library
Matter.Common.setDecomp(decomp);

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

let engine, world, ropeA, mouseConstraint;
const oWidth = 800;
const oHeight = 600;

function setup() {
  // create canvas
  setCanvasContainer('canvas', oWidth, oHeight, true);

  // create engine
  engine = Matter.Engine.create();
  world = engine.world;

  // create bodies
  let group = Matter.Body.nextGroup(true);

  ropeA = Matter.Composites.stack(
    oWidth / 4,
    100,
    8,
    1,
    10,
    10,
    function (x, y) {
      const starVertices = createStarVertices(x, y, 25, 7); //  7points for star
      const starBody = Matter.Bodies.fromVertices(x, y, starVertices, {
        collisionFilter: { group: group },
      });
      return starBody;
    }
  );

  Matter.Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
    stiffness: 0.8,
    length: 2,
    render: { type: 'line' },
  });

  Matter.Composite.add(
    ropeA,
    Matter.Constraint.create({
      bodyB: ropeA.bodies[0],
      pointB: { x: -10, y: 0 },
      pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
      stiffness: 0.5,
      render: {
        visible: false, // Hide the constraint line for the first body
      },
    })
  );

  group = Matter.Body.nextGroup(true);

  ropeB = Matter.Composites.stack(
    (oWidth / 4) * 2,
    100,
    10,
    1,
    10,
    10,
    function (x, y) {
      return Matter.Bodies.circle(x, y, 20, {
        collisionFilter: { group: group },
      });
    }
  );

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

  ropeC = Matter.Composites.stack(
    (oWidth / 4) * 3,
    100,
    13,
    1,
    10,
    10,
    function (x, y) {
      return Matter.Bodies.rectangle(x - 20, y, 50, 20, {
        collisionFilter: { group: group },
        chamfer: 5,
      });
    }
  );

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
    // Matter.Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
  ]);

  // add mouse control
  let canvasMouse = Matter.Mouse.create(canvas.elt),
    mouseOptions = {
      mouse: canvasMouse,
    };
  canvasMouse.pixelRatio = (pixelDensity() * width) / oWidth;

  mouseConstraint = Matter.MouseConstraint.create(engine, mouseOptions);
  Matter.World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  Matter.Render.mouse = canvasMouse;

  background('#272727');
  // run the engine
  Matter.Runner.run(engine);
}

function draw() {
  // Update physics engine
  //   Matter.Engine.update(engine);

  // Draw ropes and bodies
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
    let pos = rope.bodies[i].position;
    noStroke();
    if (rope.bodies[i].parts.length === 1) {
      let vertices = rope.bodies[i].parts[0].vertices;
      beginShape();
      for (let j = 0; j < vertices.length; j++) {
        vertex(vertices[j].x, vertices[j].y);
      }
      endShape(CLOSE);
    } else {
      for (let j = 0; j < rope.bodies[i].parts.length; j++) {
        let vertices = rope.bodies[i].parts[j].vertices;
        beginShape();
        for (let k = 0; k < vertices.length; k++) {
          vertex(vertices[k].x, vertices[k].y);
        }
        endShape(CLOSE);
      }
    }
  }
}
