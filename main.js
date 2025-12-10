/* Main game file: main.js */
/* Game: BreakInvaders */
/* Authors: Avalynn Annarelli, Chase DeLuca */
/* Description: Combination of breakout and space invaders, where the invaders are killed via the breakout ball/paddle.*/
/* Citations: Got help from Mr. Hinkle, Hinkle-helped-code is commented as such.

import "./style.css";

import { GameInterface } from "simple-canvas-library";

let gi = new GameInterface();

/* Variables: Top-Level variables defined here are used to hold game state */
let ball = {
  x: 1300,
  y: 100,
  vel: {
    x: 100,
    y: 100,
  },
};

let paddle = {
  x: 10,
  size: 100,
};

/*const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 20
let bricks = [];
for (let y = 0; y < BRICK_HEIGHT * 4; y += BRICK_HEIGHT)
  for (let x = 0; x < BRICK_WIDTH * 12; x += BRICK_WIDTH)
    bricks.push({x:x, y:y}) 
*/

/* Drawing Functions */

function drawPaddle({ ctx, height }) {
  ctx.fillStyle = "white";
  ctx.fillRect(paddle.x, height - 30, paddle.size, 20);
}
function drawBall({ ctx }) {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
  ctx.fill();
  return;
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
  if (ball.y >= (height - 30)){
    console.log("in lower segment of screen")
    let ballPaddleDist = (paddle.x + paddle.size / 2) - (ball.x);
    if (ball.y == ballPaddleDist){
      if (ballPaddleDist == 50){
        ball.vel.y *= -1
      }
    }
  }
//end hinkle code
}
function ballCollisionWalls({ width, height }){
  if (ball.x > (width - 10)){
    ball.x = (width - 10);
    ball.vel.x *= (-1)
  }
  else if ((ball.x - 10) < 0){
    ball.x = (10);
    ball.vel.x *= (-1);
  }
}

gi.addDrawing(function ({ ctx, width, height, elapsed, stepTime }) {
  drawPaddle({ ctx, height });
  drawBall({ ctx });
  moveBall({ stepTime });
  ballCollisionPaddle({ width, height, stepTime });
  ballCollisionWalls({ width, height })
});

/* Input Handlers */

gi.addHandler("mousemove", function ({ x, y }) {
  paddle.x = x - paddle.size / 2;
});

/* Run the game */
gi.run();
