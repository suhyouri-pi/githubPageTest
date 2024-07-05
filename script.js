// 모듈 가져오기
const { Engine, Render, Runner, World, Bodies, Body } = Matter;

// 엔진 생성
const engine = Engine.create();
const { world } = engine;

// 렌더러 생성
const render = Render.create({
  element: document.body,
  engine: engine,
  canvas: document.getElementById("world"),
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    background: "white",
    wireframes: false,
  },
});

Render.run(render);

// 러너 생성
const runner = Runner.create();
Runner.run(runner, engine);

// 원 생성 및 추가
const ball = Bodies.circle(window.innerWidth / 2, window.innerHeight / 2, 30, {
  restitution: 0.9,
  render: {
    fillStyle: "blue",
  },
});
World.add(world, ball);

// 창 경계를 벽으로 추가
const walls = [
  Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 10, {
    isStatic: true,
  }), // 상단
  Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight,
    window.innerWidth,
    10,
    { isStatic: true }
  ), // 하단
  Bodies.rectangle(0, window.innerHeight / 2, 10, window.innerHeight, {
    isStatic: true,
  }), // 좌측
  Bodies.rectangle(
    window.innerWidth,
    window.innerHeight / 2,
    10,
    window.innerHeight,
    { isStatic: true }
  ), // 우측
];
World.add(world, walls);

// 자이로 센서 데이터 핸들러
if (window.DeviceOrientationEvent) {
  window.addEventListener(
    "deviceorientation",
    function (event) {
      const alpha = event.alpha; // Z축 (전후)
      const beta = event.beta; // X축 (좌우 기울기)
      const gamma = event.gamma; // Y축 (시계/반시계 방향 회전)

      const forceX = gamma / 90;
      const forceY = beta / 180;

      Body.applyForce(
        ball,
        { x: ball.position.x, y: ball.position.y },
        { x: forceX, y: forceY }
      );
    },
    true
  );
} else {
  alert("DeviceOrientationEvent is not supported in your browser.");
}

// 창 크기 변경 시 벽 위치 조정
window.addEventListener("resize", () => {
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;

  Body.setPosition(walls[0], { x: window.innerWidth / 2, y: 0 });
  Body.setPosition(walls[1], {
    x: window.innerWidth / 2,
    y: window.innerHeight,
  });
  Body.setPosition(walls[2], { x: 0, y: window.innerHeight / 2 });
  Body.setPosition(walls[3], {
    x: window.innerWidth,
    y: window.innerHeight / 2,
  });
});
