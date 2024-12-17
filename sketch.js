// READ ME: TYPE UNTIL THE WORLD GOES BLACK AND GLACIER IS GONE


// Counter for Temp
var warming=0;
//string to add to for lines
var currentkey =''
//counts how many chars are typed //used for debug
var count= 0;
//starting x for the type print
var start_x;
//starting y for the type print
var start_y;
//amount of chars allowed in a line
var maxchar=40
//Array that holds each line typed to print previous line
var lines =[]
//colors for rgb of background
var backR=173;
var backG = 216;
var backB = 230;
//screen img
var screen;
// for cloud x pos
var cloudx;
//list for cloud y pos
var cloudy =[];
// Color of the clouds
var cloud_color = 250
var myfont;



// preloads a computer screen png/Ice Texture/Font   
function preload(){
  
  screen =loadImage("Computer front.png");
  Ice_text = loadImage("New_ICE.png")
  myfont = loadFont("font.ttf")

}

function setup() {
  createCanvas(windowWidth, windowHeight,WEBGL);
  textFont(myfont);

  // loop to find random y pos for the clouds then putting it into the cloudy list(Allows clouds to be in differnet pos everytime)
  for (let i = 0; i < 40; i++) { //creats 40 clouds(incase of playing on a large screen )
    cloudy[i] = random(-400,-340)  // Random y positions for clouds
  }
  
}


function draw() {
  // Center the image on the screen. Cords for the image
  let imageX = 0
  let imageY =0
  let imageWidth = 600;
  let imageHeight = 500;

  //Starting positions for text to be centered over the image 
  let start_x = imageX - 150
  let start_y = imageY  - 160

// Draws the color of the background based on the val of the following var
  background(backR, backG, backB);

  // Draw the image in the center of the screen
  imageMode(CENTER);
  image(screen, imageX, imageY, imageWidth, imageHeight);

  // Loop to create clouds by going through the list and displaying 40 clouds at Y pos determined by the cloudy list
  //Then adjusting the x pos of the clouds to moves them  across the screen
  cloudx = -1200;
  for (let i = 0; i < 40; i++) {
    Clouds(cloudx, cloudy[i]);
    cloudx += 150;
  }

  //calls Glacier function to draw the square glacier over and over
  Glacier(-845,windowHeight-465,400,500);
  //calls the typeOutput function to display the keys being typed with the starting x and y cords for typing                 
  typeOutput(start_x, start_y);
}

/* Function to print out the keys being typed in real-time while adjusting line levels, By displaying
each char typed then adding it to a combined string(currentkey) of chars until the string hits the maxchar limit. Then the string is added to the lines list to display
every previous line typed and then the string is cleared. Once the lines list has 9 strings in it, it then  gets cleared(making all current lines on the screen vanish)
Reseting the computer screen. */
function typeOutput(start_x, start_y) {
  // if the currentkey length is = to maxchar add the string to the lines list then clears current key 
  if (currentkey.length === maxchar) {
    lines.push(currentkey);
    currentkey = '';
  }
  //setting text size and colorb
  textSize(15);
  fill(255);

  // Reset lines list  if it exceeds the limit (9 lines in this case)
  if (lines.length === 9) {
       lines = [];
  }

  // Prints every string in the lines list.Adjust Y value to print lines top to bottom.
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], start_x, start_y + (i * 20));
  }

  // Prints the current key being typed under the previous lines
  text(currentkey, start_x, start_y + (lines.length * 20));
}
//Function used to control the background color changes. Adjust RGB colors to head towards black for every key typed
//Had to look up the math to pull off the transition I wanted
function keyTyped() {
  // Text input logic
  //R color
  if (backR <= 0) {
    backR = 0;
  } else {
    backR -= 0.4325;
  }
  //G color
  if (backG <= 0) {
    backG = 0;
  } else {
    backG -= 0.54;
  }
  // B color
  if (backB <= 0) {
    backB = 0;
  } else {
    backB -= 0.575;
  }
// Controls the cloud colors to go towards gray for every key typed
  if (cloud_color <= 128) {
    cloud_color = 128;
  } else {
    cloud_color -= 0.305;
  }
//Used for debugging for RGB values of colors 
  console.log(backR, backG, backB);
//If Enter key is pressed it ignores it
  if (key === "Enter") {
    currentkey = currentkey;
    // For every other key it adds it to the currentkey string
  } else if (currentkey.length < maxchar) {
    currentkey += key;
    //warming is increased for every key typed to determine how the glacier melts
    warming+=3
  } 
}
//  If Backspace was pressed it delets the last letter in the string 
function keyPressed(){
  if (keyCode === BACKSPACE){
    currentkey = currentkey.slice(0,-1);
    }
}


// Function used to create clouds by combining 3 circles  with the cloud_circle var
function Clouds(x,y){
  fill(cloud_color)
  noStroke();
  circle(x, y, 70, 50);
  circle(x + 10, y + 10, 70, 50);
  circle(x - 20, y + 10, 70, 50);
}
// Function to create and melt the glacier by using the warming var and mapping
//Had to look up what map does and how to melt the sqaure
function Glacier(x, y, w, h) {
  //   The glacier starts at full height (300), but melts as warming increases
  let meltAmount = map(warming, 0, 1000, 0, h);  // Map the warming to the glacier's height
  let currentHeight = h - meltAmount;  // current height depends on the height - the meltAmount

 // If the height it less the 5 the glacier is deleted 
  if (currentHeight < 5) {
    currentHeight = 0;
  }

  fill(255, 255, 255, 200);  // Glacier is white
  noStroke();

  // Draw the glacier using a simple rectangle
   texture(Ice_text)
  rect(x, y - currentHeight, w, currentHeight);
}


