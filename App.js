import React, { Component } from 'react';
import { View, WebView, StatusBar } from 'react-native';

export default class App extends Component {
    render() {

        var webViewCode = `
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script type="text/javascript" src="https://static.codehs.com/gulp/90383397a2266c189a7fe6dc323191532ef1542a/chs-js-lib/chs.js"></script>

<style>
    body, html {
        margin: 0;
        padding: 0;
    }
    canvas {
        margin: 0px;
        padding: 0px;
        display: inline-block;
        vertical-align: top;
    }
    #btn-container {
        text-align: center;
        padding-top: 10px;
    }
    #btn-play {
        background-color: #8cc63e;
    }
    #btn-stop {
        background-color: #de5844;
    }
    .glyphicon {
        margin-top: -3px;
        color: #FFFFFF;
    }
</style>
</head>

<body>
    <div id="canvas-container" style="margin: 0 auto; ">
        <canvas
        id="game"
        width="400"
        height="480"
        class="codehs-editor-canvas"
        style="width: 100%; height: 100%; margin: 0 auto;"
        ></canvas>
    </div>
    <div id="console"></div>
    <div id="btn-container">
        <button class="btn btn-main btn-lg" id="btn-play" onclick='stopProgram(); runProgram();'><span class="glyphicon glyphicon-play" aria-hidden="true"></span></button>
        <button class="btn btn-main btn-lg" id="btn-stop" onclick='stopProgram();'><span class="glyphicon glyphicon-stop" aria-hidden="true"></span></button>
    </div>

<script>
    var console = {};
    console.log = function(msg){
        $("#console").html($("#console").html() + "     " + msg);
    };

    var runProgram = function() {
        var hLine, vLine;
var ball;
var dx = 4;
var dy = 4;
var score = 0;
var TIME = 120000;
var scoreText;
var WIN_SCORE = 20; 
var score = 1;
function start()
{
    hLine = new Line(0,0,0,0);
    vLine = new Line(0,0,0,0);
    ball = new Circle(50);
    ball.setPosition(Randomizer.nextInt(10,getWidth()) ,Randomizer.nextInt(10,getHeight()));
        		  
    ball.setColor(Color.GREEN);
    add(ball);
        	
    setTimer(draw, 200);
        	
    setHorizontalLine(200);
    setVerticalLine(200);
        
        		
    add(hLine);
    add(vLine);
        	
    mouseMoveMethod(resetTarget);
        	
    mouseClickMethod(clickHandler);
        	
    scoreText = new Text(score);
    scoreText.setPosition(370, getHeight());
    add(scoreText);
    
}
    

/*  This searches for a element which in this case is an object that is cyan.
    If an object that is cyan is clicked on than it will increase the score and teleports the ball to a
    random position.
    If you do not click on an object that is not cyan than this will lower the score.
    If the score reaches zero than a message is displayed saying "Good luck next time."
    If the score reaches 30 than a message is displayed saying "Congratulations!" 
 */
function clickHandler(e){
	var elem = getElementAt(e.getX(), e.getY());
	if(elem != null && elem.getColor() == Color.green){
		score++;
	}else{
		score--;
	}
	
	if(score == 0){
		displayMessage("You Lose :(");
	}
	if(score == WIN_SCORE){
		displayMessage("You Win :)");
	}
	
	scoreText.setText(score);
}
// Creates a line that goes Horizontally throught the grid
function setHorizontalLine(y){
	hLine.setPosition(0, y);
	hLine.setEndpoint(getWidth(), y);
}
// Creates a line that goes Vertically throught the grid 
function setVerticalLine(x){
    vLine.setPosition(x,0);
    vLine.setEndpoint(x, getHeight());

}
// This resets the intercept of the two lines to where your mouse is located
function resetTarget(e){
	setHorizontalLine(e.getY());
	setVerticalLine(e.getX());
}
// This makes sure that the ball will bounce off any wall 
function draw(){
    checkWalls();
	ball.move(dx, dy);
}
// Checks if there is a wall and if there is a wall the ball will bounce off
function checkWalls(){
	// Bounce off right wall
	if(ball.getX() + ball.getRadius() > getWidth()){
		dx = -dx;
	}
	
	// Bounce off left wall
	if(ball.getX() - ball.getRadius() < 0){
		dx = -dx;
	}
	
	// Bounce off bottom wall
	if(ball.getY() + ball.getRadius() > getHeight()){
		dy = -dy;
	}
	
	// Bounce off top wall
	if(ball.getY() - ball.getRadius() < 0){
		dy = -dy;
	}
}

// Sets the potition of the ball at a random coordinate.
function teleport(){
    ball.setPosition(Randomizer.nextInt(16, 400) ,Randomizer.nextInt(16, 400));
}
// At the end of the game this will display a message saying if you lost or if you won.
function displayMessage(text){

	var msg = new Text(text);
	msg.setPosition(getWidth()/2 - msg.getWidth()/2, 200);
	add(msg);
}






        if (typeof start === 'function') {
            start();
        }

        // Overrides setSize() if called from the user's code. Needed because
        // we have to change the canvas size and attributes to reflect the
        // user's desired program size. Calling setSize() from user code only
        // has an effect if Fit to Full Screen is Off. If Fit to Full Screen is
        // On, then setSize() does nothing.
        function setSize(width, height) {
            if (!true) {
                // Call original graphics setSize()
                window.__graphics__.setSize(width, height);

                // Scale to screen width but keep aspect ratio of program
                // Subtract 2 to allow for border
                var canvasWidth = window.innerWidth - 2;
                var canvasHeight = canvasWidth * getHeight() / getWidth();

                // Make canvas reflect desired size set
                adjustMarginTop(canvasHeight);
                setCanvasContainerSize(canvasWidth, canvasHeight);
                setCanvasAttributes(canvasWidth, canvasHeight);
            }
        }
    };

    var stopProgram = function() {
        removeAll();
        window.__graphics__.fullReset();
    }

    window.onload = function() {
        if (!false) {
            $('#btn-container').remove();
        }

        var canvasWidth;
        var canvasHeight;
        if (true) {
            // Get device window width and set program size to those dimensions
            setSize(window.innerWidth, window.innerHeight);
            canvasWidth = getWidth();
            canvasHeight = getHeight();

            if (false) {
                // Make room for buttons if being shown
                $('#btn-container').css('padding', '5px 0');
                canvasHeight -= $('#btn-container').outerHeight();
            }

            setCanvasAttributes(canvasWidth, canvasHeight);
        } else {
            // Scale to screen width but keep aspect ratio of program
            // Subtract 2 to allow for border
            canvasWidth = window.innerWidth - 2;
            canvasHeight = canvasWidth * getHeight() / getWidth();

            // Light border around canvas if not full screen
            $('#canvas-container').css('border', '1px solid #beccd4');

            adjustMarginTop(canvasHeight);
        }

        setCanvasContainerSize(canvasWidth, canvasHeight);

        if (true) {
            runProgram();
        }
    };

    // Set the canvas container width and height.
    function setCanvasContainerSize(width, height) {
        $('#canvas-container').width(width);
        $('#canvas-container').height(height);
    }

    // Set the width and height attributes of the canvas. Allows
    // getTouchCoordinates to sense x and y correctly.
    function setCanvasAttributes(canvasWidth, canvasHeight) {
        $('#game').attr('width', canvasWidth);
        $('#game').attr('height', canvasHeight);
    }

    // Assumes the Fit to Full Screen setting is Off. Adjusts the top margin
    // depending on the Show Play/Stop Buttons setting.
    function adjustMarginTop(canvasHeight) {
        var marginTop = (window.innerHeight - canvasHeight)/2;
        if (false) {
            marginTop -= $('#btn-container').height()/3;
        }
        $('#canvas-container').css('margin-top', marginTop);
    }
</script>
</body>
</html>
`;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden />
                <WebView
                    source={{html: webViewCode, baseUrl: "/"}}
                    javaScriptEnabled={true}
                    style={{ flex: 1 }}
                    scrollEnabled={false}
                    bounces={false}
                    scalesPageToFit={false}
                ></WebView>
            </View>
        );
    }
}
