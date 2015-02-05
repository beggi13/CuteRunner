var menuManager = {

_options : ["0. Resume level" ,"1. Level 1", "2. Level 2", "3. Level 3", "4. Restart Level", "5. Mute all", "6. Mute music"],

_detectClick : function() {

	if(eatKey(KEY_0)){
		this.handleMenuPick(0);
		return true;
	}
	if(eatKey(KEY_1)){
		this.handleMenuPick(1);
		return true;
	}
	if(eatKey(KEY_2)){
		this.handleMenuPick(2);
		return true;
	}
	if(eatKey(KEY_3)){
		this.handleMenuPick(3);
		return true;
	}
	if(eatKey(KEY_4)) {
		this.handleMenuPick(4);
		return true;
	}
	if(eatKey(KEY_5))
		this.handleMenuPick(5);
		
	if(eatKey(KEY_6))
		this.handleMenuPick(6);

	if(g_mouse_clicking){
			
		// for clicking-mechanism-thingy-stuff
		var height = g_canvas.height;
		var width = g_canvas.width;
		var boxHeight = height/10;
		var boxWidth = width/2;
		var space = 5;
		
		for(var i = 0; i < this._options.length; ++i) {
			if  (util.isClicked(width/4, height/8 + i*(boxHeight+space), boxWidth, boxHeight)) {
					this.handleMenuPick(i);
					return true;
			}
		}
	}

	return false;
},
handleMenuPick : function (nr){
	if(!gameIsOver)	{
		switch(nr){
			case 0 :
				break;
			case 1:
			case 2:
			case 3:
				levelManager.changeLevel(nr);
				score = 0;
				break;
			case 4:
				gameFlow.restartLevel(levelManager.getLevelNr());
				break;
			case 5:
				soundManager._mute = !soundManager._mute;
				break;
			case 6:
				soundManager._musicSilence = !soundManager._musicSilence;
				break;
		}
	}
	else{
		gameFlow.restartLevel(levelManager.getLevelNr());
	}
},

update: function(du) {
	var inMenu = gameFlow.inMenu() && !this._detectClick();
	gameFlow.toggleMenu(inMenu);
},


render: function(ctx){
	if(!gameFlow.inMenu()) return;
	//not in menu, dont render anything

	var height = g_canvas.height;
	var width = g_canvas.width;
	var seethrough = "rgba(190, 190, 190, 0.5)";
	util.fillBox(ctx, 0, 0, width, height, seethrough);

	var menuBoxes = "rgb(190, 120, 170)";
	var menuText = "rgb(50, 230, 110)";
	var boxHeight = height/10;
	var boxWidth = width/2;
	var space = 5;
	for(var i = 0; i<this._options.length; i++){
		util.fillBox(ctx, width/4, height/8 + i*(boxHeight+space), boxWidth, boxHeight, menuBoxes);
		util.fillText(ctx, width/4+space, (height/8 +boxHeight/2) + i * (boxHeight + space), null, this._options[i], menuText);
	}
	if(lives === 0)
	{
		util.fillText(ctx, 5, 300, 'bold 92px Arial', 'GAME OVER!', 'black');
		util.fillText(ctx, 250, 500, 'bold 20px Arial', 'Hit 1-6 to restart level', 'orange');
	}
}

}