const {
  Engine,
  Render,
  Runner,
  Body,
  Composite,
  Composites,
  Constraint,
  Mouse,
  Bodies,
  Common,
  Vertices,
  MouseConstraint,
} = Matter;

const oWidth = 800;
const oHeight = 600;

// Provide concave decomposition support library
Common.setDecomp(decomp);

// Create engine
const engine = Engine.create();
const world = engine.world;

// Create runner
const runner = Runner.create();
Runner.run(runner, engine);

let group;
let ropeA;
let ropeB;
let ropeC;

let mouse;
let mouseConstraint;

function createConcaveVertices(x, y, radius, points) {
  const angle = (Math.PI * 2) / points;
  const starVertices = [];
  for (let i = 0; i < points; i++) {
    const posX = x + Math.cos(angle * i) * radius;
    const posY = y + Math.sin(angle * i) * radius;
    starVertices.push([posX, posY]);
  }

  // Use decomp library to create concave polygon
  const concaveVertices = decomp.quickDecomp(starVertices);

  // Convert concave vertices back to the format expected by Matter.js
  const matterVertices = concaveVertices.reduce((acc, cur) => {
    acc.push({ x: cur[0], y: cur[1] });
    return acc;
  }, []);

  return matterVertices;
}

function setup() {
  // Create canvas
  setCanvasContainer('canvas', oWidth, oHeight, true);

  // Create bodies
  group = Matter.Body.nextGroup(true);

  ropeA = Matter.Composites.stack(
    oWidth / 4,
    50,
    8,
    1,
    10,
    10,
    function (x, y) {
      const concaveVertices = createConcaveVertices(x, y, 25, 7);
      const concaveBody = Matter.Bodies.fromVertices(x, y, concaveVertices, {
        collisionFilter: { group: group },
      });
      return concaveBody;
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
    50,
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
    50,
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
    Matter.Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
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
  Render.mouse = canvasMouse;

  background('#272727');
}

function draw() {
  // Update physics engine
  Matter.Engine.update(engine);
  //   mouse.pixelRatio = (pixelDensity() * width) / oWidth;

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
