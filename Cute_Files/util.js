// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {

// RANGES
// ======


clampRange: function(value, lowBound, highBound) {
    if (value < lowBound) {
	value = lowBound;
    } else if (value > highBound) {
	value = highBound;
    }
    return value;
},

wrapRange: function(value, lowBound, highBound) {
    while (value < lowBound) {
	value += (highBound - lowBound);
    }
    while (value > highBound) {
	value -= (highBound - lowBound);
    }
    return value;
},

isBetween: function(value, lowBound, highBound) {
    if (value < lowBound) { return false; }
    if (value > highBound) { return false; }
    return true;
},


// RANDOMNESS
// ==========

randRange: function(min, max) {
    return (min + Math.random() * (max - min));
},

reverseX: function(cx)
{
    if(cx > g_canvas.width/2)
    {
        return -1;
    }
    return 1;
},

// MISC
// ====

square: function(x) {
    return x*x;
},

// DISTANCES
// =========

distSq: function(x1, y1, x2, y2) {
    return this.square(x2-x1) + this.square(y2-y1);
},

wrappedDistSq: function(x1, y1, x2, y2, xWrap, yWrap) {
    var dx = Math.abs(x2-x1),
	dy = Math.abs(y2-y1);
    if (dx > xWrap/2) {
	dx = xWrap - dx;
    };
    if (dy > yWrap/2) {
	dy = yWrap - dy;
    }
    return this.square(dx) + this.square(dy);
},

// MOVEMENT
// ========
//returns velocity from point (x1, y1) to (x2, y2)
chasePoint: function(delay, x1, y1, x2, y2){
    return {
        velX : (x2 - x1) / delay,
        velY : (y2 - y1) / delay};
},

getDirection: function(x1, y1, x2, y2){
    return{
        dx : (x2-x1)/Math.abs(x2-x1) || 0,
        dy : (y2-y1)/Math.abs(y2-y1) || 0
    };
},

// CANVAS OPS
// ==========

clearCanvas: function (ctx) {
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
},

clearScoreCanvas: function (ctx) {
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "#FFBDDE";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
},

strokeCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
},

fillCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
},

fillBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
},

fillText: function (ctx, x, y, font, text, style){
    var oldStyle = ctx.fillStyle;
    var oldFont = ctx.font;
    ctx.fillStyle = style;
    ctx.font = font || 'bold 30px Arial';
    ctx.fillText(text, x, y);
    ctx.fillStyle = oldStyle;
},



isClicked: function (x, y, width, height) {

    if( g_mouseX_click > x &&
        g_mouseX_click < x + width &&
        g_mouseY_click > y &&
        g_mouseY_click < y + height) {
        return true;
    }
    return false;
}

};