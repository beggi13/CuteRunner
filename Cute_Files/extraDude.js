// ==========
// EXTRA DUDE
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function extraDude(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.extraDude;
    this.bullet_sprite = g_sprites.ship_beam;
	soundManager.extraDudeThemeSong();
    // Set normal drawing scale, and warp state off
    this._scale = 1;
};

extraDude.prototype = new Entity();

// Initial, inheritable, default values
extraDude.prototype.launchVel = 5;
extraDude.prototype.fireRate = 500 / NOMINAL_UPDATE_INTERVAL;
extraDude.prototype.amount = 10;
    
extraDude.prototype.update = function (du) {
    
    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    // Handle firing
	this.fireRate -= du;
	if(this.fireRate < 0) {
		this.autoFireLazer();
		this.fireRate = 500 / NOMINAL_UPDATE_INTERVAL;
	}
	
	this.cy -= 1;
	if(this.cy < 0) {
		soundManager._themePlaying = false;
		soundManager.playLevelSong();
		inUse = false;
		return entityManager.KILL_ME_NOW;
	}

    spatialManager.register(this);
};

extraDude.prototype.fireLazer = function (angle, optX, optY) {

    var x = optX || this.cx;
    var y = optY || this.cy;

    var dX = +Math.sin(angle);
    var dY = -Math.cos(angle);
    var launchDist = this.getRadius() * 1.2;
    
    var relVel = this.launchVel;
    var relVelX = dX * relVel;
    var relVelY = dY * relVel;

    entityManager.fireLazer(
        x + dX * launchDist, 
        y + dY * launchDist,
        relVelX, 
        relVelY,
        this.rotation,
        g_sprites.ship_beam.scale*10,  
        g_sprites.ship_beam
    );
};

extraDude.prototype.autoFireLazer = function () {
    for(var i = 1; i <= this.amount; ++i) {
        this.fireLazer(Math.PI / this.amount*2 * i)
    }
};

extraDude.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
    this.sprite.scale = origScale;
};

extraDude.prototype.clear = function() {
	return entityManager.KILL_ME_NOW;
}