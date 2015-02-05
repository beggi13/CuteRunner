// ===========
// Cute Runner
// ===========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE INITIAL SHIPS
// ====================

function createInitialShips() {

    entityManager.generateShip({
        cx : 300,
        cy : 550
    });
    
}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    gameFlow.update();
    menuManager.update(du);
    dialogManager.update();
    levelManager.update(du);
    entityManager.update(du);
	juicyStuff.update(du);
	soundManager.update(du);

    // Prevent perpetual YOLO-ing!
    eatKey(Ship.prototype.KEY_YOLO);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;
var g_useMouse = true;

var KEY_MUTE = keyCode('M');
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');
var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');
var KEY_3 = keyCode('3');
var KEY_4 = keyCode('4');
var KEY_5 = keyCode('5');
var KEY_6 = keyCode('6');

var KEY_UP = keyCode('W');
var KEY_DOWN = keyCode('S');
var KEY_LEFT = keyCode('A');
var KEY_RIGHT = keyCode('D');

var KEY_K = keyCode('K');

function processDiagnostics() {

    // if (eatKey(KEY_MIXED))
        // g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;
	
	//if (eatKey(KEY_RESET)) gameFlow.restartGame();

    //if (eatKey(KEY_HALT)) entityManager.haltShips();

    //if (eatKey(KEY_RESET)) entityManager.resetShips();

    if (eatKey(KEY_K)) g_useMouse = !g_useMouse;
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);
    dialogManager.render(ctx);
    render_score(score_ctx);
    //menu rendered after entity to get menu on top
    menuManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}

function background_render(ctx)
{
    g_sprites.background.scale = 1.2738853503185;
    g_sprites.background.drawWrappedCentredAt(
        ctx, g_canvas.width/2, g_canvas.height/2+y, 0
    );
    y = (y + 1) % g_canvas.height;
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        ship   : "https://notendur.hi.is/~sss33/Cute%20Runner/rainbowdash_sprite.png",
        player_water : "https://notendur.hi.is/~sss33/Cute%20Runner/rainbowdash_water.png",
        ship2  : "https://notendur.hi.is/~pk/308G/images/ship_2.png",
        rock   : "https://notendur.hi.is/~pk/308G/images/rock.png",
        lazer : "https://notendur.hi.is/~sss33/Cute%20Runner/beam_player.png",
        beam : "https://notendur.hi.is/~sss33/Cute%20Runner/beam.png",
        beam_blue : "https://notendur.hi.is/~sss33/Cute%20Runner/beam_blue.png",
        beam_green : "https://notendur.hi.is/~sss33/Cute%20Runner/beam_green.png",
        bunny : "https://notendur.hi.is/~sss33/Cute%20Runner/bunnyV2.png",
        squirrel : "https://notendur.hi.is/~sss33/Cute%20Runner/squirrel.png",
        kitten : "https://notendur.hi.is/~sss33/Cute%20Runner/kitten.png",

        level1background : "https://notendur.hi.is/~sss33/Cute%20Runner/background.png",
        level2background : "./pics/rain_level.png",
        level3background : "./pics/level22.png",

        rain : "https://notendur.hi.is/~sss33/Cute%20Runner/drop.png",
        Gredapede : "https://notendur.hi.is/~sss33/Cute%20Runner/thingy.png",
        Seal : "https://notendur.hi.is/~sss33/Cute%20Runner/seal.png",
        Puppy : "https://notendur.hi.is/~sss33/Cute%20Runner/doggy.png",
        shield : "https://notendur.hi.is/jthk4/images/shield.png",
        boss1 : "https://notendur.hi.is/~sss33/Cute%20Runner/boss1.png",
		boss1DIA : "https://notendur.hi.is/~sss33/Cute%20Runner/boss1_dia.png",
		extraDude : "https://notendur.hi.is/~sss33/Cute%20Runner/nyanCat2.png",
		FinnTheHuman : "https://notendur.hi.is/~sss33/Cute%20Runner/FinnTheHuman.png",
		JakeTheDog : "https://notendur.hi.is/~sss33/Cute%20Runner/JakeTheDog.png",
		LumpySpacePrincess : "https://notendur.hi.is/~sss33/Cute%20Runner/LumpySpacePrincess.png",
		PrincessBubbleGum : "https://notendur.hi.is/~sss33/Cute%20Runner/PrincessBubbleGum.png",
		Marceline : "https://notendur.hi.is/~sss33/Cute%20Runner/Marceline.png",

        player_dialog : "./pics/player_talk.png",
        //player_dialog : "http://4.bp.blogspot.com/-DCtjSxnIsF8/UWbCbK5rzOI/AAAAAAAAEeY/6wmr4fuDo_E/s1600/rainbow_dash_s_hot_minute_by_mrlolcats17-d5lo21h.png",
        pat : "https://notendur.hi.is/~sss33/Cute%20Runner/Pat.png",
        pat_mystery : "https://notendur.hi.is/~sss33/Cute%20Runner/Pat_mystery.png",
        kingGreda : "https://notendur.hi.is/~sss33/Cute%20Runner/kingGreda.png",

        ghost : "https://notendur.hi.is/~sss33/Cute%20Runner/Ghost.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.playerDialog = new Sprite(g_images.player_dialog);
    g_sprites.pat = new Sprite(g_images.pat);
    g_sprites.patMystery = new Sprite(g_images.pat_mystery);
    g_sprites.catpigDialog = new Sprite(g_images.boss1DIA);
    g_sprites.catpigDialog.scale = 0.7;
    g_sprites.playerDialog.scale = 0.14;
    g_sprites.pat.scale = 0.25;
    g_sprites.patMystery.scale = 0.25;


    g_sprites.ship  = new Sprite(g_images.ship);
    g_sprites.player_water  = new Sprite(g_images.player_water);
    g_sprites.ship2 = new Sprite(g_images.ship2);
    g_sprites.rock  = new Sprite(g_images.rock);
    g_sprites.bunny  = new Sprite(g_images.bunny);
    g_sprites.Boss1  = new Sprite(g_images.boss1);
    g_sprites.kingGreda = new Sprite(g_images.kingGreda);
    g_sprites.squirrel  = new Sprite(g_images.squirrel);
    g_sprites.kitten  = new Sprite(g_images.kitten);
    g_sprites.gredapede = new Sprite(g_images.Gredapede);
    g_sprites.Seal = new Sprite(g_images.Seal);
    g_sprites.Puppy = new Sprite(g_images.Puppy);
    g_sprites.Ghost = new Sprite(g_images.ghost);
	
	g_sprites.extraDude = new Sprite(g_images.extraDude);
	g_sprites.FinnTheHuman = new Sprite(g_images.FinnTheHuman);
	g_sprites.JakeTheDog = new Sprite(g_images.JakeTheDog);
	g_sprites.LumpySpacePrincess = new Sprite(g_images.LumpySpacePrincess);
	g_sprites.PrincessBubbleGum = new Sprite(g_images.PrincessBubbleGum);
	g_sprites.Marceline = new Sprite(g_images.Marceline);

    g_sprites.level1background = new Sprite(g_images.level1background);
    g_sprites.level2background = new Sprite(g_images.level2background);
    g_sprites.level3background = new Sprite(g_images.level3background);

    g_sprites.rain = new Sprite(g_images.rain);

    g_sprites.bullet = new Sprite(g_images.beam);
    g_sprites.bullet2 = new Sprite(g_images.beam_blue);
    g_sprites.lazer = new Sprite(g_images.lazer);
	g_sprites.ship_beam = new Sprite(g_images.beam_green);
	g_sprites.shield = new Sprite(g_images.shield);

    g_sprites.gredapede.scale = 0.3;
    g_sprites.Boss1.scale = 0.3;
    g_sprites.kingGreda.scale = 0.3;
    g_sprites.bullet.scale = 0.25;
    g_sprites.bullet2.scale = 0.25;
    g_sprites.ship_beam.scale = 0.5;
    g_sprites.lazer.scale = 0.3;
    g_sprites.ship.scale = 0.6;
    g_sprites.player_water.scale = 0.6;
	
	
    entityManager.init();

    main.init();
}

requestPreloads();