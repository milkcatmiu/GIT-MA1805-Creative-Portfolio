
let currentcharacter = 0;
//incrementing variable that helps the program type out the sentence
let wordbank = 'My world is full of...';
//string variable to add words to, containing starter sentence for the word bank

let wordcount = 0
//counter variable to ensure the word count doesn't exceed what can fit on the screen

let desserts = ['cake', 'pie', 'cookies', 'brownie', 'ice cream', 'pudding', 'custard', 'cheesecake', 'tart', 'muffin', 'cupcake', 'donut', 'fudge', 'chocolate', 'caramel', 'truffle', 'macaron', 'eclair', 'gelato', 'sorbet', 'baklava', 'cinnamon roll', 'panna cotta', 'churro', 'flan', 'banana split', 'profiterole', 'chocolate mousse', 'rice pudding', 'sweet roll', 'marzipan', 'tiramisu', 'fruit salad', 'crème brûlée', 'soufflé', 'jelly', 'mousse', 'parfait', 'pavlova', 'taiyaki', 'roll cake', 'gingerbread', 'lemon bar', 'chocolate chip', 'biscotti', 'cobbler', 'scone', 'madeleine', 'spoon cake', 'popsicle'];
let colours = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white', 'gray', 'violet', 'indigo', 'turquoise', 'cyan', 'magenta', 'beige', 'cream', 'gold', 'silver', 'bronze', 'navy', 'teal', 'mint', 'lavender', 'peach', 'coral', 'plum', 'maroon', 'charcoal', 'rose', 'emerald', 'azure', 'amber', 'sapphire', 'ruby', 'topaz', 'jade', 'ivory', 'chartreuse', 'olive', 'fuchsia', 'blush', 'burgundy', 'mustard', 'khaki', 'cobalt', 'scarlet', 'cream', 'lavender'];
let animals = ['lion', 'tiger', 'elephant', 'giraffe', 'zebra', 'kangaroo', 'panda', 'koala', 'bear', 'wolf', 'fox', 'rabbit', 'squirrel', 'deer', 'hippopotamus', 'rhinoceros', 'crocodile', 'alligator', 'cheetah', 'leopard', 'jaguar', 'whale', 'dolphin', 'shark', 'octopus', 'seal', 'penguin', 'eagle', 'owl', 'parrot', 'sparrow', 'falcon', 'hawk', 'peacock', 'duck', 'goose', 'chicken', 'turkey', 'cow', 'horse', 'sheep', 'goat', 'camel', 'llama', 'donkey', 'pigeon', 'bat', 'rat', 'mouse', 'frog'];
let fruits = ['apple', 'banana', 'orange', 'grape', 'pear', 'peach', 'plum', 'cherry', 'strawberry', 'blueberry', 'raspberry', 'blackberry', 'watermelon', 'melon', 'kiwi', 'pineapple', 'mango', 'papaya', 'lemon', 'lime', 'grapefruit', 'apricot', 'nectarine', 'pomegranate', 'fig', 'date', 'dragon fruit', 'lychee', 'tangerine', 'coconut', 'mandarin', 'persimmon', 'cantaloupe', 'guava', 'passion fruit', 'star fruit', 'custard apple', 'mangosteen', 'elderberry', 'acai', 'chili pepper', 'plantain', 'rhubarb', 'carambola', 'kumquat', 'tomatoes', 'longan', 'mullberry', 'jackfruit', 'durian'];
let plants = ['rose', 'sunflower', 'tulip', 'lily', 'orchid', 'daisy', 'violet', 'daffodil', 'cherry blossom', 'lavender', 'fern', 'bamboo', 'cactus', 'succulent', 'carnation', 'hibiscus', 'marigold', 'jasmine', 'bougainvillea', 'lilac', 'iris', 'poppy', 'gardenia', 'magnolia', 'palm', 'oak', 'maple', 'birch', 'pine', 'cedar', 'spruce', 'fir', 'sequoia', 'bamboo', 'aloe vera', 'sage', 'thyme', 'rosemary', 'mint', 'oregano', 'basil', 'chamomile', 'geranium', 'ivy', 'moss', 'cucumber plant', 'strawberry plant', 'tomato plant', 'pumpkin', 'sunflower'];
let nature = ['star', 'moon', 'sun', 'cloud', 'rain', 'storm', 'lightning', 'thunder', 'fog', 'snow', 'hail', 'tornado', 'hurricane', 'wind', 'breeze', 'dust storm', 'sunshine', 'eclipse', 'comet', 'meteor', 'galaxy', 'planet', 'constellation', 'milky way', 'sky', 'atmosphere', 'aurora', 'sunset', 'sunrise', 'dawn', 'dusk', 'twilight', 'clouds', 'overcast', 'ice', 'frost', 'dew', 'mist', 'vapor', 'rainbow', 'blizzard', 'drizzle', 'heatwave', 'cyclone', 'fogbank', 'volcanic ash', 'sand dune', 'mountain breeze', 'whirlwind','gust'];
//a set of 6 arrays with 50 words of each category

let word1;
let word2;
let word3;
//creates variables to temporarily hold the choice of 3 words that can be added to the sentence

let allwords = [desserts, colours, animals, fruits, plants, nature];
//nested array to hold all possible word values for better randomisation later on

function setup() {
  createCanvas(1000, 600);
  generatewords();
  //creates random words when program begins
  textFont(`Roboto`);
}
function draw() {

  background(240, 216, 233);
  //pink background

  stroke(89, 21, 69)
  fill(176, 141, 166);
  rectMode(CENTER);
  rect(220,height-100,width/4,50);
  rect(width/2,height-100,width/4,50);
  rect(width-220,height-100,width/4,50);
  //draws three boxes with outlines
  
  let wordbankcharacters = wordbank.substring(0,currentcharacter);
  //creates variable to store the incomplete sentence displayed on screen (which keeps
  //adding characters as it scrolls through), dividing the wordbank string using .substring()

  fill(87, 41, 62);
  noStroke();
  textSize(50);
  textAlign(CENTER);
  text("Let's make a word bank!",width/2, 80);
  //draws title

  textSize(20);
  textAlign(CENTER);
  text(wordbankcharacters, width/2,120, width-20);
  //displays the full word bank at the top


  text('click on a word below!',width/2, height-140);
  //guides user to click on a word to add

  textSize(30);
  text(word1, 220, height-94);
  text(word2, width/2, height-94);
  text(word3, width-220, height-94);
  //draws the word options in the text boxes

  
  currentcharacter += random(0,0.4)
  //increments the current character between 0.4 and 0 to simulate natural looking typing at random speeds
}

function mouseClicked(){
  if (mouseX<400 && mouseX>0){
  }

  if (wordcount<=170){
    if (mouseX>95 && mouseX<345 && mouseY>475 && mouseY<524){
      //detects if box 1 (left box) is clicked

      wordbank = wordbank + word1 + ', ';
      //adds the word into the sentence

      wordcount++
      //increments word count for upper limit detection

      generatewords();
      //randomises words for next choice
    }
    if (mouseX>374 && mouseX<624 && mouseY>475 && mouseY<524){
      wordbank = wordbank + word2 + ', ';
      wordcount++
      generatewords();
    }
    if (mouseX>655 && mouseX<904 && mouseY>475 && mouseY<524){
      wordbank = wordbank + word3 + ', ';
      wordcount++
      generatewords();
    }
  }
}

function generatewords(){
//function to reroll the three words and generate 3 new ones.

  let words = [];
  //empty local array to store current words
  
  for (let i=0; i<=2; i++){
    index1 = floor(random(0,5));
    index2 = floor(random(0,49));
    words[i] = allwords[index1][index2];
    //appends 3 random words to the words array, generating a random index 
    //referring to which word category, and then an index for which word within that
    //category. 
  }

  word1 = words[0];
  word2 = words[1];
  word3 = words[2];
  //it then references that words array and assigns those words to the three word variables

}