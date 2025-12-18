/* Main game file: main.js */
/* Game: BreakInvaders */
/* Authors: Avalynn Annarelli, Chase DeLuca */
/* Description: Combination of breakout and space invaders, where the invaders are killed via the breakout ball/paddle.*/
/* Citations: Got help from Mr. Hinkle, Hinkle-helped-code is commented as such.*/
// Code generated with the help of GitHub Copilot: added brick list and draw/create functions

import "./style.css";

import { GameInterface } from "simple-canvas-library";

let gi = new GameInterface();

/* Variables: Top-Level variables defined here are used to hold game state */
let paddleLaserHits = 0;
let ball = {
  x: 700,
  y: 100,
  vel: {
    x: 200,
    y: 200,
  },
};
const BALL_RADIUS = 10;

let paddle = {
  x: 1300,
  size: 100,
  hits: 0,
};
let score = 0;
let highScore = 0;

const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 20;
// Laser constants
const LASER_WIDTH = 6;
const LASER_HEIGHT = 14;
const LASER_SPEED = 600; // pixels per second

// list to hold active lasers
let lasers = [];

/**
 * Spawn a laser from a brick's position. Only spawns if fewer than 2 lasers exist.
 * @param {object} brick
 */
function spawnLaserFromBrick(brick) {
  if (lasers.length >= 2) return;
  lasers.push({
    x: brick.x + brick.w / 2 - LASER_WIDTH / 2,
    y: brick.y + brick.h,
    w: LASER_WIDTH,
    h: LASER_HEIGHT,
    velY: LASER_SPEED,
  });
}

/**
 * Try to make alive bricks shoot lasers. Uses a time-based probability so shootings are somewhat random.
 */
function bricksTryToShoot({ stepTime }) {
  if (lasers.length >= 2) return;
  // chance based on frame time: aim for about one shot every ~1.5s
  const probability = Math.min(1, stepTime / 1500);
  if (Math.random() < probability) {
    const alive = bricks.filter((b) => b.alive);
    if (alive.length === 0) return;
    const index = Math.floor(Math.random() * alive.length);
    spawnLaserFromBrick(alive[index]);
  }
}

/**
 * Update lasers position, remove offscreen ones, and handle collisions with the paddle.
 */
function updateLasers({ stepTime, width, height }) {
  const dt = stepTime / 1000;
  for (let i = lasers.length - 1; i >= 0; i--) {
    const l = lasers[i];
    l.y += l.velY * dt;
    // remove off-screen lasers
    if (l.y > height) {
      lasers.splice(i, 1);
      continue;
    }
    // check collision with paddle
    const paddleY = height - 30;
    const paddleH = 20;
    if (
      l.x < paddle.x + paddle.size &&
      l.x + l.w > paddle.x &&
      l.y < paddleY + paddleH &&
      l.y + l.h > paddleY
    ) {
      // hit: shrink paddle by 20
      paddle.size = paddle.size - 20;
      paddle.hits += 1;
      if (paddle.size <= 0) loseCondition({ width, height });
      // remove the laser
      lasers.splice(i, 1);
    }
  }
}
function highScoreCount() {
  if (score > highScore) {
    highScore = score;
  }
}
function drawHighScore({ ctx, width, height }) {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(highScore, width - 10, 20);
}
/**
 * Draw all active lasers on screen.
 */
function drawLasers({ ctx }) {
  ctx.fillStyle = "red";
  for (const l of lasers) {
    ctx.fillRect(l.x, l.y, l.w, l.h);
  }
}

// Code generated with the help of GitHub Copilot
// Begin generated code
// List to hold bricks
let bricks = [];

/**
 * Create bricks positioned across the top of the screen.
 * @param {object} params
 * @param {number} params.width - Canvas width used to center the bricks
 * @param {number} [params.cols=12] - Number of bricks to create
 * @param {number} [params.y=20] - Y position for the bricks
 * @param {number} [params.gap=5] - Gap between bricks
 */
function createBricks({ width, cols = 12, y = 20, gap = 5, rows = 3 }) {
  bricks = [];
  const totalWidth = cols * BRICK_WIDTH + (cols - 1) * gap;
  const startX = Math.max(10, (width - totalWidth) / 2);
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < cols; i++) {
      bricks.push({
        x: startX + i * (BRICK_WIDTH + gap),
        y: y,
        w: BRICK_WIDTH,
        h: BRICK_HEIGHT,
        alive: true,
      });
    }
    y += 25;
  }
}

/**
 * Draws the bricks stored in `bricks` list.
 * @param {CanvasRenderingContext2D} ctx
 */
function drawBricks({ ctx }) {
  ctx.fillStyle = "red";
  ctx.strokeStyle = "white";
  for (const b of bricks) {
    if (!b.alive) continue;
    ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.strokeRect(b.x, b.y, b.w, b.h);
  }
}
// End generated code

/* Drawing Functions */

function drawPaddle({ ctx, height }) {
  ctx.fillStyle = "white";
  ctx.fillRect(paddle.x, height - 30, paddle.size, 20);
}
function drawBall({ ctx }) {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, 2 * Math.PI);
  ctx.fill();
  return;
}
function isLevelComplete() {
  // brick counter
  let aliveBrickCount = 0;
  for (let i = 0; i < bricks.length; i++) {
    if (bricks[i].alive) {
      aliveBrickCount++;
    }
  } if (aliveBrickCount === 0) {
    bricks = [];
    ball.x = 100
    ball.y = 100
    alert("you win!")
  } else {
    return false;
  }
}
function loseCondition({ width, height }) {
  ball.y = 100;
  ball.x = 100;
  score = 0;
  paddle.size = 100;
  createBricks({ width });
  alert("you lose!");
}
function scoreCount({ ctx }) {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(score, 10, 20);
}
function moveBall({ stepTime, width, height }) {
  // dt = deltatime which uses seconds
  const dt = stepTime / 1000;
  ball.x += ball.vel.x * dt;
  ball.y += ball.vel.y * dt;
}
function ballCollisionPaddle({ width, height, stepTime }) {
  // if ball collides with paddle, then reverse direction
  //begin hinkle code
  if (ball.y >= height - 30 && ball.y <= height - 10) {
    console.log("in lower segment of screen");
    let ballPaddleDist = Math.abs(paddle.x + paddle.size / 2 - ball.x);
    if (ballPaddleDist <= paddle.size / 2) {
      ball.vel.y *= -1;
      ball.y = height - 30 - BALL_RADIUS;
    }
  }
  //end hinkle code
}

function ballCollisionWalls({ width, height }) {
  if (ball.x > width - 10) {
    ball.x = width - 10;
    ball.vel.x *= -1;
  } else if (ball.x - 10 < 0) {
    ball.x = 10;
    ball.vel.x *= -1;
  }
  if (ball.y < 0) {
    ball.y = 10;
    ball.vel.y *= -1;
  }
  if (ball.y > height) {
    loseCondition({ width, height });
  }
}

// begin AI generated code
/**
 * Clamp `v` to the range [a, b]
 */
function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

/**
 * Check for collisions between the ball and any alive bricks.
 * If a collision is found, mark the brick dead and bounce the ball.
 * @param {object} params
 * @param {number} params.stepTime - Time since last frame (ms) — not used but kept for API symmetry
 */
function ballCollisionBricks({ stepTime }) {
  for (const b of bricks) {
    if (!b.alive) continue;
    const nearestX = clamp(ball.x, b.x, b.x + b.w);
    const nearestY = clamp(ball.y, b.y, b.y + b.h);
    const dx = ball.x - nearestX;
    const dy = ball.y - nearestY;
    const distSq = dx * dx + dy * dy;
    if (distSq <= BALL_RADIUS * BALL_RADIUS) {
      // collision: decide whether to invert X or Y velocity
      if (Math.abs(dx) > Math.abs(dy)) {
        // More horizontal overlap — bounce X
        ball.vel.x *= -1;
        // push ball out to prevent sticking
        ball.x = nearestX + Math.sign(dx) * (BALL_RADIUS + 0.1);
      } else {
        // More vertical overlap — bounce Y
        ball.vel.y *= -1;
        ball.y = nearestY + Math.sign(dy) * (BALL_RADIUS + 0.1);
      }
      b.alive = false;
      score += 1;
      // only hit one brick per frame to avoid multiple bounces
      break;
    }
  }
}
//end AI generated code

gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime }) {
  // create bricks once when width is known
  if (!bricks.length) createBricks({ width });
  // draw bricks
  drawBricks({ ctx });
  // handle lasers (shooting, updating, and drawing)
  bricksTryToShoot({ stepTime });
  updateLasers({ stepTime, width, height });
  drawLasers({ ctx });
  drawPaddle({ ctx, height });
  drawBall({ ctx });
  moveBall({ stepTime });
  ballCollisionBricks({ stepTime });
  ballCollisionPaddle({ width, height, stepTime });
  ballCollisionWalls({ width, height });
  scoreCount({ ctx });
  isLevelComplete();
  highScoreCount();
  drawHighScore({ ctx, width, height });
});

/* Input Handlers */

gi.addHandler("mousemove", function ({ x, y }) {
  paddle.x = x - paddle.size / 2;
});

/* Run the game */
gi.run();
