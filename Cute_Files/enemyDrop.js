// ===========
// KITTEN DROP
// ===========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function enemyDrop(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite; //|| g_sprites.kitten;
    this.scale  = 0.5;
	this.velY = 5;
};

enemyDrop.prototype = new Entity();

enemyDrop.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }
	
	var nextY = this.cy + 3;
    this.cy += 3;

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.getEnemyDrop;
        if (canTakeHit) {
            canTakeHit.call(hitEntity);
			return entityManager.KILL_ME_NOW;
        }
    }
	
	if(nextY > g_canvas.height) {
		inUse = false;
		return entityManager.KILL_ME_NOW;
	}
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
};

enemyDrop.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = 0.8;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

enemyDrop.prototype.getRadius = function () {
    return this.sprite.scale * (this.sprite.width / 2) * 0.9;
};