var ground;
var groundIMG
var ball;
var ballIMG
var player;
var playerAni;
var player2;
var player2Ani;
var playerStill;
var player2Still;
var invisGoal1;
var invisGoal2;
var player1Score = 0;
var player2Score = 0;
var kickSound;
var gameState = "serve";



function preload()
  {
   ballIMG = loadImage("Pictures/soccerball.png");
   groundIMG = loadImage("Pictures/soccerField.jpg");
   playerAni = loadAnimation("Pictures/Soccer1.png","Pictures/Soccer2.png","Pictures/Soccer3.png","Pictures/Soccer4.png","Pictures/Soccer5.png","Pictures/Soccer6.png");
   player2Ani = loadAnimation("Pictures/dude2.png","Pictures/dude3.png","Pictures/dude4.png","Pictures/dude5.png");
   player2Still = loadImage("Pictures/dude2.png");
   playerStill = loadImage("Pictures/Soccer1.png");
   player2Ani = loadAnimation("Pictures/Soccer1.png","Pictures/Soccer2.png","Pictures/Soccer3.png","Pictures/Soccer4.png","Pictures/Soccer5.png","Pictures/Soccer6.png");
   kickSound = loadSound("kickSound.mp3");  
}




function setup() {
  createCanvas(windowWidth,windowHeight);
  ball = createSprite(width/2, height/2, 50, 50);
  ball.addImage("ball image", ballIMG);
  ball.scale = 0.01
  // ground = createSprite(400,220,800,400);
  // ground.addImage("ground image", groundIMG);
  // ground.scale = 1.5;
  player = createSprite(200,height/2,50,50);
  player.addImage(playerStill);
  player.scale = 0.5;

  player2 = createSprite(width-200,height/2,50,50);
  player2.addImage(player2Still);
  player2.scale = 0.5;

  invisGoal1 = createSprite(100,height/2,50,140)
  invisGoal1.visible = false;

  invisGoal2 = createSprite(width-95,height/2,50,140)
  invisGoal2.visible = false;
}

function draw() {
  background(groundIMG);  

  edges = createEdgeSprites();
  stroke("red");
   
    //place info text in the center
    if (gameState === "serve") {
      text("Press Space to Serve",width/2-50,height/2-50);
    }

  //calling serve function
  if(keyDown("space"))
  {
    serve();
    gameState = "play";
    
  }

  //MOVE!
  if(keyDown("w"))
  {
     player.y = player.y-5
  }
  if(keyDown("s"))
  {
     player.y = player.y+5
  }  
  if(keyDown("a"))
  {
     player.x = player.x-5
  }  
  if(keyDown("d"))
  {
     player.x = player.x+5
  }  

  if(keyDown("up"))
  {
     player2.y = player2.y-5
  }
  if(keyDown("down"))
  {
     player2.y = player2.y+5
  }  
  if(keyDown("left"))
  {
     player2.x = player2.x-5
  }  
  if(keyDown("right"))
  {
     player2.x = player2.x+5
  } 

   //kick sound and animation
   if(player.isTouching(ball))
   {
      player.changeAnimation("Pictures/Soccer6.png");
      kickSound.play();
   }

   if(player2.isTouching(ball))
   {
      player2.changeAnimation("Pictures/dude5.png");
      kickSound.play();
   }

 reset();

  ball.bounceOff(player);
  ball.bounceOff(player2);
  ball.bounceOff(edges);
  player.collide(edges);
  player2.collide(edges);


  drawSprites();

  
  textSize(20);
  text("player1: " + player1Score,width-200,50);
  text("player2: " + player2Score,width-200,100);

  if(player1Score === 5)
  {
    text("Player 1 Wins!!",width/2-50,height/2-50);
    gameState = "end";
  }

  if(player2Score===5){
   text("Player 2 Wins!!",width/2-50,height/2-50);   
   gameState = "end";
  }
}



function serve()
{
  
  ball.velocityX = Math.round(random([-15,-10,-5,5,10,15]))
  ball.velocityY = Math.round(random([-15,-10,-5,5,10,15]))

}

function reset()
   {

      if(ball.isTouching(invisGoal1))
      {
        player2Score = player2Score +1;
        console.log(player2Score)
        
       ball.x = width/2;
       ball.y = height/2;
       ball.velocityX = 0;
       ball.velocityY = 0;

       player.x = 200;
       player.y = height/2;
       player2.x = width-200;
       player2.y = height/2;
      }

      
      if(ball.isTouching(invisGoal2))
      {
        player1Score = player1Score +1;
        console.log(player1Score);
        
       ball.x = width/2;
       ball.y = height/2;
       ball.velocityX = 0;
       ball.velocityY = 0;
        
       player.x = 200;
       player.y = height/2;
       player2.x = width-200;
       player2.y = height/2;


      }
      
   }
