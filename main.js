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
  x : 10,
  y : 10,
  velocity: {
      x : 10,
      y : 10,
  }
}

const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 20
let bricks = [];
for (let y = 0; y<BRICK_HEIGHT * 4; y += BRICK_HEIGHT )
  for (let x = 0; x < BRICK_WIDTH * 12; x+=BRICK_WIDTH)
    bricks.push({x:x, y:y}) 


/* Drawing Functions */

/* Example drawing function: you can add multiple drawing functions
that will be called in sequence each frame. It's a good idea to do 
one function per each object you are putting on screen, and you
may then want to break your drawing function down into sub-functions
to make it easier to read/follow */
gi.addDrawing(
  function ({ ctx, width, height, elapsed, stepTime }) {
    // Your drawing code here...    
  }
)

/* Input Handlers */

/* Example: Mouse click handler (you can change to handle 
any type of event -- keydown, mousemove, etc) */

/* gi.addHandler(
  "click",
  function ({ event, x, y }) {
    // Your click handling code here...
  }
)


/* Run the game */
gi.run();


