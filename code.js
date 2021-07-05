var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;

var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("yellow");

var goal2=createSprite(168,382,100,20);
goal2.shapeColor=("yellow");
var gamestate="serve";


// making court
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



// creating objects and giving them colours
var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";
//defining score
var computerscore=0;
var playerscore=0;


function draw() {
  //clear the screen
  background("green");
  if(gamestate=="serve")
  {
   textSize(18);
   fill("red");
   text("press space to play",120,230);
   if(keyDown("space")){
    serve();
  gamestate ="play";
}
}


  //make the player paddle move with the Arrow keys
  paddleMovement();
  
  
  //AI for the computer paddle
// making computer paddle move
computerMallet.x=striker.x;
  
  //draw line at the centre
   for (var i = 0; i < 400; i=i+20)
   {
    line(i,200,i+10,200);
  }
  
  //create edge boundaries
  //make the striker bounce with the top and the bottom edges
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);
  striker.bounceOff(goal1);
  striker.bounceOff(goal2);
  
 //serve the striker when space is pressed
if(keyDown("space"))
{
  serve();
}


  

  
 
  drawSprites();
}

 


function serve()
{
  striker.velocityX=10;
  striker.velocityY=5;
}


function paddleMovement()
{

  if(keyDown("left"))
  {
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right"))
  {
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up"))
  {
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down"))
  {
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
   }

   if(striker.isTouching(goal1))
     {
       computerscore=computerscore+1;
     }
    
   if(striker.isTouching(goal2))
   {
     playerscore=playerscore+1;
   }
    textSize(18);
     fill("maroon");
     text(computerscore,25,225);
     text(playerscore,25,180);
if(striker.isTouching(goal1)||striker.isTouching(goal2))
    {
     striker.x=200;
     striker.y=200;
     striker.velocityX=0;
     striker.velocityY=0;
    }

if(playerscore==5||computerscore==5)

{
  computerscore=0;
  playerscore=0;

   fill("maroon");
       textSize(18);
       text("gameover",120,180);
       gamestate="serve";
}

} 

       
       
       
       
       
       
       
       
   




// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
