//press escape for menu
var KEY_MENU = 27; //ASCII code for escape key
var gameFlow = {

//variables, only gameFlow may change
_menu : true,
_game : false,
_dialog : false,
_level : 0,

update : function(){
	if(eatKey(KEY_MENU)){
		this.toggleMenu(!this._menu);
	}
	this._game = !(this._dialog || this._menu);
},

inMenu : function(){
	return this._menu;
},

toggleMenu : function(insideMenu){
	this._menu = insideMenu;
},

toggleGame : function(insideGame){
	this._game = insideGame;
},

inGame : function(){
	return this._game;
},

toggleDialog : function(insideDialog){
	this._dialog = insideDialog;
},

inDialog : function(){
	return this._dialog;
},

endGame : function() {
	lives = 5;
	gameIsOver = true;
	//this._game = false;
	this.toggleMenu(true);
	saveHighScore(score);
	soundManager.silence();
},

restartLevel : function(nr) {
	levelManager.changeLevel(nr);
	score = 0;
	lives = 5;
	gameIsOver = false;
}

}