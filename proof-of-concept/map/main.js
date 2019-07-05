console.log(window.app.character);
(function (char, map) {

    console.log("hi");
    var starkillerBase = {
        x: 68,
        y: 456
    };
    var mortis = {
        x: 477,
        y: 72
    };
    var destination = starkillerBase;

    char.setPosition(mortis.x, mortis.y);

    (function () {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
    })();

    canvasEl = document.createElement('canvas');
    canvas = canvasEl.getContext('2d');

    document.getElementsByClassName('wrapper').item(0).appendChild(canvasEl);

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

    // Render Function

    var render = (canvas, char, map) => {
        canvas.clearRect(0, 0, canvasEl.width, canvasEl.height);

        if (map.isReady) {
            canvas.drawImage(map.background, map.x, map.y);
        }

        if (char.isReady) {
            canvas.drawImage(char.background, char.spriteX, char.spriteY, char.width, char.height, char.x, char.y, char.width, char.height);
        }
    };
    var move = (char, destination) => {
        var step = 5;
        if (char.isMoveRight(destination.x)) {
            char.x += step;
        }

        if (char.isMoveLeft(destination.x)) {
            char.x -= step;
        }

        if (char.isMoveUp(destination.y)) {
            char.y -= step;
        }

        if (char.isMoveDown(destination.y)) {
            char.y += step;
        }
    }

    setInterval(function () {
        move(char, destination);
    }, 100);

    var mainInterval = function () {
        char.setView(destination);
        render(canvas, char, map);
        requestAnimationFrame(mainInterval);
    };

    render(canvas, char, map);
    then = Date.now();
    mainInterval();
}(window.app.character, window.app.map));