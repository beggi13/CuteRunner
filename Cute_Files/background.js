// ==========
// BACKGROUND
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Background(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.level1background;
    this.scale  = this.scale  || 1;

};

Background.prototype = new Entity();

Background.prototype.y = 0;
Background.prototype.velY = 2;

Background.prototype.update = function (du) {
    this.y = (this.y+this.velY*du) % g_canvas.height;
    
};

Background.prototype.render = function (ctx) {


    this.sprite.scale = g_canvas.width / this.sprite.width;
    this.sprite.drawWrappedCentredAt(
        ctx, g_canvas.width/2, g_canvas.height/2 + this.y, 0);
};