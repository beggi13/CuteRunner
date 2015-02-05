//  =============
//	SOUND MANAGER
//	=============

"use strict"
var soundManager = {
 _themePlaying : false,
 _mute : false,
 _musicSilence : false,
 
 themeSong : new Audio("sounds/nyan_cat.mp3"),
 level1 : new Audio("sounds/Sunshine lollipops and rainbows.mp3"),
 level2 : new Audio("sounds/rising waters.mp3"),
 level3 : new Audio("sounds/Two Steps From Hell - Photos In Darkness.mp3"),
 Pat : new Audio("sounds/pat.mp3"),
 iDie : new Audio("sounds/dieSound.mp3"),
 spriteDeath : new Audio("sounds/rainbowDie.mp3"),
 bulletMegaSound : new Audio("sounds/bulletFire.ogg"),
 lazerMegaSound : new Audio("sounds/Lazer.mp3"),
 

extraDudeThemeSong : function() {
	if(!this._mute) {
		this.themeSong.play();
		this._themePlaying = true;
		var currLev = levelManager.getLevelNr();
		switch(currLev) {
			case 1:
				this.stopSound(this.level1);
				break;
			case 2:
				this.stopSound(this.level2);
				break;
			case 3:
				this.stopSound(this.level3);	
				break;
		}
	}
},

mute : function() {
	if(eatKey(KEY_MENU))
		this._mute = !this._mute;
},

dieSound : function() {
	if(!this._mute)
		this.iDie.play();
},

stopSound : function(level) {
	level.pause();
},

bulletSound : function() {
	if(!this._mute) {
		this.bulletMegaSound.play();
	}
},

lazerSound : function() {
	if(!this._mute) {
		this.lazerMegaSound.volume = 0.5;
		this.lazerMegaSound.play();
	}
},

death : function() {
	if(!this._mute)
		this.spriteDeath.play();
},

silence : function() {
	this.level1.pause();
	this.level2.pause();
	this.level3.pause();
	this.Pat.pause();
	this.themeSong.pause();
},

playLevelSong : function() {
	var currLev = levelManager.getLevelNr();
	
	if(!this._mute && !this._musicSilence) {
		switch(currLev) {
			case 1:
				this.level1.play();
				break;
			case 2:
				this.level2.play();
				break;
			case 3:
				this.level3.play();
				break;
		}
	}
},

menuStop : function() {
	var currLev = levelManager.getLevelNr();
	if(gameFlow.inMenu()) {	
		switch(currLev) {
			case 1:
				this.level1.pause();
				break;
			case 2:
				this.level2.pause();
				break;
			case 3:
				this.level3.pause();
				break;
		}
	}
	else {
		this.playLevelSong();
	}
},

update : function(du) {
	
	if(eatKey(KEY_MUTE)) {
		this._mute = !this._mute;
		this.playLevelSong();
	}
		
	if(this._mute)
		this.silence();
		
	if(this._musicSilence) {
		this.silence();
	}
		
	this.menuStop();
}

}