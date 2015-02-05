/*
* Controls the dialog in the game
*
*
*
*
*/
var dialogManager = {


_curr_Text : "",
_curr_speaker : "",
_SPACE : 32,
_speaker : "",
_startH : 430,
	
update : function()
{
	var inDialog = gameFlow.inDialog();
	if(!inDialog) return;
	if(eatKey(this._SPACE))
	{
		gameFlow.toggleDialog(false);
	}
},

//set the dialog
setDialog : function(dialog)
{
	this._curr_Text = dialog;
},

//set the speaker
setSpeaker : function(speaker)
{
	if(speaker ==="player")
	{
		this._speaker = g_sprites.playerDialog;
	}	
	if(speaker ==="pat")
	{
		this._speaker = g_sprites.pat;
	}	
	if(speaker ==="patMystery")
	{
		this._speaker = g_sprites.patMystery;
	}
	if(speaker ==="catpig")
	{
		this._speaker = g_sprites.catpigDialog
		this._speaker.scale = 0.37;
	}	
	if(speaker ==="kingGreda")
	{
		this._speaker = g_sprites.kingGreda;
		this._speaker.scale = 0.37;
	}

},


render : function(ctx)
{
	if(!gameFlow.inDialog()) return;

	//draw background box
	ctx.globalAlpha = 0.5;

	var height = g_canvas.height-this._startH;
	util.fillBox(ctx,0,this._startH,g_canvas.width,height,"black");
	ctx.globalAlpha = 1;

	//draw the speaker sprite
	this._speaker.drawCentredAt(
        ctx, 70, this._startH + 75, 0
    );

    //draw the dialog.
	var dialog = this._curr_Text.split("\n");
	for(var i = 0; i < dialog.length; i++)
	{
		util.fillText(ctx, 135, this._startH + 30+30*i, "bold 25px Arial", dialog[i], 'white');
	}
	util.fillText(ctx, 230, this._startH+height-30, "bold 20px Arial", "[PRESS SPACEBAR]", "white");
}

}