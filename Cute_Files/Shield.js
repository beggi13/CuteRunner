// ======
// SHIELD
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Shield(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.shield;
    this.scale  = this.scale  || 1;
	
};

Shield.prototype = new Entity();

Shield.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.Lifespan -= du;
    if(this.Lifespan < 0) {
        juicyStuff._shield = false;
		inUse = false;
        return entityManager.KILL_ME_NOW;
    }

    var pos = entityManager._ships[0].getPos();
	this.cx = pos.posX;
    this.cy = pos.posY;
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);

};

Shield.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

Shield.prototype.takeBulletHit = function () {
    //Nothing happens - shield kills bullets
};

Shield.prototype.render = function (ctx) {
	this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
}

Shield.prototype.clear = function() {
	return entityManager.KILL_ME_NOW;
}