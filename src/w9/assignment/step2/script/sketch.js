let engine, world, ropeA, ropeB, ropeC, mouseConstraint;
const oWidth = 800;
const oHeight = 600;

// provide concave decomposition support library
Matter.Common.setDecomp(decomp);

function setup() {
  // create canvas
  setCanvasContainer('canvas', oWidth, oHeight, true);

  // create engine
  engine = Matter.Engine.create();
  world = engine.world;
  //create runner
  runner = Matter.Runner.create();

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
      return Matter.Bodies.fromVertices(
        x,
        y,
        Matter.Vertices.fromPath(
          '25 0 31.5 19 50 19 34.5 29.5 41 50 25 37.5 9 50 15.5 29.5 0 19 18.5 19.5'
        ),
        {
          collisionFilter: { group: group },
        }
      );
    }
  );

  Matter.Composites.chain(ropeA, 0.5, 0, -0.5, 0, {
    stiffness: 0.4,
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
}

function draw() {
  // Update physics engine
  Matter.Engine.update(engine);

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
