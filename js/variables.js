
//Static Variables
var WIDTH = 640;
var HEIGHT = 480;
var PWIDTH = 480;
var PHEIGHT = 360;
var THRESH = 51;

var MAX = 500;
var MIN = 113;


//Dynamic Control Variables
var screenX;
var screenY;
var Zoom;

var mouseX;
var mouseY;
var selectX;
var selectY;

var pPic;

var isMouse;
var Mouse;
var isPicture;
var Picture;

//Robot Positions
//[x-position,y-position]
var Rpositions = new Array();

//Barrier Points
//[x-position,y-position]
var	Bpositions = new Array();

//Pictures
// [forward, right, back, left]
var Pictures = new Array();


/*
function readText(file)
{

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				var yourmom = rawFile.responseText;
				Text = yourmom.split("\n");
			}
		}
	}
	rawFile.send(null);
}
*/

//Interprets the text document to decode the important points.
function interpretText(T)
{
	var Rinc = 0;
	var Binc = 0;
	
	for(var i = 0; i<T.length ; i++)
	{
		var str;
		
		if(T[i].charAt(1) == "#")
		{
			str = T[i].slice(4,T[i].length);
			str = str.split(",");
			
			Rpositions[Rinc] = new Array();
			Rpositions[Rinc][0] = parseInt(str[0]);
			Rpositions[Rinc][1] = parseInt(str[1]);
			
			Pictures[Rinc] = new Array();
			for(var j = 0; j<4 ; j++)
			{
				Pictures[Rinc][j] = "Pics/" + Rinc + "_" + j + ".jpg";
			}
			Rinc++;
		}
		else
		{
			str = T[i].split(",");
			
			Bpositions[Binc] = new Array();
			Bpositions[Binc][0] = parseInt(str[0]);
			Bpositions[Binc][1] = parseInt(str[1]);
			Binc++;	
		}
	
	}	
}

//Loops through the photos
function looper(IN)
{	
	var OUT;
	
	if(IN == 4)
	{
		OUT = 0;
	}
	else if(IN == -1)
	{
		OUT = 3;
	}
	else
	{
		OUT = IN;
	}
	
	return OUT;
}