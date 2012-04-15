var can;
var direccionX;
var direccionY;
var posX;
var PosY;
  
  // nos marca los pulsos del juego
            window.requestAnimFrame = (function () {
			
				return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function ( /* function */ callback, /* DOMElement */ element) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();
            arrayRemove = function (array, from) {
                var rest = array.slice((from) + 1 || array.length);
                array.length = from < 0 ? array.length + from : from;
                return array.push.apply(array, rest);
            };

            var game = (function () {
				
                // Variables globales a la aplicacion
                var canvas,
                    ctx,
                    buffer,
                    bufferctx,
                    //Inicializacion de las variables globales de la Nave de nuestro juego
                    nave,
                    playerLife = 3,
                    playerSpeed = 5,
                    
                    imagenFondo,
                    bgBoss,
                    
                    pelota,
					tablero,
					ladrillo,
                    
                    
                    youLoose = false,
                    congratulations = false,
                   
                    keyPressed = {},
                    keyMap = {
                        left: 37,
                        right: 39,
                        fire: 32 // tecla espacio
                    },
                    now = 0;

                function loop() {
                    update();
                    draw();
                }

                function init() {


                    canvas = document.getElementById('canvas');
                    ctx = canvas.getContext("2d");

                    buffer = document.createElement('canvas');
                    buffer.width = canvas.width;
                    buffer.height = canvas.height;
                    bufferctx = buffer.getContext('2d');

                    imagenFondo = new Image();
                    imagenFondo.src = 'images/fondovertical.png';

                    bgBoss = new Image();
                    bgBoss.src = 'images/fondovertical_jefe.png';

                    nave = new Nave(playerLife, 0);
					pelota = new Pelota();
					ladrillo = new Ladrillo(); 

                    addListener(document, 'keydown', keyDown);
                    addListener(document, 'keyup', keyUp);

                    function anim () {
                        loop();
                        requestAnimFrame(anim);
						
                    }
                    anim();
                }

/*---------------------*------------*---------------------------------*/
                function Nave(life, score) {
                    nave = new Image();
                    nave.src = 'images/nave.png';
                    nave.posX = (canvas.width / 2) - (nave.width / 2);
                    nave.posY =  (canvas.height/23) + 20*(canvas.height/23);
                    nave.life = life;
                    nave.score = score;
                    nave.dead = false;
                    nave.speed = playerSpeed;
                    nave.doAnything = function() {
                        if (keyPressed.left && nave.posX > 5)
                            nave.posX -= nave.speed;
                        if (keyPressed.right && nave.posX < (canvas.width - nave.width - 5))
                            nave.posX += nave.speed; 
                    };
                    return nave;
                }

	function Pelota(){
		pelota = new Image();
		pelota.src = 'pelota.png';
		pelota.posX = (canvas.width / 2) - (nave.width / 2);
                    	pelota.posY =  (canvas.height-80);
		pelota.direccionY=2;
		pelota.direccionX=2;
		pelota.actuar = function(){
		if(pelota.posX == 0){
			pelota.direccionX = 1;
		}
		if(pelota.posX == canvas.width){
			pelota.direccionX = 2;
		}
		if(pelota.posY == 0){
			pelota.direccionY = 1;
		}
		if(pelota.posY == canvas.height){
			pelota.direccionY = 2;
		}			
		switch(pelota.direccionY){
			case 1:
				pelota.posY=pelota.posY+5;
				break;
			case 2:
				pelota.posY=pelota.posY-5;
				break;
		}
		switch(pelota.direccionX){
			case 1:
				pelota.posX++;
				break;
			case 2:
				pelota.posX--;
				break;
		}
		naveBola();
		loose();
		};
	return pelota;					
	}
				
	/*****************************CHOQUES*****************/
				
	function naveBola(){
		if(pelota.posY==nave.posY && (pelota.posX>=nave.posX && pelota.posX<=nave.posX+86)){
			pelota.direccionY=2;
					
					}			
				}
				function loose(){
					if(pelota.posY==canvas.height){
						playerLife--;
						if(playerLife==0){
							youLoose=true;
						
						}
					}
				}
				
				
				
				
				/*************** LADRILLOS *****************************************/
				
				function Ladrillo(){
					
					tablero = new Array(18);
					
					ladrillo = new Array(234);
					
					var h = 0;
					
					tablero[0] = new Array('X','X','X','X','X','X','X','X','X','X','X','X','X');
					tablero[1] = new Array('X','X','X','X','X','A','A','A','X','X','X','X','X');
					tablero[2] = new Array('X','X','X','X','X','X','A','X','X','X','X','X','X');
					tablero[3] = new Array('X','A','A','A','A','X','A','X','A','A','A','A','X');
					tablero[4] = new Array('X','A','A','A','A','X','A','X','A','A','A','A','X');
					tablero[5] = new Array('A','X','X','X','X','X','X','X','X','X','X','X','X');
					tablero[6] = new Array('A','X','A','A','X','A','A','A','X','A','A','X','A');
					tablero[7] = new Array('A','A','X','A','X','A','A','A','X','A','X','A','A');
					tablero[8] = new Array('A','A','X','X','X','X','X','X','X','X','X','A','A');
					tablero[9] = new Array('X','X','A','A','A','A','A','A','A','A','X','X','X');
					tablero[10] = new Array('X','X','A','A','A','A','A','A','A','A','A','X','X');
					tablero[11] = new Array('X','A','A','A','X','X','A','X','X','A','A','A','X');
					tablero[12] = new Array('X','X','A','A','X','A','A','A','X','A','A','X','X');
					tablero[13] = new Array('X','X','X','X','X','A','A','A','X','X','X','X','X');
					tablero[14] = new Array('X','X','X','X','X','X','X','X','X','X','X','X','X');
					tablero[15] = new Array('X','X','X','X','X','X','X','X','X','X','X','X','X');
					tablero[16] = new Array('X','X','X','X','X','X','X','X','X','X','X','X','X');
					tablero[17] = new Array('X','X','X','X','X','X','X','X','X','X','X','X','X');
					
					
					for(i = 0; i < 18; i++){
						var aux;
						aux = tablero[i];
						for(j = 0; j < 13; j++){
							if(aux[j] == 'A'){
								ladrillo[h] = new Image();
								ladrillo[h].src='lad_normal.png';
								ladrillo[h].posX = 80*j;
								ladrillo[h].posY = 20*i;
								h++;
							}
						}
					}
					return ladrillo;
				}
				
				
				
                /******************************* DISPAROS *******************************/





                function playerAction() {
                    nave.doAnything();
                }

                function addListener(element, type, expression, bubbling) {
                    bubbling = bubbling || false;

                    if (window.addEventListener) { // Standard
                        element.addEventListener(type, expression, bubbling);
                    } else if (window.attachEvent) { // IE
                        element.attachEvent('on' + type, expression);
                    }
                }

                function keyDown(e) {
                    var key = (window.event ? e.keyCode : e.which);
                    for (var inkey in keyMap) {
                        if (key === keyMap[inkey]) {
                            e.preventDefault();
                            keyPressed[inkey] = true;
                        }
                    }
                }

                function keyUp(e) {
                    var key = (window.event ? e.keyCode : e.which);
                    for (var inkey in keyMap) {
                        if (key === keyMap[inkey]) {
                            e.preventDefault();
                            keyPressed[inkey] = false;
                        }
                    }
                }

                function draw() {
                    ctx.drawImage(buffer, 0, 0);
                }

                function showGameOver() {
                    bufferctx.fillStyle="rgb(255,0,0)";
                    bufferctx.font="bold 35px Arial";
                    bufferctx.fillText("GAME OVER", canvas.width / 2 - 100, canvas.height / 2);
                }

                function showCongratulations () {
                    bufferctx.fillStyle="rgb(204,50,153)";
                    bufferctx.font="bold 22px Arial";
                    bufferctx.fillText("Enhorabuena, te has pasado el juego!", canvas.width / 2 - 200, canvas.height / 2 - 30);
                    bufferctx.fillText("PUNTOS: " + nave.score, canvas.width / 2 - 200, canvas.height / 2);
                    bufferctx.fillText("VIDAS: " + nave.life + " x 5", canvas.width / 2 - 200, canvas.height / 2 + 30);
                    bufferctx.fillText("PUNTUACION TOTAL: " + getTotalScore(), canvas.width / 2 - 200, canvas.height / 2 + 60);
                }

                function getTotalScore() {
                    return nave.score + nave.life * 5;
                }
/************************************* UPDATE *************************/
                function update() {

                    drawBackground();

                    if (congratulations) {
                        showCongratulations();
                        return;
                    }

                    if (youLoose) {
                        showGameOver();
                        return;
                    }

                    bufferctx.drawImage(nave, nave.posX, nave.posY);
					bufferctx.drawImage(pelota, pelota.posX, pelota.posY, 20, 20);
					for(i = 0; i < 234; i++){
						if(ladrillo[i] != null){
							bufferctx.drawImage(ladrillo[i], ladrillo[i].posX, ladrillo[i].posY, 80, 20);
						}
					}
                    playerAction();	
					pelota.actuar();
					
					
                }



                function drawBackground() {
                    var background  = imagenFondo
                    bufferctx.drawImage(background, 0, 0);
                }


                /******************************* MEJORES PUNTUACIONES (LOCALSTORAGE) *******************************/


                function clearList(list) {
                    list.innerHTML = '';
                    addListElement(list, "Fecha");
                    addListElement(list, "Puntos");
                }

                function addListElement(list, content, className) {
                    var element = document.createElement('li');
                    if (className) {
                        element.setAttribute("class", className);
                    }
                    element.innerHTML = content;
                    list.appendChild(element);
                }


                /******************************* FIN MEJORES PUNTUACIONES *******************************/

                return {
                    init: init
                }
            })();