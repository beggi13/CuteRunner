/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {
    return this._nextSpatialID++;
},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    this._entities[spatialID] = {en: entity, posX: pos.posX, posY: pos.posY, radius : entity.getRadius()};
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    //this._entities[spatialID] = null;
    delete this._entities[spatialID];
},

clearAll : function(entity){
    this._entities.length = 0;
},

findEntityInRange: function(posX, posY, radius) {
    for(var ID in this._entities) {
        var e = this._entities[ID];           
        var dist = util.distSq(posX,posY, e.posX, e.posY);
        var limit = radius + e.radius;
        if(dist < limit*limit) { return e.en; }
    }
    return false;
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    for (var ID in this._entities) {
        var e = this._entities[ID];
        //if(e != null)
        //{
            util.strokeCircle(ctx, e.posX, e.posY, e.radius);
        //}
    }
    ctx.strokeStyle = oldStyle;
}

}