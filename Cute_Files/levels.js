var levels = {

/*_WAITSECS : -2,
_MAXENEMIES : -1,
_BUNNY : 0,
_SQUIRREL : 1,
_KITTEN : 2,
_GREDAPEDE : 3,
_RAIN : 4,
_SEAL :5,
_PUPPY :6,
_BOSS1 : 7
*/


_levels : [
//[nextType of enemy, x-coords, y-coords]
// coords are between 0-1 for inside the map, >0:left, <1:right
// [-1, max amount of enemies on map] [-2, amount of seconds to wait untill nextline]

//_test : 
[
	//{nextType : 2, xPos : -0.1, yPos : 0.2}, {nextType : 2, xPos : -0.16, yPos : 0.2},{nextType : 2, xPos : -0.21, yPos : 0.2},{nextType : 2, xPos : -0.26, yPos : 0.2},
	{nextType : 2, xPos : -0.1, yPos : 0.2},
	{nextType : 2, xPos : -0.1, yPos : 0.45},
	{nextType : 2, xPos : 1.1, yPos : 0.3},
	{nextType : 2, xPos : 1.1, yPos : 0.8},

	{nextType : -1, maxEnemies : 0},
	{nextType : -4},
	{nextType : 6, xPos : 0.5, yPos : -0.1},
	{nextType : -2, waitTime : 1},
	{nextType : -1, maxEnemies : 0}, 
	//{nextType : -2, waitTime : 3},
	//{nextType : 2, xPos : 1.1, yPos : 0.2}, {nextType : 2, xPos : 1.16, yPos : 0.2},{nextType : 2, xPos : 1.21, yPos : 0.2},{nextType : 2, xPos : 1.26, yPos : 0.2}
	
],
//_level1:
[
	//initialize background
	{nextType : -4, backgroundb : "level1"},
	//initialize nr of enemies and wait time
	{nextType : -1, maxEnemies : 4}, {nextType : -2, waitTime : 3},

	//Intro : waves of different enemies
	//wave of kittens
	{nextType : -3, dialog : "Rainbow Dash : I'm here to kick ass \n and eat cake, and I'm all out of cake! ", speaker : "player"},
	{nextType : 2, xPos : -0.1, yPos : 0.2}, {nextType : 2, xPos : -0.18, yPos : 0.2},{nextType : 2, xPos : -0.26, yPos : 0.2},{nextType : 2, xPos : -0.34, yPos : 0.2},
	{nextType : -2, waitTime : 3},
	{nextType : -3, dialog : "Rainbow Dash : You kittens wanna \n play rough! okay, say 'ello to my \n dashing friend! ", speaker : "player"},
	{nextType : 2, xPos : 1.1, yPos : 0.2}, {nextType : 2, xPos : 1.18, yPos : 0.2},{nextType : 2, xPos : 1.26, yPos : 0.2},{nextType : 2, xPos : 1.34, yPos : 0.2},
	{nextType : -1, maxEnemies : 0},

	//wave of squirrels
	{nextType : -1, maxEnemies : 2},
	{nextType : 1, xPos : 0.2, yPos : -0.1}, {nextType : 1, xPos : 0.25, yPos : -0.15},
	{nextType : -1, maxEnemies : 0},

	//wave of bunnies
	{nextType : -1, maxEnemies : 8},
	{nextType : 0, xPos : 1.1, yPos : 0.3}, {nextType : 0, xPos : 1.20, yPos : 0.3},{nextType : 0, xPos : 1.29, yPos : 0.3},{nextType : 0, xPos : 1.38, yPos : 0.3},
	{nextType : -2, waitTime : 3},
	{nextType : 0, xPos : -0.1, yPos : 0.3}, {nextType : 0, xPos : -0.20, yPos : 0.3},{nextType : 0, xPos : -0.29, yPos : 0.3},{nextType : 0, xPos : -0.38, yPos : 0.3},
	{nextType : -1, maxEnemies : 0},

	//tons of different shit
	{nextType : -2, waitTime : 5},
	{nextType : -1, maxEnemies : 12},
	{nextType : 0, xPos : 1.1, yPos : 0.4}, {nextType : 2, xPos : 1.3, yPos : 0.2}, {nextType : 0, xPos : 1.5, yPos : 0.4}, {nextType : 2, xPos : 1.7, yPos : 0.2},
	{nextType : 0, xPos : -0.1, yPos : 0.2}, {nextType : 2, xPos : -0.3, yPos : 0.4}, {nextType : 0, xPos : -0.5, yPos : 0.2}, {nextType : 0, xPos : -0.7, yPos : 0.4},

	{nextType : 6, xPos : 0.5, yPos : -0.1},
	{nextType : -2, waitTime : 5},
	{nextType : 1, xPos : 0.3, yPos : -0.1}, {nextType : 1, xPos : 0.6, yPos : -0.1},
	{nextType : 3, xPos : -0.1, yPos : 0.2}, {nextType : 3, xPos : -0.1, yPos : 0.7},
	{nextType : -1, maxEnemies : 0},


	{nextType : -1, maxEnemies : 10},
	{nextType : 3, xPos : 0.3, yPos : -0.1}, 
	{nextType : 0, xPos : -0.3, yPos : 0.1}, {nextType : 0, xPos : -0.3, yPos : 0.4}, 
	{nextType : 0, xPos : 1.3, yPos : 0.1}, {nextType : 0, xPos : 1.3, yPos : 0.2}, 

	{nextType : 2, xPos : -0.2, yPos : 0.4}, {nextType : 2, xPos : -0.5, yPos : 0.4}, {nextType : 2, xPos : 1.2, yPos : 0.4}, {nextType : 2, xPos : 1.7, yPos : 0.4}, 

	{nextType : -1, maxEnemies : 0}, {nextType : -2, waitTime : 3},

	{nextType : -1, maxEnemies : 6},

	{nextType : 1, xPos : 0.3, yPos : -0.1},
	{nextType : -2, waitTime : 4},
	{nextType : 1, xPos : 0.6, yPos : -0.2},
	{nextType : -2, waitTime : 4},
	{nextType : 1, xPos : 0.9, yPos : -0.2},


	{nextType : -1, maxEnemies : 0},
	//rain of squirrels
	{nextType : -2, waitTime : 5},
	{nextType : -1, maxEnemies : 7},
	{nextType : 1, xPos : 0.5, yPos : -0.1}, {nextType : 1, xPos : 0.5, yPos : -0.3}, {nextType : 1, xPos : 0.7, yPos : -0.3}, 
	{nextType : 1, xPos : 0.2, yPos : -0.4}, {nextType : 1, xPos : 0.1, yPos : -0.2}, {nextType : 1, xPos : 0.9, yPos : -0.5},  
	//boss
	{nextType : -1, maxEnemies : 0},
	{nextType : -2, waitTime : 4},
	{nextType : -3, dialog : "??? : Pher gurr! ", speaker : "catpig"},
	{nextType : -3, dialog : "Rainbow Dash : What is that noise? ", speaker : "player"},
	{nextType : -3, dialog : "CatPigThing : Hump de dump! ", speaker : "catpig"},
	{nextType : -3, dialog : "Rainbow Dash : Is it trying to speak? ", speaker : "player"},
	{nextType : -3, dialog : "CatPigThing : Meoink!!!!", speaker : "catpig"},
	{nextType : 7, xPos : 0.5, yPos : -0.1},
	{nextType : -2, waitTime : 3},
	{nextType : -3, dialog : "Rainbow Dash : Looks like this \n little piggy...", speaker : "player"},
	{nextType : -3, dialog : "Rainbow Dash : won't be going to \n the market.", speaker : "player"},
	{nextType : -2, waitTime : 5}
],



//level2:
[
	//initialize background
	{nextType : -4, backgroundb : "level2"},

	//initialize nr of enemies and wait time
	{nextType : -1, maxEnemies : 8},{nextType : -2, waitTime : 3},

	{nextType : -3, dialog : "Rainbow Dash : Oooh, I hate rain! ", speaker : "player"},


	//rain
	{nextType : 4, xPos : 0.3, yPos : -0.1}, {nextType : 4, xPos : 0.4, yPos : -0.2}, {nextType : 4, xPos : 0.5, yPos : -0.1},
	{nextType : 4, xPos : 0.8, yPos : -0.5}, {nextType : 4, xPos : 0.6, yPos : -0.2}, {nextType : 4, xPos : 0.7, yPos : -0.3}, 

	//seals
	{nextType : 5, xPos : 1.1, yPos : 0.1}, {nextType : 5, xPos : 1.3, yPos : 0.5}, {nextType : 5, xPos : 1.6, yPos : 0.7}, 
	{nextType : 5, xPos : -0.1, yPos : 0.3}, {nextType : 5, xPos : -0.5, yPos : 0.1},  {nextType : 5, xPos : -0.6, yPos : 0.5}, 

	//squirrel
	{nextType : 1, xPos : 0.3, yPos : -0.5},{nextType : 1, xPos : 0.8, yPos : -0.1}, 

	//finish all enemies
	{nextType : -1, maxEnemies : 0}, {nextType : -2, waitTime : 3},

	{nextType : -1, maxEnemies : 9}, 

	{nextType : 4, xPos : 0.1, yPos : -0.1},{nextType : 1, xPos : 0.3, yPos : -0.5},{nextType : 5, xPos : 1.1, yPos : 0.1}, 
	{nextType : 5, xPos : 1.3, yPos : 0.5}, {nextType : 4, xPos : 0.2, yPos : -0.2}, {nextType : 4, xPos : 0.9, yPos : -0.1},
	{nextType : 4, xPos : 0.3, yPos : -0.5}, {nextType : 4, xPos : 0.4, yPos : -0.2}, {nextType : 4, xPos : 0.7, yPos : -0.3},
	
	{nextType : 3, xPos : 0.3, yPos : -0.3}, {nextType : 3, xPos : 0.6, yPos : 1.4},

	//rain
	{nextType : 4, xPos : 0.3, yPos : -0.1}, {nextType : 4, xPos : 0.6, yPos : -0.2}, {nextType : 4, xPos : 0.9, yPos : -0.1},

	{nextType : 1, xPos : 0.1, yPos : -0.3}, {nextType : 5, xPos : -0.2, yPos : 0.6}, {nextType : 5, xPos : 1.2, yPos : 0.3},
	{nextType : 0, xPos : -0.1, yPos : 0.3}, {nextType : 0, xPos : -0.5, yPos : 0.3}, {nextType : 0, xPos : -0.7, yPos : 0.3},

	{nextType : 4, xPos : 0.2, yPos : -0.1}, {nextType : 4, xPos : 0.7, yPos : -0.2}, {nextType : 4, xPos : 0.3, yPos : -0.1},

	{nextType : 2, xPos : 1.1, yPos : 0.38}, {nextType : 2, xPos : 1.4, yPos : 0.38}, {nextType : 2, xPos : 1.6, yPos : 0.38},

	{nextType : -1, maxEnemies : 0},
	{nextType : -2, waitTime : 3},
	{nextType : -1, maxEnemies : 9},

	{nextType : 4, xPos : 0.3, yPos : -0.1}, {nextType : 4, xPos : 0.6, yPos : -0.2}, {nextType : 4, xPos : 0.9, yPos : -0.1},

	{nextType : 5, xPos : 1.1, yPos : 0.3}, {nextType : 5, xPos : 1.2, yPos : 0.5}, {nextType : 5, xPos : 1.3, yPos : 0.3},
	{nextType : 5, xPos : 1.4, yPos : 0.5}, {nextType : 5, xPos : 1.5, yPos : 0.3}, {nextType : 5, xPos : 1.6, yPos : 0.5},

	{nextType : 2, xPos : -0.1, yPos : 0.4}, {nextType : 2, xPos : -0.4, yPos : 0.4}, {nextType : 2, xPos : -0.6, yPos : 0.4},

	{nextType : 4, xPos : 0.2, yPos : -0.1}, {nextType : 4, xPos : 0.6, yPos : -0.2}, {nextType : 4, xPos : 0.8, yPos : -0.1},

	{nextType : 6, xPos : -0.2, yPos : 0.5}, {nextType : 6, xPos : 1.5, yPos : 0.7}, {nextType : 6, xPos : 0.2, yPos : -0.2},

	{nextType : 4, xPos : 0.2, yPos : -0.1}, {nextType : 4, xPos : 0.7, yPos : -0.2}, {nextType : 4, xPos : 0.3, yPos : -0.1},

	{nextType : 1, xPos : 0.6, yPos : -0.2}, {nextType : 1, xPos : 0.2, yPos : -0.4},

	{nextType : -1, maxEnemies : 0},

	{nextType : -2, waitTime : 3},
	{nextType : -1, maxEnemies : 7},

	{nextType : 4, xPos : 0.3, yPos : -0.1}, {nextType : 4, xPos : 0.6, yPos : -0.2}, {nextType : 4, xPos : 0.9, yPos : -0.1},

	{nextType : 5, xPos : -0.1, yPos : 0.1}, {nextType : 5, xPos : -0.4, yPos : 0.2}, {nextType : 5, xPos : -0.6, yPos : 0.1},
	{nextType : 1, xPos : 0.7, yPos : -0.2}, {nextType : 1, xPos : 0.3, yPos : -0.5},

	{nextType : -1,maxEnemies : 0},
	//wave of greedapede
	{nextType : -1, maxEnemies : 6},
	{nextType : 3, xPos : 0.3, yPos : -0.1}, {nextType : 3, xPos : 0.6, yPos : -0.1},
	{nextType : 3, xPos : -0.1, yPos : 0.3}, {nextType : 3, xPos : 1.1, yPos : 0.7},
	{nextType : 3, xPos : 0.1, yPos : -0.3}, {nextType : 3, xPos : 0.9, yPos : 1.1},

	//boss
	{nextType : -1, maxEnemies : 0},
	{nextType : -2, waitTime : 6},
	{nextType : -3, dialog : "??? : Who disturbs my slumber?", speaker : "kingGreda"},
	{nextType : -3, dialog : "Rainbow Dash :  This dashing pony!", speaker : "player"},
	{nextType : -3, dialog : "King Greda : I am King Gredapedus \n the Third! You will pay your respects \n, young one.", speaker : "kingGreda"},
	{nextType : -3, dialog : "Rainbow Dash : Pfft, like hell I will. ", speaker : "player"},
	{nextType : -3, dialog : "Rainbow Dash : Then I'll make you \n respect my authority! ", speaker : "kingGreda"},
	{nextType : -3, dialog : "Rainbow Dash : I would like to see \n you try! ", speaker : "player"},
	{nextType : 8, xPos : 0.5, yPos : -0.1},
	{nextType : -2, waitTime : 3},
	{nextType : -3, dialog : "Rainbow Dash : He was all bark. ", speaker : "player"},
	{nextType : -2, waitTime : 5}

],

//level 3
[
	{nextType : -4, backgroundb : "level3"},

	//initialize nr of enemies and wait time
	{nextType : -1, maxEnemies : 8},{nextType : -2, waitTime : 3},



	
	{nextType : 2, xPos : 1.1, yPos : 0.3, ghost : true},
	{nextType : -3, dialog : "??? : Look at what you've done! \n You've killed all of my subjects. \n All of my friends. ", speaker : "patMystery"},
	{nextType : -3, dialog : "??? : Did it make you feel good, \n Slaughtering those innocent critters? ", speaker : "patMystery"},
	{nextType : -3, dialog : "??? : WELL DID IT!? \n YOU BLOODY MONSTER!! ", speaker : "patMystery"},
	{nextType : -3, dialog : "??? : Doesn't matter though...", speaker : "patMystery"},
	{nextType : -3, dialog : "??? : You will be judged by the ones \n you killed.", speaker : "patMystery"},

	{nextType : -2, waitTime : 3},
	{nextType : -1, maxEnemies : 8},
	{nextType : 0, xPos : 1.1, yPos : 0.3, ghost : true}, {nextType : 0, xPos : 1.20, yPos : 0.3, ghost : true},{nextType : 0, xPos : 1.29, yPos : 0.3, ghost : true},{nextType : 0, xPos : 1.38, yPos : 0.3, ghost : true},
	{nextType : -2, waitTime : 3},
	{nextType : 0, xPos : -0.1, yPos : 0.3, ghost : true}, {nextType : 0, xPos : -0.20, yPos : 0.3, ghost : true},{nextType : 0, xPos : -0.29, yPos : 0.3, ghost : true},{nextType : 0, xPos : -0.38, yPos : 0.3, ghost : true},
	{nextType : -1, maxEnemies : 0},

		//wave of squirrels
	{nextType : -1, maxEnemies : 2},
	{nextType : 1, xPos : 0.2, yPos : -0.1, ghost : true}, {nextType : 1, xPos : 0.25, yPos : -0.15, ghost : true},
	{nextType : -1, maxEnemies : 0},

	//wave of bunnies
	{nextType : -1, maxEnemies : 8},
	{nextType : 0, xPos : 1.1, yPos : 0.3, ghost : true}, {nextType : 0, xPos : 1.20, yPos : 0.3, ghost : true},{nextType : 0, xPos : 1.29, yPos : 0.3, ghost : true},{nextType : 0, xPos : 1.38, yPos : 0.3, ghost : true},
	{nextType : -2, waitTime : 3},
	{nextType : 0, xPos : -0.1, yPos : 0.3, ghost : true}, {nextType : 0, xPos : -0.20, yPos : 0.3, ghost : true},{nextType : 0, xPos : -0.29, yPos : 0.3, ghost : true},{nextType : 0, xPos : -0.38, yPos : 0.3, ghost : true},
	{nextType : -1, maxEnemies : 0},

	//tons of different shit
	{nextType : -2, waitTime : 5},
	{nextType : -1, maxEnemies : 12},
	{nextType : 0, xPos : 1.1, yPos : 0.4, ghost : true}, {nextType : 2, xPos : 1.3, yPos : 0.2, ghost : true}, {nextType : 0, xPos : 1.5, yPos : 0.4, ghost : true}, {nextType : 2, xPos : 1.7, yPos : 0.2, ghost : true},
	{nextType : 0, xPos : -0.1, yPos : 0.2, ghost : true}, {nextType : 2, xPos : -0.3, yPos : 0.4, ghost : true}, {nextType : 0, xPos : -0.5, yPos : 0.2, ghost : true}, {nextType : 0, xPos : -0.7, yPos : 0.4, ghost : true},

	{nextType : 6, xPos : 0.5, yPos : -0.1, ghost : true},
	{nextType : -2, waitTime : 5},
	{nextType : 1, xPos : 0.3, yPos : -0.1, ghost : true}, {nextType : 1, xPos : 0.6, yPos : -0.1, ghost : true},
	{nextType : 3, xPos : -0.1, yPos : 0.2, ghost : true}, {nextType : 3, xPos : -0.1, yPos : 0.7, ghost : true},
	{nextType : -1, maxEnemies : 0},


	{nextType : -1, maxEnemies : 10},
	{nextType : 3, xPos : 0.3, yPos : -0.1, ghost : true}, 
	{nextType : 0, xPos : -0.3, yPos : 0.1, ghost : true}, {nextType : 0, xPos : -0.3, yPos : 0.4, ghost : true}, 
	{nextType : 0, xPos : 1.3, yPos : 0.1, ghost : true}, {nextType : 0, xPos : 1.3, yPos : 0.2, ghost : true}, 

	{nextType : 2, xPos : -0.2, yPos : 0.4, ghost : true}, {nextType : 2, xPos : -0.5, yPos : 0.4, ghost : true}, {nextType : 2, xPos : 1.2, yPos : 0.4, ghost : true}, {nextType : 2, xPos : 1.7, yPos : 0.4, ghost : true}, 

	{nextType : -1, maxEnemies : 0}, {nextType : -2, waitTime : 3},
	{nextType : -1, maxEnemies : 10},

	{nextType : 2, xPos : 1.4, yPos : 0.3, ghost : true}, {nextType : 2, xPos : 1.2, yPos : 0.4, ghost : true}, {nextType : 0, xPos : 1.6, yPos : 0.2, ghost : true},
	{nextType : 0, xPos : -0.3, yPos : 0.1, ghost : true}, {nextType : 2, xPos : -0.1, yPos : 0.35, ghost : true}, {nextType : 2, xPos : -0.5, yPos : 0.4, ghost : true},
	{nextType : -2, waitTime : 5},
	{nextType : 6, xPos : 0.3, yPos : -0.2, ghost : true}, {nextType : 6, xPos : 0.7, yPos : -0.3, ghost : true}, {nextType : 6, xPos : 0.5, yPos : 1.1, ghost : true},

	//finish all enemies
	{nextType : -1, maxEnemies : 0}, {nextType : -2, waitTime : 3},

	{nextType : -1, maxEnemies : 9}, 

	{nextType : 1, xPos : 0.1, yPos : -0.3, ghost : true}, {nextType : 5, xPos : -0.2, yPos : 0.6, ghost : true}, {nextType : 5, xPos : 1.2, yPos : 0.3, ghost : true},
	{nextType : 0, xPos : -0.1, yPos : 0.3, ghost : true}, {nextType : 0, xPos : -0.5, yPos : 0.3, ghost : true}, {nextType : 0, xPos : -0.7, yPos : 0.3, ghost : true},

	{nextType : 2, xPos : 1.1, yPos : 0.38, ghost : true}, {nextType : 2, xPos : 1.4, yPos : 0.38, ghost : true}, {nextType : 2, xPos : 1.6, yPos : 0.38, ghost : true},

	{nextType : 1, xPos : 0.1, yPos : -0.3, ghost : true}, {nextType : 5, xPos : -0.2, yPos : 0.6, ghost : true}, {nextType : 5, xPos : 1.2, yPos : 0.3, ghost : true},
	{nextType : 0, xPos : -0.1, yPos : 0.3, ghost : true}, {nextType : 0, xPos : -0.5, yPos : 0.3, ghost : true}, {nextType : 0, xPos : -0.7, yPos : 0.3, ghost : true},

	
	{nextType : -1, maxEnemies : 0},
	{nextType : -2, waitTime : 3},
	{nextType : -1, maxEnemies : 9},



	{nextType : 5, xPos : 1.1, yPos : 0.3, ghost : true}, {nextType : 5, xPos : 1.2, yPos : 0.5, ghost : true}, {nextType : 5, xPos : 1.3, yPos : 0.3, ghost : true},
	{nextType : 5, xPos : 1.4, yPos : 0.5, ghost : true}, {nextType : 5, xPos : 1.5, yPos : 0.3, ghost : true}, {nextType : 5, xPos : 1.6, yPos : 0.5, ghost : true},

	{nextType : 2, xPos : -0.1, yPos : 0.4, ghost : true}, {nextType : 2, xPos : -0.4, yPos : 0.4, ghost : true}, {nextType : 2, xPos : -0.6, yPos : 0.4, ghost : true},

	

	{nextType : 6, xPos : -0.2, yPos : 0.5, ghost : true}, {nextType : 6, xPos : 1.5, yPos : 0.7, ghost : true}, {nextType : 6, xPos : 0.2, yPos : -0.2, ghost : true},

	{nextType : 1, xPos : 0.6, yPos : -0.2, ghost : true}, {nextType : 1, xPos : 0.2, yPos : -0.4, ghost : true},

	{nextType : -1, maxEnemies : 0},

	{nextType : -2, waitTime : 3},

	{nextType : -1, maxEnemies : 6},
	{nextType : 1, xPos : 0.5, yPos : -0.1, ghost : true}, {nextType : 1, xPos : 0.5, yPos : -0.3, ghost : true}, {nextType : 1, xPos : 0.7, yPos : -0.3, ghost : true}, 
	{nextType : 1, xPos : 0.2, yPos : -0.4, ghost : true}, {nextType : 1, xPos : 0.1, yPos : -0.2, ghost : true}, {nextType : 1, xPos : 0.9, yPos : -0.6, ghost : true},

	//final boss
	{nextType : -1, maxEnemies : 0},
	{nextType : -2, waitTime : 6},
	{nextType : -3, dialog : "??? : Why have you come here? ", speaker : "patMystery"},
	{nextType : -3, dialog : "Rainbow Dash : To conquer this land \n in the name of Rainbow Dash! ", speaker : "player"},
	{nextType : -3, dialog : "??? : You killed everyone for your \n own glory? ", speaker : "patMystery"},
	{nextType : -3, dialog : "Rainbow Dash : Less glory, more fun.", speaker : "player"},
	{nextType : -3, dialog : "Katrick Perr : Well your fun ends here! \n I, Katrick Perr, will stop \n your murderous rampage!", speaker : "pat"},
	{nextType : -3, dialog : "Rainbow Dash : Come on then!!", speaker : "player"},
	{nextType : 9, xPos : 0.5, yPos : -0.1},
	{nextType : -3, dialog : "Katrick Perr : Impossible...", speaker : "pat"},
	{nextType : -2, waitTime : 3},
	{nextType : -3, dialog : "Rainbow Dash : Your land belongs to \n me now!", speaker : "player"},
	{nextType : -3, dialog : "Katrick Perr : As my final act \n I force you into an infinite loop!", speaker : "pat"},
	{nextType : -2, waitTime : 8},
	{nextType : -5, level : 1},





],

],
getLevel : function(){
	return this._levels[levelManager.getLevelNr()];
	//return this._test;
}
}