//Create variables here
var dog, database, foodStock, foodS , milk;

function preload() {
  //load images here
  dogimg = loadImage("images/dogImg.png");
  dogimg2 = loadImage("images/dogImg1.png");
}

function setup() {
  var canvas = createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogimg);
  dog.scale = 0.2;
  milk = createSprite(150,250,10,10);
  
}


function draw() {
  background(46, 139, 87);

  //add styles here
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogimg2);
  }

  if (keyWentDown(DOWN_ARROW)) {
    foodS = foodS++
    writeStock(foodS);
    milk.addImage(milk);
  }
  drawSprites();
  //add styles here
  fill("white");
  textSize(20);
  stroke(5);
  text("Press Up Arrow Kew To Feed Tan milk", 80, 100);
  text("You have fed: " + foodS + " Milk ", 100, 70);
  console.log(foodS);
}

//function to read and write food stock from database
function readStock(data) {
  foodS = data.val();
}

//function to write values in database
function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref("/").update({
    Food: x,
  });
}