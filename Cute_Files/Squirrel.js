// ====
// Squirrel
//
// Can only appear between 50 and 550 in x-coords
//
// Appear above canvas, not below, so y-coords only negative numbers
//
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Squirrel(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.randomisePosition();
    this.randomiseVelocity();

    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.squirrel;
    this.scale  = this.scale  || 1;

};

Squirrel.prototype = new Entity();

Squirrel.prototype.randomisePosition = function () {
    
    this.cx = this.cx || util.randRange(50, 550);
    this.cy = this.cy || -20;
    this.rotation = this.rotation || 0;
};

Squirrel.prototype.time = 1800 / NOMINAL_UPDATE_INTERVAL;
Squirrel.prototype.reset_time = 1800 / NOMINAL_UPDATE_INTERVAL;
Squirrel.prototype.turn_max = 5;
Squirrel.prototype.hp = 10;


Squirrel.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 20,
        MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velX = 1;
    this.velY = 3;

    var MIN_ROT_SPEED = 0.5,
        MAX_ROT_SPEED = 2.5;

    this.velRot = 0.02;
};

Squirrel.prototype.update = function (du) {

    if(this._isDying){
        this._updateDeath(du);
        return;
    }

    spatialManager.unregister(this);
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.time -= du;

    if(this.checkEdge(du)) {
        return entityManager.KILL_ME_NOW;
    }

    this.cx += this.velX*du;
    this.cy += this.velY*du;

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) {
            canTakeHit.call(hitEntity); 
        }
    }

    this.rotation += 1 * this.velRot;
    this.rotation = util.wrapRange(this.rotation,
                                   0, consts.FULL_CIRCLE);

    if(this.time < 1) {
        this.time = this.reset_time;
        this.EnemyFire(0,9, 9, 0, g_sprites.bullet);
    }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
};

Squirrel.prototype.checkEdge = function(du) {
    var next_cx, next_cy;
    next_cx = this.cx + this.velX*du;
    next_cy = this.cy + this.velY*du;

    if(this.canKill) {
        if(this.turn_max > 0) {
            if(next_cy < 0+this.getRadius() || next_cy > g_canvas.height-this.getRadius()) {
                this.velY *= -1;
                this.turn_max -= 1;
            }
        }
        else {
            if(next_cy < -this.getRadius() || next_cy > g_canvas.height+this.getRadius()) {
                return true;
            }
        }
    }
    else {
        if(next_cy > this.getRadius() && next_cy < g_canvas.height-this.getRadius()) {
            this.canKill = true;
        }
    }
    if(next_cx < this.getRadius() || next_cx > g_canvas.width-this.getRadius()) {
        this.velX *= -1;
    }
};

Squirrel.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = 0.35;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

Squirrel.prototype.takeLazerHit = function () {
    this.hp -= 5;
    score += 100;
    render_score(score_ctx);
    if(this.hp <= 0)
    {
        this.kill();
	    this.die();
    	this.powerDrop();
    }
};

Squirrel.prototype.getRadius = function () {
    return this.sprite.scale * (this.sprite.width / 2) * 0.9;
};