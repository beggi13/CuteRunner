// =========
// BOSS NR.1
// =========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Boss1(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.randomisePosition();
    this.randomiseVelocity();
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.Boss1;
    this.scale  = this.scale  || 1;

};

Boss1.prototype = new Entity();

Boss1.prototype.randomisePosition = function () {
    this.cx = this.cx || 300;
    this.cy = this.cy || -50;
    this.rotation = this.rotation || 0;
};

Boss1.prototype.time = 200 / NOMINAL_UPDATE_INTERVAL;
Boss1.prototype.time2 = 1000 / NOMINAL_UPDATE_INTERVAL;
Boss1.prototype.phase1 = 15000 / NOMINAL_UPDATE_INTERVAL;
Boss1.prototype.phase2 = 15000 / NOMINAL_UPDATE_INTERVAL;
Boss1.prototype.hp = 500;
Boss1.prototype.orig_hp = Boss1.prototype.hp;
Boss1.prototype.optimalY = 180;


Boss1.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 20,
        MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velX = 0;
    this.velY = 0.4;

    var MIN_ROT_SPEED = 0.5,
        MAX_ROT_SPEED = 2.5;

    this.velRot = 0.02;
};

Boss1.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }


    this.time -= du;
    this.time2 -= du;

    this.hp_ratio = this.hp / this.orig_hp;

    if(this.cy < this.optimalY)
    {
            this.cy += this.velY * du;
    }
    else
    {

        this.rotation += 1 * this.velRot;
        this.rotation = util.wrapRange(this.rotation,
                                       0, consts.FULL_CIRCLE);

        this.phases(du);

        var hitEntity = this.findHitEntity();
        if (hitEntity) {
            var canTakeHit = hitEntity.takeBulletHit;
            if (canTakeHit) {
                canTakeHit.call(hitEntity); 
            }
        }
    }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);

};

Boss1.prototype.phases = function(du)
{
    if(this.phase1 > 1) {    
        if(this.time < 1) {
            this.time = 200 / NOMINAL_UPDATE_INTERVAL;
            this.EnemyFire(0,5, 5, this.rotation);
        }    
        if(this.time2 < 1) {
            this.time2 = 1000 / NOMINAL_UPDATE_INTERVAL;
            this.EnemyFire(0,16, 16, 0);
        }
        
        this.phase1 -= du;
        
        if(this.phase1 < 1) {
            this.phase2 = 15000 / NOMINAL_UPDATE_INTERVAL;
            console.log("phase 2!");
        }
    }
    else if(this.phase2 > 1) {    
        if(this.time < 1) {
            this.time = 200 / NOMINAL_UPDATE_INTERVAL;
            this.EnemyFire(0,6, 6, -this.rotation);
        }    
        if(this.time2 < 1) {
            this.time2 = 300 / NOMINAL_UPDATE_INTERVAL;
            this.EnemyFire(0,6, 6, this.rotation);
        }
        this.phase2 -= du;
        if(this.phase2 < 1) this.phase1 = 15000 / NOMINAL_UPDATE_INTERVAL;
    }
};

Boss1.prototype.getRadius = function () {
    return this.sprite.scale * (this.sprite.width / 2) * 0.9;
};

Boss1.prototype.takeLazerHit = function() {
    if(this.cy > this.optimalY)
    {
    	this.hp -= 5;
        if(this.hp <= 0)
        {
            score += 13248;
            this.kill();
			this.bossDrop();
        }
    }
};

Boss1.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
    this.renderHP(ctx,"purple");
};
