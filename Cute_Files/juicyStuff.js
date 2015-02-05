//  ===========
//	JUICY STUFF
//  ===========

"use strict"

var juicyStuff = {

_shield : false,
_firePowerTime : 3 * SECS_TO_NOMINALS,
_fireRateTime : 3 * SECS_TO_NOMINALS,
_firePowerDrop : false,
_fireRateDrop : false,

shield : function(lifespan) {
	entityManager.generateShield({
		cx: entityManager._ships[0].getPos().posX,
		cy: entityManager._ships[0].getPos().posY,
		Lifespan : lifespan
	});
	this._shield = true;
},


firePower : function(du) {
	this._firePowerTime -= du/2;

	if(this._firePowerTime > 0) {
		entityManager._ships[0].amount = 10;
	}
	else if(this._firePowerTime < 0) {
		this._firePowerDrop = false;
		this._firePowerTime = 3 * SECS_TO_NOMINALS;
		entityManager._ships[0].amount = 4;
		inUse = false;
	}
},

fireRate : function(du) {
	this._fireRateTime -= du/2;

	if(this._fireRateTime > 0) {
		Ship.prototype.fireRate = 0.1 * SECS_TO_NOMINALS;
	}
	else if(this._fireRateTime < 0) {
		this._fireRateDrop = false;
		this._fireRateTime = 3 * SECS_TO_NOMINALS;
		Ship.prototype.fireRate = 0.5 * SECS_TO_NOMINALS;
		inUse = false;
	}
},

update : function(du) {	
	//firepower
	if(this._firePowerDrop)
		this.firePower(du);
	//firerate
	if(this._fireRateDrop)
		this.fireRate(du);

	this._shield = entityManager.hasShield();
},

extraDude : function() {
	entityManager.generateExtraDude({
        cx : (g_sprites.extraDude.width/2)-10,
        cy : 600,
		rotation : -1.57
    });
},

getRandomPowerUp : function() {
	switch(powerSprite) {
		case "Finn":
			this._fireRateDrop = true;
			break;
		case "Jake":
			this._firePowerDrop = true;
			break;
		case "Lumpy":
			this.shield(3 * SECS_TO_NOMINALS);
			break;
		case "Bubble":
			if(lives !== 5)
				lives++
			break;
		case "Marceline":
			this.extraDude();
			break;
	}
},

clearPowerUps : function() {
	this._firePowerDrop = false;
	this._fireRateDrop = false;
	Shield.prototype.clear();
	extraDude.prototype.clear();
}
}