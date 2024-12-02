//inspiration for fireworks from Daniel Shiffman:
//https://editor.p5js.org/codingtrain/sketches/O2M0SO-WO

let x1 = 0;
let x2 = 800;
//assigns the x position for the two circles at each side of the canvas

let size = 30;
let speed = 5;
//assigns the size and speed of the moving circles

let fireworkparticles = [];
//array that stores the particle data for the fireworks

let circle1valid = true;
let circle2valid = true;
//booleans to check if the moving circles will be displayed

let fireworksStarted = false;
//boolean to check if the circles have collided yet and if a firework should set off

let colour1, colour2; 
//creating variables that will later store the colour of the two circles

let gravity;
//creates a variable to store gravity data

let mixed = [];
//creates a global array to store the current mixed colour's rgb values to be used in the text

function setup() {
  createCanvas(800, 800); 
  randomcolours();
  //assigns random colours to the circles
  rectMode(CENTER);
  //centers the circles
  gravity = createVector(0, 0.1);
  //creates a vector for the gravity
}

function preload() {
  bg = loadImage('Resources/Images/background.jpg');
  //preloads the background image
  //the background is a photo I took and edited in procreate and photoshop
}

function draw() {
 
  image(bg, 0, 0, 800, 800);
  //draws the background image to the canvas

  if (circle1valid) {
    fill(colour1);
    noStroke();
    circle(x1, height / 2, size);
    stroke(colour1);
    noFill();
    circle(x1, height / 2, size+20);

  }

  if (circle2valid) {
    fill(colour2);
    noStroke();
    circle(x2, height / 2, size);
    stroke(colour2);
    noFill();
    circle(x2, height / 2, size+20);
  }
  //above iteration draws the two circles that will collide, as long as they are 'valid' aka have not collided yet
  //it then draws an outer ring around each circle to make them look cooler
  noStroke();
  //removes the stroke again

  if (fireworksStarted) {
    //function that occurs if the circles have collided
    for (let i = fireworkparticles.length - 1; i >= 0; i--) {
      let currentParticle = fireworkparticles[i];  
      //gets the current particle and updates its position and displays it
      //it loops this until it gets through the entire array of all particles

      currentParticle.update();  
      //moves the particle's xy position using the update() function

      currentParticle.show();
      //displays the particle

      if (currentParticle.isFaded()) {
        fireworkparticles.splice(i, 1);
        //removes the particle if it fades completely or moves out of bounds
      }
    }
  }

  let distance = dist(x1, height / 2, x2, height / 2);
  //calculates the distance between the two circles

  if (distance <= size && !fireworksStarted) {
    //detects if the two circles collided or not
    let mixedcolour = lerpColor(colour1, colour2, 0.5);

    //gets the exact colour between the colours of the two circles using the lerp function

    for (let i = 0; i < 200; i++) {
      let angle = random(TWO_PI);  
      //sets a random angle for each firework particle to explode at in a circle shape
      let speed = random(2,10);
      //sets the random speed for each firework particle
      fireworkparticles.push(new FireworkParticle((x1 + x2) / 2, height / 2, angle, speed, mixedcolour));  // Create new firework particle
    }

    fireworksStarted = true;
    //variable that tracks if the current firework is still happening

    circle1valid = false;
    circle2valid = false;
    //invalidates the moving circles, triggering the code to remove them from the draw screen
  
  } else {
    x1 += speed;
    x2 -= speed;
    //moves the x coordinates of the moving circles towards the center of the screen
  }

  if (fireworkparticles.length == 0 && fireworksStarted) {
    resetCircles();
    //checks if the current firework has finished and resets the circles
  }

  textAlign(CENTER);
  textFont('Roboto');
  textSize(40);
  fill(colour1);
  text('two',300,90);
  fill(colour2);
  text('worlds',width/2,90);
  fill(mixed[0], mixed[1], mixed[2]);
  text('collide',520,90);
}

function randomcolours() {
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);
  colour1 = color(r,g,b);
  //sets the range of RGB values for red blue, pink and purple fireworks
  //it then assigns these values to the first circle's colour variable

  r = random(0,255);
  g = random(0,255);
  b = random(0,255);
  colour2 = color(r,g,b);

  //does the same for the second circle! :D

}

function resetCircles() {
  x1 = 0;
  x2 = width;
  //resets the x position of the circles to the edge of the screen
  circle1valid = true;
  circle2valid = true;
  //makes the circles valid again so that they can respawn

  randomcolours();
  //assigns new random colours to the circles

  fireworksStarted = false;
  //sets the boolean to false to indicate that the fireworks are over 
  //and to draw new circles
}

class FireworkParticle {
  //creates a class for the fireworks, using vector particles for the explosion
  constructor(x, y, angle, speed, colour) {
    this.position = createVector(x, y);
    //creates the starting position of the firework at the point where the two circles collide

    this.velocity = createVector(cos(angle) * speed, sin(angle) * speed); 
    //sets the angle at which the firework particle will move, as well as its speed (the internet helped me as I am bad at maths)

    this.acceleration = gravity.copy();
    //applies gravity to the acceleration of each particle
    this.opacity = 255;
    //sets the opacity of the particles to full (using alpha value)
    this.colour = colour;  
    //assigns the colour for the particle to the blended colour
    this.size = 5; 
    //size variable for each circle in the firework explosion
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    //applies acceleration and velocity variables to the current particle's movement

    this.opacity -= 1;  
    //slowly decreases the opacity of the firework particles
    //it decrements by the value each time
  }

  isFaded() {
    return this.opacity <= 0;
    //checks if the opacity is at 0 and 
  }

  show() {
    noStroke();
    mixed[0] = this.colour.levels[0];
    mixed[1] = this.colour.levels[1];
    mixed[2] = this.colour.levels[2];
    //copies the current mixed colour values to the global variable
    //to be used in drawing text

    fill(this.colour.levels[0], this.colour.levels[1], this.colour.levels[2], this.opacity);  
    //assigns the rgb and alpha values to the current particle by changing the fill
    ellipse(this.position.x, this.position.y, this.size, this.size);
    //draws the particle to the canvas using all its properties
  }
}
