// ======
// KITTEN
//
//
//
// MÁ BARA SETJA Í Y < 0.5
//
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Kitten(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.randomiseVelocity();
    this.randomisePosition();

    this.velRot = 0.00;
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.kitten;
    this.scale  = this.scale  || 1;
};

Kitten.prototype = new Entity();

Kitten.prototype.randomisePosition = function () {
    // Enemy randomisation defaults (if nothing otherwise specified)
    //this.cx = this.cx || Math.random() * g_canvas.width;
    //this.cy = this.cy || Math.random() * g_canvas.height;
    var x;
    if(Math.random() < 0.5) {
        x = -20;
    }
    else {
        x = g_canvas.width + 20;
    }
	
    this.cx = this.cx || x;
    this.cy = this.cy || util.randRange(50,250);
    this.velX *= util.reverseX(this.cx);
    this.rotation = this.rotation || 0;
};

Kitten.prototype.time = 2000 / NOMINAL_UPDATE_INTERVAL;
Kitten.prototype.hp = 10;
Kitten.prototype.reset_time = 2000 / NOMINAL_UPDATE_INTERVAL;
Kitten.prototype.circ = 0;
Kitten.prototype.reverse = false;
Kitten.prototype.canKill = false;
Kitten.prototype.deathTimer = 0;

/*
Kitten.prototype.die = function (){
    this._isDying = true;
    this._deadPos = this.cy;
    //spila death sound

    spatialManager.unregister(this);
};

Kitten.prototype._updateDeath = function (du) {
    var DEATH_RATE = 2 * SECS_TO_NOMINALS;
    var currTime = this.deathTimer / DEATH_RATE;
    var pos = easing.out_back_quartic(currTime, this._deadPos, -60, 1);
    this.deathTimer += du;
    this.cy = pos;
    if(currTime > 1){//this.deathTimer > DEATH_RATE){
        console.log("deathtimer er meiri en death_rate");
        //not dying anymore, feel free to go into update loop and kill me.
        this._isDying = false;
    }
};
*/
Kitten.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 20,
        MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velX = 2;
    this.velY = 1;

    var MIN_ROT_SPEED = 0.5,
        MAX_ROT_SPEED = 2.5;

    this.velRot = 0.02;
};

Kitten.prototype.update = function (du) {

    if(this._isDying){
        this._updateDeath(du);
        return;
    }


    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.time -= du;

    this.checkMove(du);

    this.cx += +this.velX*Math.sin(this.circ)*du;
    this.cy += -this.velY*Math.cos(this.circ)*du;

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

    if(this.time < 1)
    {
        this.time = this.reset_time;
        this.EnemyFire(8,11, 18, 0, g_sprites.bullet);
    }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
};

Kitten.prototype.checkMove = function(du) {
    var next_cx, next_cy;
    this.circ += 0.5/(Math.PI);
    if(this.circ > Math.PI) {
        this.circ = 2/Math.PI;
    }

        
    next_cx = this.cx + this.velX*Math.sin(this.circ)*du;
    next_cy = this.cy - this.velY*Math.cos(this.circ)*du;

    //TODO
    //Heldur sig ekki inn a ef hann er spawnadur fyrir nedan g_canvas.height/2
    if(this.canKill) {
        if(next_cx < 0+this.getRadius() || next_cx > g_canvas.width-this.getRadius()) {
                this.velX *= -1;
        }
    }
    else {
        if(next_cx > this.getRadius() && next_cx < g_canvas.width-this.getRadius()) {
            this.canKill = true;
        }
    }
    if(next_cy < this.getRadius() || next_cy > g_canvas.height-this.getRadius()) {
            this.velY *= -1;
    }
    if(next_cy > g_canvas.height/2) {
            this.velY *= -1;
        }
};

Kitten.prototype.takeLazerHit = function () {
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

Kitten.prototype.render = function (ctx) {

    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = 0.35;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

Kitten.prototype.getRadius = function () {
    return this.sprite.scale * (this.sprite.width / 2) * 0.9;
};