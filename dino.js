var container = document.getElementById('container');
var dino = document.getElementById('dino');

function keyIn(e) {
    // If 'arrow up' or 'spacebar' clicked do jump   
    if (e.keyCode === 32 || e.keyCode === 38) {
        if (isJumping == false) {
            isJumping = true;
            jump();
        }
    }
}

var height = 200;
var isJumping = false;
var gameOver = false;

function jump() {
    jumpUp = setInterval(function() {
        // Jump down
        if (height == 100) {
            clearInterval(jumpUp);
            jumpDown = setInterval(function() {
                if (height == 200) {
                    isJumping = false;
                    clearInterval(jumpDown);
                } else {
                    height += 5;
                    dino.style.top = height + 'px';
                }
            },10)
        }
        
        // Jump up
        height -= 5;
        dino.style.top = height + 'px';       
    },10)
}

function createObstacle() {
    
    let spawnTime = Math.random() * 3000;
    let rightPos = -25;
    let obstacle = document.createElement('div');
    obstacle.classList += "cactus";
    container.appendChild(obstacle);
    // Function that moves obstacles right to left
    moveLeft = setInterval(function() {
        if (rightPos < 990  && rightPos > 915 && height > 150) {
            gameOver = true;
            clearInterval(moveLeft);
        }
        
        if (rightPos > 1000) {
            container.removeChild(obstacle);
        } else {
            rightPos += 10;
            obstacle.style.right = rightPos + 'px';
        }
    },20)
    if (!gameOver) {
        setTimeout(createObstacle,spawnTime);
    } else {
        alert("GAME OVER!!!");
    }
}

document.addEventListener('keydown', keyIn);

createObstacle();