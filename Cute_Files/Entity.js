// ======
// ENTITY
// ======
/*

Provides a set of common functions which can be "inherited" by all other
game Entities.

JavaScript's prototype-based inheritance system is unusual, and requires 
some care in use. In particular, this "base" should only provide shared
functions... shared data properties are potentially quite confusing.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


function Entity() {

/*
    // Diagnostics to check inheritance stuff
    this._entityProperty = true;
    console.dir(this);
*/
};



Entity.prototype.die = function (){
    this._isDying = true;
    this._deadPosX = this.cx;
    this._deadPosY = this.cy;
    //spila death sound
	soundManager.dieSound();

    spatialManager.unregister(this);
};

Entity.prototype._updateDeath = function (du) {
    var DEATH_RATE = 2 * SECS_TO_NOMINALS;
    var currTime = this.deathTimer / DEATH_RATE;
    var posX = easing.out_quintic(currTime, this._deadPosX, 60, 1);
    var posY = easing.back_in_quartic(currTime, this._deadPosY, 60, 1);
    this.deathTimer += du;
    this.cx = posX;
    this.cy = posY;
    if(currTime > 1){
        //not dying anymore, feel free to go into update loop and kill me.
        this._isDying = false;
    }
};

/////////////////////////////////////////////////////////////////////////
//// EKKI FOKKA Í ÞESSU FALLI!!!!									 ////
/////////////////////////////////////////////////////////////////////////
Entity.prototype.EnemyFire = function (begin, max, divide, rotate, sprite) {
    var launchDist = this.getRadius() * 1.2;
    var circ = 2*Math.PI;
	
    for(var i = begin; i < max; i++) {
        if(Math.random() < 0.5) {
            this.bullet_sprite = g_sprites.bullet;
        }
        else {
            this.bullet_sprite = g_sprites.bullet2;
        }
        var dX = +Math.sin(i*circ/divide+rotate);
        var dY = -Math.cos(i*circ/divide+rotate);
        entityManager.fireBullet(
            this.cx + dX * launchDist, this.cy + dY * launchDist,
            1.3 *dX,1.3 *dY,
            0, 20*0.25, this.bullet_sprite);
    }
    
};

Entity.prototype.specialFire = function(x,y,vx,vy)
{
    entityManager.fireBullet(
    x, y, vx, vy,
    0, 20*0.25, this.bullet_sprite);
}

Entity.prototype.powerDrop = function() {
	var outsideRand = Math.random();

	if(outsideRand < 0.3) {
		inUse = true;

		var rand = Math.random() * 2;
		var sprite = null;
		
		if(rand < 0.5) {
			sprite = g_sprites.FinnTheHuman;
			powerSprite = 'Finn';
		}
		else if(rand > 0.5 && rand < 1) {
			sprite = g_sprites.JakeTheDog;
			powerSprite = 'Jake';
		}
		else if(rand > 1 && rand < 1.5) {
			sprite = g_sprites.LumpySpacePrincess;
			powerSprite = 'Lumpy';
		}
		else if(rand > 1.5 && rand < 2) {
			sprite = g_sprites.Marceline;
			powerSprite = 'Marceline';
		}
			
		if(sprite !== null) {	
			entityManager.generateDrop({
				cx: this.cx,
				cy: this.cy,
				sprite: sprite
			});
		}
	}
};

Entity.prototype.bossDrop = function() {
	//juicyStuff._princessBubble = true;
	powerSprite = 'Bubble';
	entityManager.generateDrop({
		cx: this.cx,
		cy: this.cy,
		sprite: g_sprites.PrincessBubbleGum
	});
};

Entity.prototype.setup = function (descr) {

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }
    
    // Get my (unique) spatial ID
    this._spatialID = spatialManager.getNewSpatialID();
    
    // I am not dead yet!
    this._isDeadNow = false;

    //how long have I been dying?
    this.deathTimer = 0;
};

Entity.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
};

Entity.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
};

Entity.prototype.getRadius = function () {
    return 0;
};

Entity.prototype.getSpatialID = function () {
    return this._spatialID;
};

Entity.prototype.kill = function () {
    this._isDeadNow = true;
};

Entity.prototype.findHitEntity = function () {
    var pos = this.getPos();
    return spatialManager.findEntityInRange(
        pos.posX, pos.posY, this.getRadius()
    );
};

// This is just little "convenience wrapper"
Entity.prototype.isColliding = function () {
    return this.findHitEntity();
};

Entity.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, g_canvas.width);
    this.cy = util.wrapRange(this.cy, 0, g_canvas.height);
};

Entity.prototype.renderHP = function (ctx, color) {
    ctx.save();

    util.fillText(ctx, 20, 40, "bold 20px Arial", 'HP: ', 'black');
    util.fillBox(ctx,60,28,500*this.hp_ratio,12,color);

    ctx.restore();
};