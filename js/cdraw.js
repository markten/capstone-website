

//Initialization function

function Initial()
{
	screenX = WIDTH/2;
	screenY = HEIGHT/2;
	isMouse = false;
	ispicture = false;
	Zoom = .25;
	
	//readText("file///C:/Users/zenaardvark/Documents/Capstone/Data.txt");
	interpretText(Text);
	
	Timer();
}

function Main()
{
	if(isPicture!=true)
	{
		//Grid(screenX,screenY);
		Draw(screenX,screenY,Rpositions,Bpositions,THRESH);
	}
	
	Timer();
}

//Draws obstacles and robot positions
function Draw(sX,sY,R,B,T)
{
	var c = document.getElementById("Canvas").getContext("2d");
	var i;

	isMouse = false;
	
	//Clear the board
	c.fillStyle = "#000000";
	c.fillRect(0,0,WIDTH,HEIGHT);
	c.fillStyle = "#00FF00";
	c.lineWidth = 5;
	c.strokeStyle = "#00FFFF";
	
	mDraw(sX,sY,R,c,MAX,MIN);
	c.fillStyle = "#00FF00";
	
	//Draw individual Points
	for( i = 0; i<R.length ; i++ )
	{
		var currentX = R[i][0] + sX;
		var currentY = -R[i][1] + sY;
		
		//Draw the point
		c.beginPath();
		c.arc(currentX,currentY,10,0,2*Math.PI);
		c.fill();
		
		//Checks to see what the mouse is currently over
		mouseOver(mouseX,mouseY,currentX,currentY,i);
		
		//Highlights a robot point if the mouse is over it
		if((isMouse==true)&&(Mouse==i))
		{
			c.lineWidth = 2;
			c.strokeStyle = "#000000";
			c.stroke();
			c.lineWidth = 5;
			c.strokeStyle = "#00FFFF";
		}
		c.closePath();
		
		if(i != 0)
		{
			var previousX = R[i-1][0] + sX;
			var previousY = -R[i-1][1] + sY;
		
			c.beginPath();
			c.moveTo(currentX,currentY);
			c.lineTo(previousX,previousY);
			c.closePath()
			c.stroke();
		}
	}
	
	c.fillStyle = "#FF0000";
	c.lineWidth = 2;
	c.strokeStyle = "#FF0000";
	
	//For drawing the Obstacle positions
	for( i = 0; i<B.length ; i++ )
	{
		var currentX = B[i][0] + sX;
		var currentY = -B[i][1] + sY;
		c.beginPath();
		c.arc(currentX,currentY,4,0,2*Math.PI);
		c.fill();
		
		if(i != 0)
		{
			var previousX = B[i-1][0] + sX;
			var previousY = -B[i-1][1] + sY;
			
			if((Math.abs(currentX-previousX)<T) && (Math.abs(currentY-previousY)<T))
			{
				c.beginPath();
				c.moveTo(currentX,currentY);
				c.lineTo(previousX,previousY);
				c.closePath()
				c.stroke();
			}
		}
	}
	
	c.strokeStyle = "#555555";
	c.lineWidth = 1;
	c.font="12px Arial";
	c.strokeText("( " + selectX/100 + "m , " + -selectY/100 + "m )", 10 , 40);
}

//Drawing the 
function mDraw(sX,sY,R,c,M,m){
		
	c.fillStyle = "#FFFFcc";
	for( i = 0; i<R.length ; i++ ){
		var currentX = R[i][0] + sX;
		var currentY = -R[i][1] + sY;

		//Draw the Min and Max circles
		c.beginPath();
		c.arc(currentX,currentY,M,0,2*Math.PI);
		c.fill();
		c.closePath();

	}
	
	c.fillStyle = "#ccFFcc";
	for( i = 0; i<R.length ; i++){	
		var currentX = R[i][0] + sX;
		var currentY = -R[i][1] + sY;

		c.beginPath();
		c.arc(currentX,currentY,m,0,2*Math.PI);
		c.fill();
		c.closePath();
	}
}

function pDraw(pic,W,H,PW,PH){

	var c = document.getElementById("Canvas").getContext("2d");
	
	var xPosition = ((W-PW)/2);
	var yPosition = (H-PH)/2;
	
	c.fillStyle = "#CCCCCC";
	c.fillRect(0,0,W,H);
	c.font="24px Arial";
	c.strokeStyle = "#000000";
	c.lineWidth = 1;
	
	c.strokeText("Panoramic at Position: " + Rpositions[Mouse][0]/100 + "m , " + Rpositions[Mouse][1]/100 + "m", H/2 - 80 , 40 );
	
	var loading0 = new Image();
	loading0.onload = function()
	{
		c.drawImage(loading0,xPosition,yPosition,PW,PH);
	};
	loading0.src = Pictures[Mouse][pic]+"";

	var loading1 = new Image();
	loading1.onload = function()
	{
		c.drawImage(loading1,xPosition+PW,yPosition,PW,PH);
	};
	loading1.src = Pictures[Mouse][looper(pic-1)]+"";
	
	
	var loading2 = new Image();
	loading2.onload = function()
	{
		c.drawImage(loading2,xPosition-PW,yPosition,PW,PH);
	};
	loading2.src = Pictures[Mouse][looper(pic+1)]+"";
	
}

function mouseOver(mX,mY,cX,cY,Number)
{
	if((Math.abs(mX-cX)<9)&&(Math.abs(mY-cY)<9))
	{
		isMouse = true;
		Mouse = Number;
	}
}

function Timer()
{
	setTimeout(function()
		{
		Main();
		},100);
}

function getCoords(e)
{
	mouseX = e.clientX - document.getElementById("Coords").offsetLeft;
	mouseY = e.clientY - document.getElementById("Coords").offsetTop;
	selectX = (mouseX - screenX);
	selectY = (mouseY - screenY);
}

function clearCoords()
{
	mouseX = 0;
	mouseY = 0;
}

//Key Press commands
document.onkeydown = function(event)
{
	event = event || window.event;

	var e = event.keyCode;
	//alert(e);
	
	if(isPicture)
	{
		if( e == 37 )
		{
			pPic = looper(pPic+1);
			pDraw(pPic,WIDTH,HEIGHT,PWIDTH,PHEIGHT);
		}
		else if( e == 39 )
		{
			pPic = looper(pPic-1);
			pDraw(pPic,WIDTH,HEIGHT,PWIDTH,PHEIGHT);
		}
	}
	else
	{
		//Arrows for Movement
		if ( e == 37 )		//left
		{
			screenX = screenX+10;
		}
		else if ( e == 39 )	//right
		{
			screenX = screenX-10;
		}
		if ( e == 38 )		//Up
		{
			screenY = screenY+10;
		}
		else if ( e == 40 )	//Down
		{
			screenY = screenY-10;
		}
		
		//Zoom Levels(controlled by - and = signs)
		if ( e == 187 )
		{
			Zoom = Zoom*2;
		}
		else if ( e == 189 )
		{
			Zoom = Zoom/2;
		}
	}
}

//Mouse Click Commands
document.onclick = function()
{
	if(isPicture)
	{
		isPicture = false;
	}
	else
	{
		if(isMouse)
		{
			isPicture = true;
			pPic = 0;
			pDraw(pPic,WIDTH,HEIGHT,PWIDTH,PHEIGHT);
		}
	}
}