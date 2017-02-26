var pointillismAreaHeight = window.innerHeight/2.81,  //a schermo interno è il punto dove tocca l'orizzonte
    points = [],
    xPosCorrectionScale = 1,
    pointSizeRange = [10, 20];

var t;
var moon;
var bombs = [],
    frameRate = 1, //non funziona, per velocizzare per fare le scie omogenee
    bombSpeed = 4,
    xPosCorrectionScale = 1;
var s = second();

function preload() {
dresda = loadImage("assets/citta.png");
dresda2 = loadImage("assets/citta2.png");
dresda3 = loadImage("assets/citta3.png");
dresda4 = loadImage("assets/citta4.png");
dresda5 = loadImage("assets/citta5.png");
dresda6 = loadImage("assets/citta6.png");
dresda7 = loadImage("assets/citta7.png");
moon = loadImage("assets/moon.png");
bomba = loadImage("assets/bombetta.png");
clock = loadImage("assets/orologio.png");
vittime = loadImage("assets/vittime.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
 initWidth = windowWidth;
background (106, 125, 165);
    }

function draw() {

imageMode(CENTER);

// definisco cambiamenti skyline
   if(bombs.length < 100) {
        image(dresda, windowWidth/2, windowHeight/2,windowWidth, windowWidth*1530/2048);

    }
  if( bombs.length > 100 ) {
        image(dresda2, windowWidth/2, windowHeight/2,windowWidth, windowWidth*1530/2048);
        
    }
    if(bombs.length > 200) {
        image(dresda3, windowWidth/2, windowHeight/2,windowWidth, windowWidth*1530/2048);
    }
    if(bombs.length > 300) {
        image(dresda4, windowWidth/2, windowHeight/2,windowWidth, windowWidth*1530/2048);
    }
    if(bombs.length > 400) {
        image(dresda5, windowWidth/2, windowHeight/2,windowWidth, windowWidth*1530/2048);
    }
     if(bombs.length > 500) {
        image(dresda6, windowWidth/2, windowHeight/2,windowWidth, windowWidth*1530/2048);
    }   
    if(bombs.length > 600) {
        image(dresda7, windowWidth/2, windowHeight/2,windowWidth, windowWidth*1530/2048);
    }
    
 // Creo le bombe
    for (var i = 1; i < bombs.length; i++) {
         bombs[i].y+=2;
        if (bombs[i].y > height - pointillismAreaHeight) {
            var bomb = bombs[i];
            ellipse(bombs[i].x, bombs[i].y,50,50);
            
            if (!points[i]) {
                points[i] = {
                    x: random(0, width),
                    y: random(height - pointillismAreaHeight, height),
                    size: random(pointSizeRange[0], pointSizeRange[1]),
                    color: "255",
                }
            }

            fill(bomb.color);
            noStroke();
            ellipse(bomb.x * xPosCorrectionScale, height - pointillismAreaHeight, bomb.size);
        } else {
            //scie
             fill(bombs[i].color);
            noStroke();
            ellipse(bombs[i].x * xPosCorrectionScale, bombs[i].y,7,25);
            bombs[i].y += 10;
        }
    }
    
    
if (!points[i]) {
                points[i] = {
                    x: random(0, width),
                    y: random(height - pointillismAreaHeight, height),
                    size: random(pointSizeRange[1], pointSizeRange[2]),
                    color: "255",
                }
            }
    
// posizione e movimento luna

var s = second()
var t = interval-int(millis()/1000);
image(moon, width/5 + int(millis()/1000), height/3 - int(millis()/1000), 70, 70);
    
// Creo timer countdown

var interval = 120;
var millisecond = millis()
var t = interval-int(millis()/1000);

image(clock, windowWidth-115,45, 45, 45);
noStroke();
fill('#A51800');
textSize(30);
t = interval - int(millis()/1000);
time = nf(t ,1);
interval+=10
text(t,windowWidth-80,55);


// Creo contatore per le vittime
image(vittime, windowWidth-115,135, 45, 45);
noStroke();
fill('#A51800');
textSize(30);
text(bombs.length*15,windowWidth-80, 145)    
    
// Creo contatore per le bombe
    
image(bomba, windowWidth-110,90, 45, 45);
noStroke();
fill('#A51800');
textSize(30);
text(bombs.length,windowWidth-80, 105);

//imposto schermata finale
 if(t === 0){
    noStroke();
    fill(0, 0, 0);
    rect(0, 0, windowWidth, windowHeight);
    textSize(60);
     textFont("Courier");
    fill(250);
    textAlign(CENTER);
    text("War settles nothing.\n\nRemembering Dresden.", width/2, height/3+60);
    t(0 ,1); 
    }

    drawPointillism();
}


function mouseReleased() {
  var newx = random()*width;
  var newSize = random(3,8);
  var newColor;
    var myRandom = random(0,1);
    if (myRandom <= 0.5) {
        newColor = color('#910000');
    } else {
        newColor = color('#A51800');
    }
    var obj = {x: newx, y: 0, size: newSize, color: newColor};
    bombs.push(obj);

    if (bombs.length > maxBombsCount) {
        bombs.shift();
    }
}

function drawPointillism() {
    // draw rect
    noStroke();
    fill(111);
    rect(0, height - pointillismAreaHeight, width, pointillismAreaHeight);

    // draw point
    for (var i in points) {
        var point = points[i];
        fill(33);
        noStroke();
        ellipse(point.x * xPosCorrectionScale, point.y, point.size);
    }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  xPosCorrectionScale = windowWidth / initWidth;
  }
