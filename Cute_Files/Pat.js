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
function Pat(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    soundManager.level3.pause()
    soundManager.Pat.play();
    soundManager.Pat.loop = true;

    this.randomisePosition();
    this.randomiseVelocity();
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.pat;
    this._scale  = this.sprite.scale;

};

Pat.prototype = new Entity();

Pat.prototype.randomisePosition = function () {
    this.cx = this.cx || 300;
    this.cy = this.cy || -50;
    this.rotation = 1;
};

Pat.prototype.position = 2;
Pat.prototype.speak = true;
Pat.prototype.time = 400 / NOMINAL_UPDATE_INTERVAL;
Pat.prototype.time2 = 400 / NOMINAL_UPDATE_INTERVAL;
Pat.prototype.phase1 = 15000 / NOMINAL_UPDATE_INTERVAL;
Pat.prototype.phase2 = 15000 / NOMINAL_UPDATE_INTERVAL;
Pat.prototype.hp = 1400;
Pat.prototype.reset_hp = Pat.prototype.hp;
Pat.prototype.optimalY = 180;


Pat.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 20,
        MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velY = 0.4;
    this.velX = 0.5;

    this.velRot = 0.02;
};


Pat.prototype.update = function (du) {

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
        this.movement(du);

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

Pat.prototype.movement = function(du)
{
    var next_cx = this.cx + this.velX * du;
    
    if(next_cx < this.getRadius() || next_cx > g_canvas.width-this.getRadius())
    {
        this.velX *= -1;
    }

    this.cx += this.velX * du;
}

Pat.prototype.cutscene = function()
{

    gameFlow.toggleDialog(true);
    dialogManager.setDialog("Katrick Perr : NOW I'M REALLY MAD!!!");
    dialogManager.setSpeaker("pat");
    this.speak = false;
}

Pat.prototype.phases = function(du)
{
    if(this.hp_ratio > 0.5)
    {
        this.firstPhases(du);
    }
    else
    {
        if(this.speak) this.cutscene();


        this.finalPhases(du);
    }
}

Pat.prototype.firstPhases = function(du)
{

    if(this.phase1 > 1) {    
        if(this.time < 1) {
            this.time = 800 / NOMINAL_UPDATE_INTERVAL;
            this.EnemyFire(0,25, 25, -this.rotation*2);
        }    
        if(this.time2 < 1) {
            this.time2 = 300 / NOMINAL_UPDATE_INTERVAL;
            this.EnemyFire(0,7, 7, 0);
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

            var intervals =  g_canvas.width/4;

            for(var i = 0; i < 4; i++)
            {
                this.specialFire(0, i*intervals+10, 2, 2);
                this.specialFire(g_canvas.width, i*intervals+10, -2, 2);
                this.specialFire(0, i*intervals+10, 2, -2);
                this.specialFire(g_canvas.width, i*intervals+10, -2, -2);
            }
        }    

        this.phase2 -= du;
        if(this.phase2 < 1) 
        {
            this.phase1 = 15000 / NOMINAL_UPDATE_INTERVAL;
        }
    }
};

Pat.prototype.finalPhases = function(du)
{

    if(this.phase1 > 1) {    
        if(this.time < 1) {
            this.time = 350 / NOMINAL_UPDATE_INTERVAL;
            this.EnemyFire(0,5, 5, this.rotation);
            this.EnemyFire(0,5, 5, -this.rotation);
        }    
        if(this.time2 < 1) {
            this.time2 = 600 / NOMINAL_UPDATE_INTERVAL;

            var intervals =  g_canvas.width/4;

            for(var i = 1; i < 4; i++)
            {
                this.specialFire(i*intervals+10, 0, 0, 2);
                this.specialFire(i*intervals+10, g_canvas.height, 0, -2);
                this.specialFire(0, i*intervals+10, 2, 0);
                this.specialFire(g_canvas.width, i*intervals+10, -2,0);
            }

        }

        this.phase1 -= du;
        
        if(this.phase1 < 1) {
            this.phase2 = 15000 / NOMINAL_UPDATE_INTERVAL;
        }
    }
    else if(this.phase2 > 1) {    
        if(this.time < 1) {
            this.time = 900 / NOMINAL_UPDATE_INTERVAL;

            var pos = entityManager._ships[0].getPos();

            this.specialFire(pos.posX,0,0,2);

        }    
        if(this.time2 < 1) {
            this.time2 = 1400 / NOMINAL_UPDATE_INTERVAL;
            this.EnemyFire(0,30, 30, 0);
        }
        this.phase2 -= du;
        if(this.phase2 < 1) 
        {
            this.phase1 = 15000 / NOMINAL_UPDATE_INTERVAL;
        }
    }
};

Pat.prototype.getRadius = function () {
    return this.sprite.scale * (this.sprite.width / 2) * 0.9;
};


Pat.prototype.takeLazerHit = function() {
    if(this.cy > this.optimalY)
    {
    	this.hp -= 5;


        if(this.hp <= 0)
        {
            score += 75837;
            this.kill();
			//Er í Entity.js
			this.bossDrop();
        }
    }
};

Pat.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    this.sprite.scale = this._scale;
    // pass my scale into the sprite, for drawing
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, 0
    );
    this.renderHP(ctx, "red");
    this.sprite.scale = origScale;
};


