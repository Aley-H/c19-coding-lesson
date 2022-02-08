var ground, groundImage, invisibleBoundary
var trex ,trex_running, invisibleGround;
var cloudImage, cloud, cloudGroup
var o1, o2, o3, o4, o5, o6, obstacles, obstaclesGroup
var gameState="play"
var score=0
var gameOver, restart, gameOverImage, restartImage
var trexCollided
var dieSound, jumpSound, checkpointSound

function preload(){
  trex_running=loadAnimation("trex1.png", "trex3.png", "trex4.png")
  groundImage=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  gameOverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png") 
  trexCollided=loadImage("trex_collided.png")

dieSound=loadSound("die.mp3")
jumpSound=loadSound("jump.mp3")
checkpointSound=loadSound("checkpoint.mp3")

  o1=loadImage("obstacle1.png")
  o2=loadImage("obstacle2.png")
  o3=loadImage("obstacle3.png")
  o4=loadImage("obstacle4.png")
  o5=loadImage("obstacle5.png") 
  o6=loadImage("obstacle6.png")

}

function setup(){
  createCanvas(600,200)

  //create a trex sprite
 trex = createSprite(50, 165, 20, 20)
 trex.addAnimation("trexLabel", trex_running)
 trex.scale = 0.5
 trex.setCollider("rectangle",0, 0, 65, 65)

trex.addImage("collidedLabel", trexCollided)

//trex.debug=true

gameOver = createSprite(300, 100, 20, 20)
gameOver.addImage(gameOverImage)
gameOver.scale=0.5
gameOver.visible=false

restart = createSprite(300, 70, 100, 20)
restart.addImage(restartImage)
restart.scale=0.5 
restart.visible=false

 obstaclesGroup=createGroup()

 cloudsGroup=createGroup()

 ground = createSprite(300, 180, 600, 10)
 ground.addImage("label_ground", groundImage)

invisibleGround = createSprite(300, 190, 600, 10)

invisibleGround.visible=false

invisibleBoundary = createSprite(300, 70, 600, 10)

invisibleBoundary.visible = false

}

function draw(){
  background("black")

  trex.velocityY=trex.velocityY+0.5
  trex.collide(invisibleGround)

  text("score:"+ score, 530, 30)

if (gameState=="play"){
  if (keyDown("space")&& (trex.y>150)){
    trex.velocityY=-10
    jumpSound.play()
  }
ground.velocityX=-(6.75+score/750)
if (ground.x<0){
  ground.x=ground.width/2
  
}
if (score%750==0&&score>0){
  checkpointSound.play()
}
score=score+Math.round(frameCount/200)
spawnObstacles()
clouds()
if (obstaclesGroup.isTouching(trex)){
  gameState="end"
dieSound.play()
 // trex.velocityY=-10
  //jumpSound.play()
}

}

if (gameState=="end"){
  ground.velocityX=0
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  restart.visible=true
  gameOver.visible=true
  trex.changeImage("collidedLabel", trexCollided)
  cloudsGroup.setLifetimeEach(1/0)
  obstaclesGroup.setLifetimeEach(1/0)
  if (mousePressedOver(restart)){
reset()
  }
}

drawSprites()
}

function clouds(){
  if (frameCount%50==0){
  cloud=createSprite(600, 100, 20, 20)
  cloud.addImage("cloudLabel", cloudImage)
  cloud.velocityX=-5
  cloud.scale=0.85
  cloud.y=Math.round(random(20, 130))
 trex.depth=cloud.depth
 trex.depth=trex.depth+1
 cloud.lifetime=120
 cloudsGroup.add(cloud)
  }
}

function spawnObstacles(){
  if (frameCount%80==0){
    obstacles=createSprite(600, 160, 20, 20)
   obstacles.velocityX=-(6.75+score/750)
   var r=Math.round(random(1,6))  
  switch(r){
    case 1:obstacles.addImage("o1label", o1)
    break
    case 2:obstacles.addImage("o2label", o2)
    break
    case 3:obstacles.addImage("o3label", o3)
    break
    case 4:obstacles.addImage("o4label", o4)
      break
      case 5:obstacles.addImage("o5label", o5)
        break
        case 6:obstacles.addImage("o6label", o6)
          break
  }
obstacles.scale=0.65
obstacles.lifetime=150
obstaclesGroup.add(obstacles)
  }
}
function reset(){
  gameState="play"
  trex.changeAnimation("trexLabel", trex_running)
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  score=0
  restart.visible=false
  gameOver.visible=false
}