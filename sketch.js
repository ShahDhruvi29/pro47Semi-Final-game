// MONSTER ANIMATION LEFT
// we use RIGHT and LEFT arrow keys to MOVE
// how to use them in MOBILE ???
// we CLICK on POT and RESTART button 
// how to do it in MOBILE ???
var gameState = "start"
var count = 0;
var distance = 0;
var b5,pot,treasureChest,man,monster;
var edges,bgMusic;
function preload(){
  b5=loadImage("scratchbg.png")
  cactus6=loadImage("cactus_06.png")
  cactus7=loadImage("cactus_07.png")
  cactus8=loadImage("cactus_08.png")
  flower2=loadImage("flower2.png")
  flower4=loadImage("flower4.png")
  gem3=loadImage("gem3.png")
  gem5=loadImage("gem5.png")
  chest2=loadImage("b2.png")
  chest3=loadImage("b3.png")
  manImg=loadAnimation("man1.png","man2.png")
  monsterImg=loadAnimation("dragon1.png","dragon2.png")
  bgMusic=loadSound("temple.mp3")
  gemSound=loadSound("scoreBlast.mp3")
  chestSound=loadSound("treasureChest.mp3")
  scoreSound=loadSound("woohoo.mp3")
  dieSound=loadSound("splat.mp3")
  potImg=loadImage("pot1.png")
  mainBg=loadImage("bg2.png")
  restartB=loadImage("restart.png")
  
}
function setup(){
 createCanvas(500,600)
 bgMusic.loop();
 var music=bgMusic.isPlaying();
 console.log(music)
 bg=createSprite(250,300)
 bg.addImage(b5)
 bg.velocityY=12;
 bg.scale=1.7
 man=createSprite(250,320)
 man.addAnimation("background",manImg)
 man.setCollider("rectangle",0,0,70,200)
// man.debug=true;
 man.scale=1.0
 monster=createSprite(250,570)
 monster.addAnimation("background",monsterImg)
 monster.scale=1.2
 bg1=createSprite(250,300)
 pot=createSprite(270,350)
 restartbutton=createSprite(250,300)
  cactusGroup= new Group()
  flowersGroup= new Group()
  gemsGroup=new Group()
  chestboxGroup=new Group()
}
bgMusic.play();
function draw(){
  background("pink") 
    if(gameState==="start"){
      bgMusic.play();
      pot.addImage(potImg)
      pot.visible=true
      
      bg1.addImage(mainBg)
      bg1.scale=0.7
       
       if (mousePressedOver(pot)) {
         gameState="play"
         pot.visible=false
       }
       man.visible=false
       monster.visible=false
       count.visible=false
       bg.visible=false
       restartbutton.visible=false
    }
  if(gameState==="play"){
  // bgMusic.play();
    man.visible=true
    restartbutton.visible=false
    monster.visible=true
    count.visible=true
    bg.visible=true
    bg1.visible=false
      if(bg.y>600){
      bg.y=  0;
      }
      distance = distance + Math.round(World.frameRate/50);
     if (keyDown(RIGHT_ARROW)) {
      man.x=man.x+20
     }
    if (keyDown(LEFT_ARROW)) {
    man.x=man.x-20
    }
    if (frameCount%1000 === 0){
     scoreSound.play();
    }
    if(distance%10===0){
     bg.velocityY=bg.velocityY+1
    }
     if (gemsGroup.isTouching(man)){
      gemsGroup.destroyEach();
      gemSound.play();
      count=count+30
    }
     if(chestboxGroup.isTouching(man)){
       chestboxGroup.destroyEach();
       chestSound.play()
       count=count+100
     }
        spawnPlants();
        spawnFlowers();
        spawnGems();
        spawnChests();
      if(cactusGroup.isTouching(man)||flowersGroup.isTouching(man)||man.x<86||man.x>410){
        
      cactusGroup.destroyEach();
      flowersGroup.destroyEach();
      dieSound.play();
      gameState="end"
      
     bgMusic.stop();
      }
    
  }
  else if(gameState==="end"){
   
     bgMusic.stop();
     bg.velocityY=0
     cactusGroup.setVelocityYEach(0)
     flowersGroup.setVelocityYEach(0)
     chestboxGroup.setVelocityYEach(0)
     gemsGroup.setVelocityYEach(0)
     man.visible=false;
     monster.visible=false;
     restartbutton.addImage(restartB)
     restartbutton.visible=true
     restartbutton.scale=0.6
     if (mousePressedOver(restartbutton)){
       gameState="play"
       count=0
       distance=0
       distance = distance + Math.round(World.frameRate/60)
       bgMusic.loop();
       man.visible=true;
       man.x=250
       monster.visible=true;
       bg.velocityY=12;
       bg.scale=1.7
       if(bg.y>600){
        bg.y=  0;
        }
     }
   }
  drawSprites();

  textSize(30)
  textFont("Lucida Handwriting")
  textStyle(ITALIC)
  fill("red")
  text("Try your best!",130,590)
  textSize(30)
  textFont("cursive")
  textStyle(BOLD)
  fill("pink")
  text("The Infinite Forest Run",60,25)
  textSize(30);
  textFont("Helvetica")
  textStyle(ITALIC)
  fill("yellow")
  text("Score:"+count,10,55)
  text("Distance:"+distance,10,85)
}
function spawnPlants(){
  if (frameCount%170===0) {
    cactus = createSprite(250, 0);
    cactus.velocityY=5
    var rand = Math.round(random(1,3))
    switch (rand) {
      case 1: cactus.addImage(cactus6)   
        break;
      case 2: cactus.addImage(cactus7)   
        break;
      case 3: cactus.addImage(cactus8)   
        break;
      default: break;
    }
   cactus.x=Math.round(random(150,400))
    cactus.lifetime=80
 //   cactus.debug = true;
    cactus.scale = 0.4
    cactusGroup.add(cactus)
  }
}
function spawnFlowers(){
  if (frameCount%890===0) {
    flora=createSprite(250,0)
    flora.velocityY=4
    
    var rand = Math.round(random(1,2))
    switch (rand) {
      case 1: flora.addImage(flower2)   
        break;
      case 2: flora.addImage(flower4)   
        break;
      default:  break;
    }
    flora.x=Math.round(random(150,300))
    flora.lifetime=80
  //  flora.debug=true;
    flora.scale=0.4
    flowersGroup.add(flora)
  }
}
function spawnGems(){
  if (frameCount%590===0) {
    gemy=createSprite(220,0)
    gemy.velocityY=4
 
    var rand = Math.round(random(1,2))
    switch (rand) {
      case 1: gemy.addImage(gem3)
        break;
      case 2: gemy.addImage(gem5)
        break;
      default: break;
    }
    gemy.x=Math.round(random(150,400))
    gemy.lifetime = 80
    gemy.scale=0.2
    gemsGroup.add(gemy)
  }
}
function spawnChests() {
  if (frameCount%1280===0) {
    chesty=createSprite(220,0)
    chesty.velocityY=5

    var rand = Math.round(random(1,2))
    switch (rand) {
      case 1: chesty.addImage(chest2)   
        break;
      case 2: chesty.addImage(chest3)   
        break;
      default:  break;
    }
    chesty.x=Math.round(random(150,400))
    chesty.lifetime=80
    chesty.scale=0.5
    chestboxGroup.add(chesty)
  }
}