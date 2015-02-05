// =====
// BUNNY
// =====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bunny(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.randomiseVelocity();
    this.randomisePosition();
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.bunny;
    this.scale  = this.scale  || 1;

};

Bunny.prototype = new Entity();

Bunny.prototype.randomisePosition = function () {
    // Enemy randomisation defaults (if nothing otherwise specified)
    var x;
    if(Math.random() < 0.5) {
        x  = -20;
	}
    else {
        x = g_canvas.width+20;
    }

    this.cx = this.cx || x;
    this.velX *= util.reverseX(this.cx);
    this.cy = this.cy || util.randRange(60,200);
    this.rotation = this.rotation || 0;
};

Bunny.prototype.hp = 10;
Bunny.prototype.circ = 0;
Bunny.prototype.time = 500 / NOMINAL_UPDATE_INTERVAL;
Bunny.prototype.loop_time = 2000 / NOMINAL_UPDATE_INTERVAL;
Bunny.prototype.circ = 0;
Bunny.prototype.reset_time = 500 / NOMINAL_UPDATE_INTERVAL;
Bunny.prototype.wait_time = 3000 / NOMINAL_UPDATE_INTERVAL;
Bunny.prototype.fire_max = 4;
Bunny.prototype.turn_max = 1;

Bunny.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 20,
        MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velX = 3;
    this.velY = 9;

    var MIN_ROT_SPEED = 0.5,
        MAX_ROT_SPEED = 2.5;

    this.velRot = 0.00;
};

Bunny.prototype.update = function (du) {


    if(this._isDying){
        this._updateDeath(du);
        return;
    }

    spatialManager.unregister(this);
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.time -= du;
    this.loop_time -= du;

    if(this.checkMove(du))
    {
        return entityManager.KILL_ME_NOW;
    }

    this.cx += +this.velX*Math.sin(this.circ)*du;
    this.cy += -this.velY*Math.cos(this.circ)*du;

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) {
            canTakeHit.call(hitEntity); 
        }
    }

    this.fire(du);

    spatialManager.register(this);
};

Bunny.prototype.fire = function(du) {


    if(this.time < 1 && this.fire_max > 0)
    {
        this.EnemyFire(1,2, 2, 0, g_sprites.bullet);
        this.fire_max -= 1;
        this.time = this.reset_time;
    }
    if(this.fire_max < 1)
    {
        this.wait_time -= du;
        if(this.wait_time < 1)
        {
            this.fire_max = 4;
            this.wait_time = 3000 / NOMINAL_UPDATE_INTERVAL;
        }
    }   
};

//checks if the movement is valid
Bunny.prototype.checkMove = function(du) {
    var next_cx, next_cy;
    this.circ += 0.5/(Math.PI);
    
	if(this.circ > Math.PI)
        this.circ = 0.5/(Math.PI);

    next_cx = this.cx + this.velX*Math.sin(this.circ)*du;
    next_cy = this.cy - this.velY*Math.cos(this.circ)*du;

    if(this.canKill) {
        if(this.turn_max > 0) {
            if(next_cx < this.getRadius() || next_cx > g_canvas.width-this.getRadius()) {
                this.velX *= -1;
                this.turn_max -= 1;
            }
        }
        else {
            if(next_cx < -this.getRadius() || next_cx > g_canvas.width+this.getRadius()) {
                return true;
            }
        }
    }
    else {
        if(next_cx > this.getRadius() && next_cx < g_canvas.width-this.getRadius()) {
            this.canKill = true;
        }
    }
};

Bunny.prototype.takeLazerHit = function () {
    this.hp -= 5;
    score += 100;
    if(this.hp <= 0)
    {
        this.kill();
        this.die();
		if(!inUse) {
			this.powerDrop();
			inUse = true;
		}
    }
};

Bunny.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = 0.35;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

Bunny.prototype.getRadius = function () {
    return this.sprite.scale * (this.sprite.width / 2) * 0.9;
};