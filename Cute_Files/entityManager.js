/*

entityManager.js

A module which handles arbitrary entity-management for "Cute Runner"

We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/

"use strict";

// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA
_background : [],
_enemies   : [],
_bullets : [],
_ships   : [],
_lazers : [],
_shield : [],
_extraDude : [],
_enemyDrop : [],

_bShowEnemies : true,
_skipUpdate : false,

// "PRIVATE" METHODS

//Er enn þá verið að nota þetta?
//Ef ekki, má þá ekki bara taka þetta út?
/*_generateEnemies : function() {
    var i,
        NUM_ENEMIES = 1;

    for (i = 0; i < NUM_ENEMIES; ++i) {
        this.generateEnemy();
    }
},*/

generateBackground : function(descr) {
    this._background.push(new Background(descr));
},

_findNearestShip : function(posX, posY) {
    var closestShip = null,
        closestIndex = -1,
        closestSq = 1000 * 1000;

    for (var i = 0; i < this._ships.length; ++i) {

        var thisShip = this._ships[i];
        var shipPos = thisShip.getPos();
        var distSq = util.wrappedDistSq(
            shipPos.posX, shipPos.posY, 
            posX, posY,
            g_canvas.width, g_canvas.height);

        if (distSq < closestSq) {
            closestShip = thisShip;
            closestIndex = i;
            closestSq = distSq;
        }
    }
    return {
        theShip : closestShip,
        theIndex: closestIndex
    };
},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._background, this._ships, this._enemies, this._shield, this._lazers, this._bullets, this._extraDude, this._enemyDrop];
},

init: function() {
    this.generateBackground();
},

fireBullet: function(cx, cy, velX, velY, rotation, radius, spriter) {
    this._bullets.push(new Bullet({
        cx   : cx,
        cy   : cy,
        velX : velX,
        velY : velY,
        radius : radius,
        sprite : spriter,
        rotation : rotation
    }));
},

fireLazer: function(cx, cy, velX, velY, rotation, radius, spriter) {
    this._lazers.push(new Lazer({
        cx   : cx,
        cy   : cy,
        velX : velX,
        velY : velY,
        radius : radius,
        sprite : spriter,
		rotation : rotation
    }));
},

hasShield : function(){
    return (this._shield.length > 0);
},

generateShield : function(descr) {
	this._shield.push(new Shield(descr));
},

generateEnemy : function(descr, Type) {
    switch(Type){
        case "bunny":
            this._enemies.push(new Bunny(descr))
            break;
        case "kitten":
            this._enemies.push(new Kitten(descr));
            break;
        case "squirrel":
            this._enemies.push(new Squirrel(descr));
            break;
        case "gredapede":
            this._enemies.push(new Gredapede(descr));
            break;
        case "rain":
            this._enemies.push(new Rain(descr));
            break;
        case "seal":
            this._enemies.push(new Seal(descr));
            break;
        case "puppy":
            this._enemies.push(new Puppy(descr));
            break;
        case "boss1":
            this._enemies.push(new Boss1(descr));
            break;        
        case "boss2":
            this._enemies.push(new kingGreda(descr));
            break;        
        case "boss3":
            this._enemies.push(new Pat(descr));
            break;
        default:
            console.log("Gat ekki generatad enemy");
    }
},

nrOfEnemies : function(){
    return this._enemies.length;
},

generateGredapede : function(descr) {
    this._enemies.push(new Gredapede(descr));
},

generateShip : function(descr) {
    this._ships.push(new Ship(descr));
},

generateExtraDude : function(descr) {
 this._extraDude.push(new extraDude(descr));
},

generateDrop : function(descr) {
	this._enemyDrop.push(new enemyDrop(descr));
},

resetShips: function() {
    this._forEachOf(this._ships, Ship.prototype.reset);
},

toggleEnemies: function() {
    this._bShowEnemies = !this._bShowEnemies;
},

shouldSkipUpdate : function(shouldSkip) {
    this._skipUpdate = shouldSkip;
},

clearEverything : function() {
    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        aCategory.length = 0;
    }
},
update: function(du) {

    if(!gameFlow.inGame()) return;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }
    
    //if (this._enemies.length === 0) this._generateEnemies();
},

killAllEnemies: function() {
    // breyta kannski???
    for(var i = 0; i < this._enemies.length; ++i) {
        var enemy = this._enemies[i];
        var hp = enemy.hp;
        console.log(enemy);
        console.log(hp);
        while((hp > 0 && hp < 50) || hp === undefined) { // kills everything that has 50 hp or less
            enemy.takeLazerHit();
            hp = enemy.hp;
            if(hp === undefined) break;
        }
    }

},

render: function(ctx) {

    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        if (!this._bShowEnemies && 
            aCategory == this._enemies)
            continue;

        for (var i = 0; i < aCategory.length; ++i) {
            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);
        }
        debugY += 10;
    }
	
	//geri þetta hér til að fá klukkupúls og ctx-ið
	//Hvar er betra að setja þetta?
	if(lives === 0) {
		gameFlow.endGame();
	}
}
}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();