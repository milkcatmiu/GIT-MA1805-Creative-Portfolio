let raindrops = [];
//creates an array for the raindrops

let dropcount = 0;
//counts how long has passed since the last raindrop was spawned in frames.

let rate = 1;
//variable for the rate at which particles can spawn based on frames (10 frames)

let max = 15;
//sets a maximum amount of particles that can be on screen at once

let dropletsfx = [];
//create array for current droplet sfx

let soundfiles = [
  'Resources/Audio/Droplet1.wav',
  'Resources/Audio/Droplet2.wav',
  'Resources/Audio/Droplet3.wav',
  'Resources/Audio/Droplet4.wav'
]

let bgm1volume=1;

let currentbg = 2;
let rainygirl = [];
//array for current background image
let imagefiles = [
  'Resources/Images/RainyGirl1.png',
  'Resources/Images/RainyGirl2.png',
  'Resources/Images/RainyGirl3.png',
  'Resources/Images/RainyGirl4.png',
  'Resources/Images/RainyGirl5.png',
  'Resources/Images/RainyGirl6.png',
  'Resources/Images/RainyGirl7.png',
  'Resources/Images/RainyGirl8.png',
  'Resources/Images/RainyGirl9.png',
  'Resources/Images/RainyGirl10.png',
  'Resources/Images/RainyGirl11.png',
  'Resources/Images/RainyGirl12.png',
  'Resources/Images/RainyGirl13.png'
]

//creates string array containing all droplet sound effects' paths

function preload(){
  //preload function for importing content and reducing page load time
  for (let i = 0; i < soundfiles.length; i++){
    dropletsfx[i] = loadSound(soundfiles[i]);
    //loads a random sound file from the soundfiles array, grabbing a random index between 0 and the max length
  }
  for (let i=0; i<imagefiles.length; i++){
    rainygirl[i] = loadImage(imagefiles[i]);
  }
  bgm1 = loadSound('Resources/Audio/Nostalgic Sad Loop.mp3');
  //loads the background music audio file

  for (let i=0; i<=3; i++){
    dropletsfx[i].setVolume(0.2);
  }

}

function setup() {
  createCanvas(1200, 650);
  ellipseMode(RADIUS);
  //changes ellipse mode to make it easier to convert raindrops into splashes
  noFill();
  //removes fill
  bgm1.loop();
  //plays the background music and loops it infinitely while the program is running
  textFont('Courier New');
}

function draw() {
  bgm1.setVolume(bgm1volume);

  imageMode(CENTER);
  //image(backgroundimg,width/2,300, 1200,700);

  image(rainygirl[currentbg],width/2, 300, 1200,700);
  //filter(POSTERIZE,10);

  fill(73, 103, 186,random(180,220));
  noStroke();
  textSize(20);
  text('I feel myself changing each time . . .',420,100,width);

  dropcount++;

  if (rate <= dropcount &&raindrops.length < max){
    let numRaindrops = random(1,2);
    for (let i=0; i<numRaindrops; i++){
      raindrops.push(new Particle());
    }
    dropcount=0;
  }

  for (let i = 0; i<raindrops.length; i++){
    raindrops[i].update();
    raindrops[i].display();
  }
}

class Particle {
  //creates a class for the raindrops, making it easy to update all the variables
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(-150, 0);       
    //sets a starting x and y coordinate for the raindrop particles, beginning above the visible screen
    this.vy = random(2,3);       
    //sets the speed of the particle movement randomly between 2 and 3
    this.maxy = this.y + height;    
    //sets the maximum y coordinate that a raindrop can go, relative to the canvas' height
    this.r = 5;                     
    //sets the initial length of the raindrop
    this.w = random(1, 3);          
    //makes each particle stroke weight between 1 and 3 pixels thick
    this.isSplashing = false;       
    //creates a boolean variable that determines the state of whether the particle is a falling raindrop or a splash
    this.splashTimer = 0;           
    //creates timer variable to handle how long the splash lasts for
    this.splashRadius = 0;          
    //sets the initial radius of the splash
    this.splashMaxRadius = 30;      
    //sets maximum radius of the splash
    this.splashOpacity = 255
    //opacity of the splash ellipse starts at max 255
    
  }

  update() {
    if (this.isSplashing) {
      this.splashRadius += 2;  
      //increases the radius of the splash circle, widening by 2 gradually
      this.splashOpacity -=15;
      //decreases the opacity of the splash circle by 15 each time
      if (this.splashRadius > this.splashMaxRadius||this.splashOpacity <= 0) {
        //checks if the radius of the splash circle reaches its maximum, and checks if the opacity is at its lowest
        this.reset();
        // resets the current particle to default, creating a new one
      }
    } else {
      if (this.y < this.maxy) {
        this.y += this.vy;  
        // Moves each raindrop down by increasing the y value
      } else {
        this.isSplashing = true;
        // sets the state of the particle to splashing, which triggers the splash effect and sfx
        this.splashTimer = 0;
        // sets the the timer 
        this.playdropletsfx();   
        //plays the droplet sound effect when splash happens
      }
    }
  }

  display() {
    strokeWeight(this.w);     
    //sets the thickness for the raindrop line
    noFill();
    stroke(255);              
    //makes raindrop white

    if (this.isSplashing) {
      // triggers an ellipse to spawn and widen when the raindrop hits its bottom

      stroke(255,255,255,this.splashOpacity)
      // changes stroke to white and sets the opacity 
      ellipse(this.x, this.y, this.splashRadius * 5, this.splashRadius * 2); 
      //draws a circle when the raindrop reaches its endpoint
    } else {
      //Draws a line using the current raindrop's coordinates and attributes, does this until the splash
      line(this.x, this.y, this.x, this.y + this.r);
    }
  }

  playdropletsfx(){
    let soundIndex = floor(random(0, dropletsfx.length));
    //uses floor to ensure the random number is whole, making it a valid and readable index
    dropletsfx[soundIndex].play();
    //plays random sound effect from droplet sfx array
    currentbg = floor(random(0,rainygirl.length));
    //changes background every time a drop falls
  }
}
