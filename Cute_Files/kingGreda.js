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
function kingGreda(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.randomisePosition();
    this.randomiseVelocity();
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.kingGreda;
    this._scale  = this.sprite.scale;

};

kingGreda.prototype = new Entity();

kingGreda.prototype.randomisePosition = function () {
    this.cx = this.cx || 300;
    this.cy = this.cy || -50;
    this.rotation = 1;
};

kingGreda.prototype.position = 2;
kingGreda.prototype.time = 400 / NOMINAL_UPDATE_INTERVAL;
kingGreda.prototype.time2 = 400 / NOMINAL_UPDATE_INTERVAL;
kingGreda.prototype.phase1 = 15000 / NOMINAL_UPDATE_INTERVAL;
kingGreda.prototype.phase2 = 15000 / NOMINAL_UPDATE_INTERVAL;
kingGreda.prototype.hp = 1100;
kingGreda.prototype.reset_hp = kingGreda.prototype.hp;
kingGreda.prototype.optimalY = 180;


kingGreda.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 20,
        MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velY = 0.4;

    this.velRot = 0.02;
};

kingGreda.prototype.warp = function () {

    this._isWarping = true;
    this._scaleDirn = -0.6;
    
    // Unregister me from my old posistion
    // ...so that I can't be collided with while warping
    spatialManager.unregister(this);
};

kingGreda.prototype._updateWarp = function (du) {
    
    var SHRINK_RATE = 0.2 / SECS_TO_NOMINALS;
    this._scale += this._scaleDirn * SHRINK_RATE * du;
    
    if (this._scale < 0.2) {
        this.cx =  util.randRange(50,520);
        this._scaleDirn = 0.6;
        
    } else if (this._scale > this.sprite.scale) {
        this._scale = this.sprite.scale;
        this._isWarping = false;
        
        // Reregister me from my old posistion
        // ...so that I can be collided with again
        spatialManager.register(this);
        
    }
};

kingGreda.prototype.update = function (du) {

    // Handle warping
    if (this._isWarping) {
        this._updateWarp(du);
        return;
    }

    spatialManager.unregister(this);

    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.time -= du;
    this.time2 -= du;

    this.hp_ratio = this.hp / this.reset_hp;

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

kingGreda.prototype.phases = function(du)
{
    if(this.phase1 > 1) {
        if(this.time < 1) {
            this.time = 800 / NOMINAL_UPDATE_INTERVAL;
            this.EnemyFire(0,17, 17, 0);
        }    
        if(this.time2 < 1) {
            this.time2 = 300 / NOMINAL_UPDATE_INTERVAL;
            this.EnemyFire(0,7, 7, this.rotation);
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

            var intervals =  g_canvas.width/5;

            for(var i = 0; i < 5; i++)
            {
                this.specialFire(i*intervals+10, 0, 0, 2);
                this.specialFire(0, i*intervals+10, 2, 0);
                this.specialFire(i*intervals+10, g_canvas.height, 0,-2);
            }
        }    
        if(this.time2 < 1) {
            this.time2 = 600 / NOMINAL_UPDATE_INTERVAL;
            this.EnemyFire(0,6, 6, this.rotation);
        }
        this.phase2 -= du;
        if(this.phase2 < 1) 
        {
            this.phase1 = 15000 / NOMINAL_UPDATE_INTERVAL;
            this.warp();
        }
    }
};

kingGreda.prototype.getRadius = function () {
    return this.sprite.scale * (this.sprite.width / 2) * 0.9;
};



kingGreda.prototype.takeLazerHit = function() {
    if(this.cy > this.optimalY)
    {
    	this.hp -= 5;

        if(this.hp <= 0)
        {
            score += 35219;
            this.kill();
			//Er í Entity.js
			this.bossDrop();
        }
    }
};

kingGreda.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    this.sprite.scale = this._scale;
    // pass my scale into the sprite, for drawing
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, 0
    );
    this.renderHP(ctx, "cyan");
    this.sprite.scale = origScale;
};


