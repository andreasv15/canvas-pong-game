//console.log("probando");

let gameOver = document.createElement("h1");


let canvas = document.querySelector("#my-canvas");
let ctx = canvas.getContext("2d");

canvas.style.backgroundColor = "lightgray";

let ballY = 50;
let ballX = 50;
let ballRadius = 10;
let ballSpeed = 2;
let ballDirectionX = 1; // muevo a la derecha
let ballDirectionY = 1; // muevo a abajo


let paddleW = 200;
let paddleH = 20;
let paddleX = canvas.width / 2 - paddleW / 2;
let paddleY = canvas.height - 100;

let score = 0;
let seconds = 0;
let isGameOn = true;


let drawBall = () => {
    ctx.fillStyle = "black";
    //ctx.fillRect(ballX, ballY,, 50, 50);
    ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    ctx.closePath();
}

let padddleDraw = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(paddleX, paddleY, paddleW, paddleH);

}


let moveBall = () => {
    ballX = ballX + (ballSpeed * ballDirectionX);
    ballY = ballY + (ballSpeed * ballDirectionY);

}

let ballCollision = () => {
    // checkeo 
    if (ballX > canvas.width - ballRadius) {
        //console.log("colisiona");
        ballDirectionX = -1; // cambiar la direccion en el eje X
        ballSpeed++;
    } else if (ballY > canvas.height - ballRadius) {
        // esto deberia ocasionar el final del juego
        // ballDirectionY = -1;
        isGameOn = false;
    } else if (ballX < 0 + ballRadius) {
        ballDirectionX = 1;
        ballSpeed++;
    } else if (ballY < 0 + ballRadius) {
        ballDirectionY = 1;
        ballSpeed++;
    }
}


let paddleCollision = () => {
    if (ballX < paddleX + paddleW &&
        ballX + ballRadius > paddleX &&
        ballY < paddleY + paddleH &&
        ballRadius + ballY > paddleY) {
        // collision detected!
        // pelotita rebota hacia arriba
        ballDirectionY = -1;
        score++;
    }

}


let incrementSecond = () => {
    seconds++;
}

//function() {score++}

setInterval(incrementSecond, 1000);


let gameLoop = () => {
    // 1. limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. mover elementos o acciones
    moveBall();
    ballCollision();
    paddleCollision();

    // 3. dibujar elementos
    drawBall();
    padddleDraw();

    
    // 4. control y recursividad
    if (isGameOn) {
        requestAnimationFrame(gameLoop);
        ctx.font = "20px Georgia";
        ctx.fillText(`Puntos: ${score}`, 10, 30);
        ctx.fillText(`Tiempo jugado: ${seconds}`, 10, 80);
    } else {
        ctx.font = "50px Georgia";
        ctx.fillText(`GAME OVER!!!`, 20, 250);
    }
}

let paddleMove = (event) => {
    //console.log(event);
    if (event.code === "ArrowLeft" && paddleX > 0) {
        //console.log("moviendo izquierda")
        paddleX = paddleX-20;
    } else if (event.code === "ArrowRight" && paddleX < 200) {
        //console.log("moviendo derecha");
        paddleX = paddleX+20;
    }
}

window.addEventListener("keydown", paddleMove);




gameLoop();

// bonus
// 1 limpiar colision de la pelotita con los bordes
// 2 que la pelotita incremente su velocidad cuando golpee la pared
// 3 checkear que la paleta no pueda salir del canvas
// 4 que rebote por el lateral de la paleta


// super bonus
// 5 que salga un gameover cuando se pierda
// 6 cada segundo del juego sea un score que muestre fuera del canvas



