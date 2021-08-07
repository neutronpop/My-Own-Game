class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
        
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(50,400);
    car1.addImage("car1",car1_img);
    
    car1.debug = true;

    car2 = createSprite(50,400);
    car2.addImage("car2",car2_img);

    car2.debug = true;
   
    cars = [car1, car2];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    player.getCarsAtEnd()

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,0,displayWidth*5, displayHeight);

      if(marioSpeed > 6){

      marioSpeed -=0.08

      }

      
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 50 ;
      var y = 0;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        //position the cars a little away from each other in x direction
        y = allPlayers[plr].y;
        //use data form the database to display the cars in y direction
        x = 50+ allPlayers[plr].x;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(18);
          fill("red")
          ellipse(x,y,60,60)
          cars[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].x;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if(car1.isTouching(booster1)){

    marioSpeed = 15; 
    booster1.destroy();

    }

    if(car1.isTouching(booster2)){

      marioSpeed = 15; 
      booster2.destroy();
  
      }

      if(car1.isTouching(booster3)){

        marioSpeed = 15; 
        booster3.destroy();
    
        }

        
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      if(player.index ===1){

        player.x += marioSpeed;

      }
      else{

        player.x += sonicSpeed;

      }
     
      player.update();
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.y -=10
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.y +=10
      player.update();
    }

    if(player.distance > 3860){

      gameState = 2;
      player.rank += 1
      Player.updateCarsAtEnd(player.rank)

    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
  }
}
