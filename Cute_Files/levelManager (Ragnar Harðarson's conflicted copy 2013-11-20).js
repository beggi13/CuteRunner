var levelManager  = {
_WAITSECS : -2,
_MAXENEMIES : -1,
_BUNNY : 0,
_SQUIRREL : 1,
_KITTEN : 2,
_GREDAPEDE : 3,
_RAIN : 4,
_SEAL :5,
_PUPPY :6,



_nextTypeOfEnemy : ["bunny", "squirrel", "kitten", "gredapede","rain","seal", "puppy","boss1", "boss2", "boss3"],
currentLevel : 0,
currentLine : 0,
waitTime : 0,
maxEnemies : 10,
_sprites : [g_sprites.bunny, g_sprites.squirrel, g_sprites.kitten, g_sprites.gredapede, g_sprites.rain],

update: function(du) {
	//check if in game
	if(!gameFlow.inGame()) return;
	if(entityManager.nrOfEnemies() <= this.maxEnemies && this.waitTime < 0){
		this.loadline(levels.getLevel());
	}
	
	this.waitTime -= du;

	if(this.levelComplete(levels.getLevel())){
		var nextLevel = Math.min(this.currentLevel + 1, 4);
		this.changeLevel(nextLevel);
	}
},

canLoadLine : function(){
	//should I not load next line for any reason?
	return entityManager.nrOfEnemies() <= this.maxEnemies && this.waitTime < 0 
		&& gameFlow.inGame();
},

loadline: function(level){

	//out of array do not load
	if(this.currentLine >= level.length) 
		return;

	var current = level[this.currentLine];
	var nextType = current.nextType;
	// event < 0 <= load enemy
	if(nextType >= 0){	this.loadEnemy(current);	}

	else{	this.handleEvent(current);	}
	this.currentLine = this.currentLine + 1;
},

loadEnemy : function(Enemy){
	var width = g_canvas.width;
	var height = g_canvas.height;

	entityManager.generateEnemy({
		cx : Enemy.xPos*width,
		cy : Enemy.yPos*height,

		sprite : Enemy.sprite

	}, this._nextTypeOfEnemy[Enemy.nextType]);
},

handleEvent : function(currentEvent){
	switch(currentEvent.nextType){
		case -1:
			this.maxEnemies = currentEvent.maxEnemies;
		break;
		
		case -2:
			this.waitTime = currentEvent.waitTime * SECS_TO_NOMINALS;
		break;

		case -3:
			gameFlow.toggleDialog(true);
			dialogManager.setDialog(currentEvent.dialog);
			dialogManager.setSpeaker(currentEvent.speaker);
		break;

		case -4:
			this.loadNewLevel(currentEvent.backgroundb);
		break;
	}
},

loadNewLevel : function (newBackground){
	
	//load the background
	var background;
		switch (newBackground){
			case "level1":
				background = g_sprites.level1background;
				soundManager.level1.play();
				soundManager.level1.loop = true;
				break;
			case "level2":
				soundManager.stopSound(soundManager.level1);
				background = g_sprites.level2background;
				soundManager.level2.play();
				soundManager.level2.loop = true;
				break;
			case "level3":
				soundManager.stopSound(soundManager.level2);
				background = g_sprites.level3background;
				soundManager.level3.play();
				soundManager.level3.loop = true;
				break;

			default:
				background = g_sprites.level1background;
				break;
		}
		entityManager.generateBackground({
			sprite : background
		});

	//get a player
	createInitialShips();
},

getLevelNr : function(){
	return this.currentLevel;
},

changeLevel : function(toLevel){
	this.currentLine = 0;
	this.currentLevel = toLevel;

	//clear everything, new level should initialize what is needed
	juicyStuff.clearPowerUps();
	entityManager.clearEverything();
	spatialManager.clearAll();
},

levelComplete : function(level){
	return (this.currentLine >= level.length && entityManager.nrOfEnemies() < 1);
}
}