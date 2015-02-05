// ==========
// SHIP STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Ship(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.ship;
    this.bullet_sprite = g_sprites.ship_beam;

    // Set normal drawing scale, and warp state off
    this._scale = 0.6;
    this._isWarping = false;
};

Ship.prototype = new Entity();

Ship.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = Ship.prototype.cx;
    this.reset_cy = Ship.prototype.cy;
    this.reset_rotation = this.rotation;
    this.reset_haltTime = Ship.prototype.haltTime;
};

// Initial, inheritable, default values
Ship.prototype.rotation = 0;
Ship.prototype.cx = 300;
Ship.prototype.cy = 550;
Ship.prototype.delay = 40;
Ship.prototype.launchVel = 5;
Ship.prototype.numSubSteps = 1;
Ship.prototype.fireRate = 0.5 * SECS_TO_NOMINALS;
Ship.prototype.amount = 4;
Ship.prototype.haltTime = 1 * SECS_TO_NOMINALS;
Ship.prototype.slowTime = 10 * SECS_TO_NOMINALS;
Ship.prototype.halt = false;

Ship.prototype.KEY_YOLO = keyCode('Y');

Ship.prototype.warp = function () {

    this._isWarping = true;
    this._scaleDirn = -0.6;
    
    // Unregister me from my old posistion
    // ...so that I can't be collided with while warping
    spatialManager.unregister(this);
};

Ship.prototype._updateWarp = function (du) {
    
    var SHRINK_RATE = 3 / SECS_TO_NOMINALS;
    this._scale += this._scaleDirn * SHRINK_RATE * du;
    
    if (this._scale < 0.2) {
		this.die();
        this._scaleDirn = 0.6;
        
    } else if (this._scale > 0.6) {
        this._scale = 0.6;
        this._isWarping = false;
        
        // Reregister me from my old posistion
        // ...so that I can be collided with again
        spatialManager.register(this);
        
    }
};

    
Ship.prototype.update = function (du) {
    
    // Handle warping
    if (this._isWarping) {
        this._updateWarp(du);
        return;
    }

    // Unregister and check for death
    spatialManager.unregister(this);

    this.haltTime -= du;
    if(this.delay !== Ship.prototype.delay) {
        this.slowTime -= du;
        this.sprite = g_sprites.player_water;
    }
    if(this.slowTime < 0) {
        this.delay = Ship.prototype.delay;
        this.slowTime = Ship.prototype.slowTime;
        this.sprite = g_sprites.ship;
    }

    // Perform movement substeps
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }

    // Handle firing
	this.fireRate -= du;
	if(this.fireRate < 0) {
		this.autoFireLazer();
		this.fireRate = Ship.prototype.fireRate;
	}
	
    this.maybeYOLO();

    spatialManager.register(this);
};

Ship.prototype.computeSubStep = function (du) {

    if(this.haltTime < 0 || this._isWarping){
        if(g_useMouse){   
            this.cx += (g_mouseX - this.cx) / this.delay * du;
            this.cy += (g_mouseY - this.cy) / this.delay * du;
        }
        else{
            if(getKey(KEY_UP)) this.cy -= 5 * 40 / this.delay;
            if(getKey(KEY_DOWN)) this.cy += 5 * 40 / this.delay;
            if(getKey(KEY_LEFT)) this.cx -= 5 * 40 / this.delay;
            if(getKey(KEY_RIGHT)) this.cx += 5 * 40 / this.delay;
        }

        var halfWidth = this.sprite.width/2 *0.4;
        var halfHeight = this.sprite.height/2 *0.4;

        var left = this.cx - halfWidth;
        var right = this.cx + halfWidth;
        var top = this.cy - halfHeight;
        var bottom = this.cy + halfHeight;

        if(left < 0)                        this.cx = halfWidth;
        else if(right > g_canvas.width)     this.cx = g_canvas.width - halfWidth;

        if(top < 0)                         this.cy = halfHeight;
        else if(bottom > g_canvas.height)   this.cy = g_canvas.height - halfHeight;
    }

};

Ship.prototype.fireLazer = function (angle, optX, optY) {

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

Ship.prototype.autoFireLazer = function () {
    for(var i = 1; i <= this.amount; ++i) {
        this.fireLazer(Math.PI / this.amount*2 * i)
    }
};

Ship.prototype.maybeYOLO = function () {
    if(keys[this.KEY_YOLO]) {
        entityManager.killAllEnemies();
        this.warp();
    }
};

Ship.prototype.die = function () {
	this.reset();
    lives -= 1;
    render_score(score_ctx);
    juicyStuff.shield(3 * SECS_TO_NOMINALS);
};

Ship.prototype.takeBulletHit = function () {
	if(!juicyStuff._shield) {
        soundManager.death();
		this.warp();
    }
};

Ship.prototype.getEnemyDrop = function() {
	juicyStuff.getRandomPowerUp();
};

Ship.prototype.takeRainHit = function (velY) {

    this.delay = 200; // bara hugmynd, breyta sprite-inu?
};

Ship.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.3*this.sprite.scale;
};

Ship.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    this.haltTime = this.reset_haltTime;
};

Ship.prototype.render = function (ctx) {
    var origScale = 0.6;//this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
    this.sprite.scale = 0.6;//origScale;
};