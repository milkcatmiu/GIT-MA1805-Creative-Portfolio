let stars = [];
let staramount = 500;
// creates global array named stars to store the coordinates of stars drawn in background, then 
// sets the maximum amount of drawn stars using a variable named staramount.


function setup() {
  createCanvas(800, 400);
  //creates a canvas with a width of 800 pixels and height of 400 pixels

  for (let i = 0; i < staramount; i++) {
  //creates for loop and defines an incrementer variable named i
  // iterates on the condition that i is less than the maximum number of stars, and if so it increments 
  // the i variable by one using "i++". It repeats by comparing i to the staramount variable.
  // this loop MUST be done outside of the draw function as draw() is continuously called while the sketch is running. I learned this the hard way..

    stars[i] = createVector(random(width), random(height), random(1,2.5));
  //it then incremently appends a vector to the stars array until star amount is reached
  // the vector coordinates (x and y parameters) are assigned randomly using a random number based on the canvas' width and height
  // and the final parameter being a random width between 1 and 3. The higher the max range, the bigger the stars
  // can be. I prefer them smaller though!

}

}

function draw() {

//-----MAKING GRADIENT BACKGROUND-----

  background(150, 109, 191);
  //sets background colour

  noStroke();
  //removes outline

  fill(174, 163, 227);
  //sets fill colour to purpleish

  rect(0,200,width,200);
  filter(BLUR,90);
  //draws a rectangle on bottom half, blurs it and creates gradient effect
  
  fill(217, 173, 224);
  //sets fill colour to a pinkish purple 

  rect(0,300,width,200);
  filter(BLUR,70);
  //draws and blurs secondary rectangle, for lighter gradient layer

//-----MAKING RANDOMIZED STARS!!-----

  fill(253, 237, 255);
  //sets colour of stars

  for (let i = 0; i < staramount; i++){
  //sets the i index pointer to 0 again, loops the following code iteratively until i == staramount variable (keeps looping until 500 stars are drawn)
    
    circle(stars[i].x, stars[i].y, stars[i].z);
    //draws a circle using the (x,y,z) vector values stored in the stars array at the current i index (this will continually increment)
    //x,y = circle's coordinates, z = circle's width (ranged between 1 and 2.5 pixels)
    }
  
//-----MAKING SHOOTING STAR-----
  noFill();
  stroke(255,255,255,70);
  //sets stroke to white with 70% opacity
  strokeWeight(8);
  curve(300,250,300,200,700,20,700,400);
  //draws a lower opacity curve to act as the blur for the shooting star trail

  stroke(255);
  strokeWeight(2);
  curve(300,250,300,200,700,20,700,400);
  //sets stroke to full white with a 2px stroke and redraws the curve for the star trail

  fill(255);
  quad(300,200,298,191,296,200,298,209);
  quad(302,200,289,199,300,196,308,198);
  //uses two quads to make a star

//-----MAKING WINDOW OVERLAY----- 
  noStroke()
  fill(53, 26, 56);
  //sets colour to dark purple shadow colour
  rect(220,0,10,400);
  rect(400,0,10,400);
  rect(600,0,10,400);
  //window middle lines
  quad(0,350,800,380,800,400,0,400);
  //BOTTOM RECT: top left, top right, bottom right, bottom left
  quad(0,0,800,0,800,20,0,120);
  //TOP RECT: top left, top right, bottom right, bottom left
  rect(0,0,40,400);
  //LEFT SIDE PANEL (dark)

  fill(80, 40, 84);
  quad(40,350,800,380,800,410,25,370);
  //light reflecting on bottom of window (top left, top right, bottom right, bottom left)

  fill(65, 30, 69);
  quad(40,350,25,370,25,120,40,114);
  //light reflecting on left of window

  stroke(53, 26, 56);
  strokeWeight(10);
  //sets colour back to dark purple shadow colour
  line(223,360,200,400);
  line(405,365,390,400);
  line(605,370,590,400);
  //draws shadow of the window middle lines

  cursor('images/cursor.png');
  //sets the cursor to a star i drew

}
