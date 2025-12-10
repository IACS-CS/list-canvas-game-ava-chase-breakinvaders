true&&(function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(script) {
        const fetchOpts = {};
        if (script.integrity)
            fetchOpts.integrity = script.integrity;
        if (script.referrerpolicy)
            fetchOpts.referrerPolicy = script.referrerpolicy;
        if (script.crossorigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (script.crossorigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
}());

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
    console.log("in lower segment of screen");
    let ballPaddleDist = (paddle.x + paddle.size / 2) - (ball.x);
    if (ball.y == ballPaddleDist){
      if (ballPaddleDist == 50){
        ball.vel.y *= -1;
      }
    }
  }
//end hinkle code
}
function ballCollisionWalls({ width, height }){
  if (ball.x > (width - 10)){
    ball.x = (width - 10);
    ball.vel.x *= (-1);
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
  ballCollisionWalls({ width, height });
});

/* Input Handlers */

gi.addHandler("mousemove", function ({ x, y }) {
  paddle.x = x - paddle.size / 2;
});

/* Run the game */
gi.run();
//# sourceMappingURL=index-d39eddcc.js.map
