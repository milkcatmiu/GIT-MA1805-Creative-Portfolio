let scene = 0;
//scene variable for each possible screen
//scene 0 = selecting photos or videos
//scene 1 = photo album
//scene 2 = video album

let vertical = [478,604];
let horizontal = [704,478];
//variables to store the horizontal and vertical image sizes

let images = [];
let videos = [];
//array to store image and video files for loading

let imageindex = 0;
let videoindex = 0;
//index variable to cycle through images and videos easily

let [x1,x2] = [0,0];
let [x3,x4] = [0,0];

let playingvideo = false;

//create coordinates variable to store the valid x range for arrows
//x1 and x2 for left arrow, x3 and x4 for right arrow

let imagefiles = [
  'Resources/Images/v1.jpg',
  'Resources/Images/v2.jpg',
  'Resources/Images/v3.jpg',
  'Resources/Images/v4.jpg',
  'Resources/Images/v5.jpg',
  'Resources/Images/v6.jpg',
  'Resources/Images/v7.jpg',
  'Resources/Images/v8.jpg',
  'Resources/Images/h1.jpg',
  'Resources/Images/h2.jpg',
  'Resources/Images/h3.jpg',
  'Resources/Images/h4.jpg',
  'Resources/Images/h5.jpg',
  'Resources/Images/h6.jpg',
  'Resources/Images/h7.jpg',
  'Resources/Images/h8.jpg',
  'Resources/Images/h9.jpg',
  'Resources/Images/h10.jpg'
]
//array with all my image file locations (v=vertical image, h=horizontal image)

let videofiles = [
  'Resources/Videos/hv1.mp4',
  'Resources/Videos/hv2.mp4',
  'Resources/Videos/hv3.mp4',
  'Resources/Videos/vv1.mp4',
  'Resources/Videos/vv2.mp4',
  'Resources/Videos/vv3.mp4',
  'Resources/Videos/vv4.mp4'
]
//array with all my video file locations (hv = horizontal video, vv = vertical video)

let imagedescriptions = [
  "18/11/2024 - The bridge near campus at night. The cars were bright and everything shined from the rain",
  "09/11/2024 - The view of the city in Battersea. It was my sister's birthday that day, she turned 22.",
  "12/06/2024 - The plane from LGW to MCO. I was excited and nervous to see my boyfriend",
  "12/07/2024 - The pier in St. John's. We went there to watch the sunset after our dinner date at Taste of India.",
  "19/07/2024 - MCO Airport. I waited for boarding to start, wishing that I could be spending that time with him instead. I didn't want to go home.",
  "27/09/2024 - The path near Founder's. On my way to a lecture, it was my first time back here in a while.",
  "15/10/2024 - The path on my way to campus. It's creepy sometimes.. the nettles are always overgrown.",
  "18/11/2024 - Further down the path to campus. Autumn is finally here, but my shoes get so muddy.",
  "23/06/2024 - The beach house at Flagler. I used to sit here and draw on my iPad.",
  "11/07/2024 - The sunset on Julington Creek bridge. We listened to music while he drove.",
  "12/07/2024 - The sky in the car park in Mandarin. We parked before going into the restaurant for our date.",
  "04/07/2024 - The drive back to St John's. We got ice cream and listened to Paramore songs before watching fireworks later that night.",
  "09/07/2024 - St John's River. We walked to the pier and brought the Djungelskog that he bought for me at IKEA.",
  "26/06/2024 - The clouds rolling in over Flagler beach. We often sat on the balcony and watched the sunset.",
  "19/07/2024 - The drive to Orlando. The sky was beautiful that day, the clouds were vibrant and I saw a rainbow. It cheered me up a little.",
  "15/07/2024 - The drive back from St. Augustine - It stormed badly while we drove. I was scared that we would crash.",
  "24/10/2024 - The pond near Founder's - I went there for the first time with two friends. It was so beautiful and I had no idea it existed.",
  "22/06/2024 - The gate leading down to the beach. I didn't really go down there much.. It was too hot outside and the sand burned my feet."
]

let videodescriptions = [
  "12/11/2024 - The walk home after class - it was dark and the leaves blew gently in the wind.",
  "19/07/2024 - The drive to Orlando Airport. The depth of the clouds was brought out by the bright sun - it was beautiful.",
  "24/10/2024 - The water fountain in the pond behind Founder's building. It was very peaceful and therapeutic there.",
  "12/11/2024 - The trees by the cemetery. The streetlamp only barely lit up the dark looming leaves above.",
  "6/11/2024 - The tree on my way to campus. The tree was filled with loads of loud chirping birds.",
  "12/06/2024 - The view above the clouds on the plane to Orlando Airport. I hadn't flown in 9 years."
]

//arrays with descriptions of all images and videos

function setup() {
  createCanvas(1400, 800);
}

function preload(){

  clicksfx = loadSound("Resources/Audio/click_sfx.mp3");
  //loading click sound effect

  for (let i=0; i<imagefiles.length; i++){
      images[i] = loadImage(imagefiles[i]);
    }
  //loads all image files to image[] array

  wallpaper = loadImage('Resources/Images/wallpaper.jpg');
  //loads wallpaper image

  leftarrow = loadImage('Resources/Images/leftarrow.png');
  rightarrow = loadImage('Resources/Images/rightarrow.png');
  leftarrowpressed = loadImage('Resources/Images/leftarrowpressed.png');
  rightarrowpressed = loadImage('Resources/Images/rightarrowpressed.png');
  //loads left and right arrow images

  photoicon = loadImage('Resources/Images/photoicon.png');
  videoicon = loadImage('Resources/Images/videoicon.png');
  backicon = loadImage('Resources/Images/backicon.png');
  //loads buttons to view photo, video and back icon

  for (let i=0; i<videofiles.length-1; i++){
    videos[i] = createVideo(videofiles[i]);
    videos[i].hide();
    //assigns each video file to the videos array then hides the DOM instance
  }

  videos[1].volume(0.15);
  videos[2].volume(0.5);
  videos[5].volume(0.15);
  //reduces the volume of certain videos that are very loud
}

function draw() {
  image(wallpaper, width/2, height/2, width, height);
  imageMode(CENTER);
  textAlign(CENTER);

  if (scene==0){
    fill(255, 235, 252);
    stroke(158, 47, 140);
    textSize(100);
    image(photoicon,(width/2)-200,height/2,230,180);
    image(videoicon,(width/2)+200,height/2,230,180);
    text('Collection of Media',0,100, width, height);
    //creates title and the buttons to choose photos or videos
  }
  if (scene==1){

    //photo album scene
    image(backicon,width/2, 70, 150, 30);
  
    if (imageindex<=7){
      [x1,x2,x3,x4] = [289,330,751,788];
      [x1,x2,x3,x4] = [(width/2)-(vertical[0]/2)-55,(width/2)-(vertical[0]/2)-10,(width/2)+(vertical[0]/2)+10,(width/2)+(vertical[0]/2)+55]
      //assigns coordinates for valid mouse range when image is vertical

      image(images[imageindex],width/2,height/2,vertical[0],vertical[1]);
      image(leftarrow,x1+20,height/2,45,45);
      image(rightarrow,x3+20,height/2,45,45);
      //draws image and arrows that align with vertical images

      text(imagedescriptions[imageindex], (width/2), height-70);
      //draws the description text under each image
  
    }
  
    else{
      [x1,x2,x3,x4] = [230,268,812,849];
      [x1,x2,x3,x4] = [(width/2)-(horizontal[0]/2)-55,(width/2)-(horizontal[0]/2)-10,(width/2)+(horizontal[0]/2)+10,(width/2)+(horizontal[0]/2)+55]
      //assigns coordinates for valid mouse range when image is horizontal

      image(images[imageindex],width/2,height/2,horizontal[0],horizontal[1]);
      image(leftarrow,x1+20,height/2,45,45);
      image(rightarrow,x3+20,height/2,45,45);
      //draws images and arrows with horizontal coordinates

      text(imagedescriptions[imageindex], (width/2), height-100);
      //draws description text under each image, adjusted for horizontal images
    }
  }

  if (scene==2){
    //video album scene
    image(backicon,width/2, 70, 150, 30);
    if (videoindex<=2){
      [x1,x2,x3,x4] = [230,268,812,849];
      [x1,x2,x3,x4] = [(width/2)-(horizontal[0]/2)-55,(width/2)-(horizontal[0]/2)-10,(width/2)+(horizontal[0]/2)+10,(width/2)+(horizontal[0]/2)+55]
      //assigns coordinates for valid mouse range when video is horizontal

      image(videos[videoindex],width/2,height/2,horizontal[0],horizontal[1]);
      image(leftarrow,x1+20,height/2,45,45);
      image(rightarrow,x3+20,height/2,45,45);
      videos[videoindex].loop();
      //draws videos and arrows with horizontal coordinates

      text(videodescriptions[videoindex], (width/2), height-100);
      //draws video description text when video is horizontal
    }
    else{
      [x1,x2,x3,x4] = [289,330,751,788];
      [x1,x2,x3,x4] = [(width/2)-(vertical[0]/2)-55,(width/2)-(vertical[0]/2)-10,(width/2)+(vertical[0]/2)+10,(width/2)+(vertical[0]/2)+55]
      //assigns coordinates for valid mouse range when video is vertical
      image(videos[videoindex],width/2,height/2,vertical[0]-50,vertical[1]);
      
      image(leftarrow,x1+20,height/2,45,45);
      image(rightarrow,x3+20,height/2,45,45);
      videos[videoindex].loop();
      //draws videos and arrows that align with vertical videos

      text(videodescriptions[videoindex], (width/2), height-70);
      //draws video description text when video is vertical
    }
  }
}

function mouseClicked(){
 clicksfx.play();
 //plays click sfx when mouse clicked

if (scene==0){
  fill(255, 235, 252);
  stroke(158, 47, 140);
  textSize(20);
  if (mouseX>397 && mouseX<601 && mouseY>319 && mouseY<478){
    scene = 1;
    //sets scene to photo album if the button is clicked
  
  }
  if (mouseX>795 && mouseX<1002 && mouseY>319 && mouseY<478){
    scene = 2;
    //sets scene to video album if the button is clicked
  
  }
}
if (scene==1){

  if (mouseX>625 && mouseX<769 && mouseY>55 && mouseY<81){
    scene=0;
    //moves scene back to homepage if back button is pressed
  }

  if (mouseX>x1 && mouseX<x2 && mouseY>(height/2-10) && mouseY<(height/2+10)){
    //decrease image index if left arrow is clicked
    if (imageindex>=1){
      imageindex--
     }
     else{
      imageindex=images.length-1
     }
  }

  if (mouseX>x3 && mouseX<x4 && mouseY>(height/2-10) && mouseY<(height/2+10)){
    //increase image index if right arrow is clicked
    if (imageindex<images.length-1){
      imageindex++
     }
     else{
      imageindex=0;

     }
  }
}

if (scene==2){
  if (mouseX>625 && mouseX<769 && mouseY>55 && mouseY<81){
    scene=0;
    videos[videoindex].pause();
    //moves scene back to homepage if back button is pressed
  }

  if (mouseX>x1 && mouseX<x2 && mouseY>(height/2-10) && mouseY<(height/2+10)){
    videos[videoindex].pause();
    //decrease video index if left arrow is clicked
    if (videoindex>=1){
      videoindex--
     }
     else{
      videoindex=videos.length-1
     }
  }

  if (mouseX>x3 && mouseX<x4 && mouseY>(height/2-10) && mouseY<(height/2+10)){
    videos[videoindex].pause();
    //increase video index if right arrow is clicked
    if (videoindex<videos.length-1){
      videoindex++
     }
     else{
      videoindex=0;
     }
    }
 console.log('mouse at:',mouseX, mouseY);
  }
}
