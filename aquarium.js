let fish1X, fish1Y, fish1Size;
let fish1Color;
let fish2X, fish2Y, fish2Size;
let fish2Color;
let aquariumName = "My Aquarium";
let foodX, foodY;
let foodDropped = false;
let bubbles = [];

function setup() {
  createCanvas(800, 600);
  
  // Fish 1 properties
  fish1X = width / 2;
  fish1Y = height / 2;
  fish1Size = 50;
  fish1Color = color(10, 230, 255);

  // Fish 2 properties
  fish2X = width / 2 + 100;
  fish2Y = height / 2;
  fish2Size = 50;
  fish2Color = color(255, 0, 255);
  
  // Initialize bubbles
  for (let i = 0; i < 20; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      size: random(5, 15)
    });
  }
}

function draw() {
  background(50, 150, 200);
 
  // Display aquarium name
  textSize(24);
  fill(255);
  text(aquariumName, 10, 30);
 
  // Draw fish 1
  fill(fish1Color);
  ellipse(fish1X, fish1Y, fish1Size, fish1Size / 2);
  triangle(fish1X - fish1Size / 2, fish1Y, fish1X - fish1Size, fish1Y - fish1Size / 4, fish1X - fish1Size, fish1Y + fish1Size / 4);

  // Draw fish 2
  fill(fish2Color);
  ellipse(fish2X, fish2Y, fish2Size, fish2Size / 2);
  triangle(fish2X - fish2Size / 2, fish2Y, fish2X - fish2Size, fish2Y - fish2Size / 4, fish2X - fish2Size, fish2Y + fish2Size / 4);

  // Fish 1 follows mouse
  fish1X = lerp(fish1X, mouseX, 0.05);
  fish1Y = lerp(fish1Y, mouseY, 0.05);

  // Fish 2 controlled by arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    fish2X -= 3;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    fish2X += 3;
  }
  if (keyIsDown(UP_ARROW)) {
    fish2Y -= 3;
  }
  if (keyIsDown(DOWN_ARROW)) {
    fish2Y += 3;
  }
  
  // Constrain Fish 2 within the canvas
fish2X = constrain(fish2X, 0, width);
fish2Y = constrain(fish2Y, 0, height);

   // Prevent fish overlap
   let minDistance = (fish1Size + fish2Size) / 2; // Minimum distance to prevent overlap
   let d = dist(fish1X, fish1Y, fish2X, fish2Y);
 
   if (d < minDistance) {
     let angle = atan2(fish2Y - fish1Y, fish2X - fish1X);
     fish2X = fish1X + cos(angle) * minDistance;
     fish2Y = fish1Y + sin(angle) * minDistance;
   }
  // Draw bubbles
  for (let i = 0; i < bubbles.length; i++) {
    fill(255, 255, 255, 150);
    noStroke();
    ellipse(bubbles[i].x, bubbles[i].y, bubbles[i].size);
    bubbles[i].y -= 1;

    // Reset bubble to bottom if it goes off the top
    if (bubbles[i].y < 0) {
      bubbles[i].y = height;
    }
  }
 
  // Draw food
  if (foodDropped) {
    fill(255, 204, 0);
    ellipse(foodX, foodY, 10, 10);
    foodY += 2;
    if (foodY > height) {
      foodDropped = false;
    }
  }
 
  // Check if fish 1 is near food
  if (dist(fish1X, fish1Y, foodX, foodY) < fish1Size / 2 && foodDropped) {
    fish1Color = color(100, 200, 100);
    foodDropped = false;
  } else {
    fish1Color = color(10, 230, 255);
  }
  
  // Check if fish 2 is near food
  if (dist(fish2X, fish2Y, foodX, foodY) < fish2Size / 2 && foodDropped) {
    fish2Color = color(100, 200, 100);
    foodDropped = false;
  } else {
    fish2Color = color(255, 0, 255);
  }
}

function keyPressed() {
  // Drop food
  if (key === 'F' || key === 'f') {
    foodX = random(width);
    foodY = 0;
    foodDropped = true;
  }
}