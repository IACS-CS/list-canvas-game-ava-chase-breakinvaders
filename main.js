/* Main game file: main.js */
/* Game: BreakInvaders */
/* Authors: Avalynn Annarelli, Chase DeLuca */
/* Description: Combination of breakout and space invaders, where the invaders are killed via the breakout ball/paddle.*/
/* Citations: [List any resources, libraries, tutorials, etc you used here] 
/* Note: If you use significant AI help you should cite that here as well */
/* including summaries of prompts and/or interactions you had with the AI */
/* In addition, of course, any AI-generated code should be clearly maked */
/* in comments throughout the code, though of course when using e.g. CoPilot */
/* auto-complete it maye be impractical to mark every line, which is why you */
/* should also include a summary here */


import "./style.css";

import { GameInterface } from 'simple-canvas-library';

let gi = new GameInterface();

/* Variables: Top-Level variables defined here are used to hold game state */
let ball = {
  x : 100,
  y : 100,
  vel: {
      x : 100,
      y : 100,
  }
}

let paddle = {
  x : 10,
  size : 100,
}



/*const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 20
let bricks = [];
for (let y = 0; y < BRICK_HEIGHT * 4; y += BRICK_HEIGHT)
  for (let x = 0; x < BRICK_WIDTH * 12; x += BRICK_WIDTH)
    bricks.push({x:x, y:y}) 
*/



/* Drawing Functions */

function drawPaddle({ ctx, height }) {
   ctx.fillStyle = "white"
    ctx.fillRect(paddle.x, height-30, paddle.size, 20)
}
function drawBall({ ctx }) {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
  ctx.fill();
  return
}
function moveBall({ stepTime, width, height }){
  // dt = deltatime which uses seconds
  const dt = stepTime / 1000;
  ball.x += ball.vel.x * dt;
  ball.y += ball.vel.y * dt;
}
function ballCollision ({ width, height, stepTime }){
  // if ball collides with paddle, then reverse direction
  if (ball.x){
  }
}

gi.addDrawing(
  function ({ ctx, width, height, elapsed, stepTime }) {
   drawPaddle({ ctx, height});
   drawBall({ ctx });
   moveBall({ stepTime })
   
  }
)


/* Input Handlers */

 gi.addHandler(
  "mousemove",
  function ({ x, y }) {
    paddle.x = x - 50
  }
)


/* Run the game */
gi.run();


