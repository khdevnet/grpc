console.log("hi");
var starkillerBase = {
    x: 68,
    y: 456
};
var mortis = {
    x: 477,
    y: 72
};
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

canvasEl = document.createElement('canvas');
canvas = canvasEl.getContext('2d');

console.log(document);
var arr = document.getElementsByClassName('wrapper');
console.log(arr);
console.log(arr[0]);
document.getElementsByClassName('wrapper').item(0).appendChild(canvasEl);

// Background
var background = { x: 0, y: 0, width: 1024, height: 768 };
var backgroundReady = false;
var backgroundImg = new Image();
backgroundImg.onload = function () {
    backgroundReady = true;
    canvasEl.width = backgroundImg.width;
    canvasEl.height = backgroundImg.height;
};
backgroundImg.src = './star-wars-galaxy.jpg';


canvasEl.addEventListener("click", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    alert(mousePos.x + ',' + mousePos.y);
}, false);

//Get Mouse Position
function getMousePos(canvas, evt) {
    var rect = canvasEl.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Char
var char = {
    x: starkillerBase.x, y: starkillerBase.y, width: 20, height: 42, spriteX: 0, spriteY: 0, speed: 150, edgeRegion: 50, moving: false, animateTime: 2, animateCur: 0,
    animatePos: Array(0, 42, 84, 42, 0, 128, 170, 128)
};
var charReady = false;
var charImg = new Image();
charImg.onload = function () {
    charReady = true;
};
charImg.src = 'http://v12.img-up.net/knightd25b8b7e.png';

// Keyboard controls
var keysDown = {};
addEventListener('keydown', function (e) {
    char.moving = true;
    keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function (e) {
    char.moving = false;
    delete keysDown[e.keyCode];
}, false);

// Update
var update = function (modifier) {
    char.spriteX = 74;
    if (Math.round(char.x) > 0 && Math.round(char.x) < mortis.x) {
        char.x += char.speed * modifier;
    }
    if (Math.round(char.y) > 0 && Math.round(char.y) > mortis.y) {
        char.y -= char.speed * modifier;
    }
    // if (37 in keysDown) {
    //     char.spriteX = 170;
    //     if (Math.round(char.x) > char.edgeRegion) {
    //         char.x -= char.speed * modifier;
    //     } else {
    //         if (Math.round(background.x) < 0) {
    //             background.x += char.speed * modifier;
    //         } else if (Math.round(char.x) > 0) {
    //             char.x -= char.speed * modifier;
    //         }
    //     }
    // }
    // if (38 in keysDown) {
    //     char.spriteX = 74;
    //     if (Math.round(char.y) > char.edgeRegion) {
    //         char.y -= char.speed * modifier;
    //     } else {
    //         if (Math.round(background.y) < 0) {
    //             background.y += char.speed * modifier;
    //         } else if (Math.round(char.y) > 0) {
    //             char.y -= char.speed * modifier;
    //         }
    //     }
    // }
    // if (39 in keysDown) {
    //     char.spriteX = 148;
    //     if ((Math.round(char.x) + char.width) < (canvasEl.width - char.edgeRegion)) {
    //         char.x += char.speed * modifier;
    //     } else {
    //         if (Math.round(background.x) > (canvasEl.width - background.width)) {
    //             background.x -= char.speed * modifier;
    //         } else if ((Math.round(char.x) + char.width) < canvasEl.width) {
    //             char.x += char.speed * modifier;
    //         }
    //     }
    // }
    // if (40 in keysDown) {
    //     char.spriteX = 0;
    //     if ((Math.round(char.y) + char.height) < (canvasEl.height - char.edgeRegion)) {
    //         char.y += char.speed * modifier;
    //     } else {
    //         if (Math.round(background.y) > (canvasEl.height - background.height)) {
    //             background.y -= char.speed * modifier;
    //         } else if ((Math.round(char.y) + char.height) < canvasEl.height) {
    //             char.y += char.speed * modifier;
    //         }
    //     }
    // }

    // if (37 in keysDown && 38 in keysDown) {
    //     char.spriteX = 124;
    // }
    // if (38 in keysDown && 39 in keysDown) {
    //     char.spriteX = 100;
    // }
    // if (39 in keysDown && 40 in keysDown) {
    //     char.spriteX = 50;
    // }
    // if (40 in keysDown && 37 in keysDown) {
    //     char.spriteX = 26;
    // }
};

// Render Function
var render = function () {
    canvas.clearRect(0, 0, canvasEl.width, canvasEl.height);

    if (char.moving) {
        if (char.animateTime > 0) {
            char.animateTime--;
        } else {
            if (char.animateCur + 1 < char.animatePos.length) {
                char.animateCur++;
                char.spriteY = char.animatePos[char.animateCur];
            } else {
                char.animateCur = 0;
                char.spriteY = char.animatePos[0];
            }
            char.animateTime = 2;
        }
    }

    if (backgroundReady) {
        canvas.drawImage(backgroundImg, background.x, background.y);
    }

    if (charReady) {
        canvas.drawImage(charImg, char.spriteX, char.spriteY, char.width, char.height, char.x, char.y, char.width, char.height);
    }
};

var mainInterval = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;
    requestAnimationFrame(mainInterval);
};


render();
then = Date.now();
mainInterval();