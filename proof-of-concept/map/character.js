window.app = window.app || {};
window.app.character = (function () {
  var char = {
    x: 0,
    y: 0,
    width: 20,
    height: 42,
    spriteX: 0,
    spriteY: 0,
    speed: 150,
    edgeRegion: 50,
    moving: false,
    animateTime: 2,
    animateCur: 0,
    animatePos: Array(0, 42, 84, 42, 0, 128, 170, 128),
    isReady: false,
    background: {}
  };

  char.setPosition = (x, y) => {
    char.x = x;
    char.y = y;
  };

  char.isMoveUp = (endY) => {
    return char.y > endY;
  };

  char.isMoveDown = (endY) => {
    return char.y < endY;
  };

  char.isMoveRight = (endX) => {
    return char.x < endX;
  };


  char.isMoveLeft = (endX) => {
    return char.x > endX;
  };

  char.setView = (target) => {
    if (char.isMoveLeft(target.x) && char.isMoveUp(target.y)) {
      char.spriteX = 124;
    }
    if (char.isMoveRight(target.x) && char.isMoveUp(target.y)) {
      char.spriteX = 100;
    }
    if (char.isMoveRight(target.x) && char.isMoveDown(target.y)) {
      char.spriteX = 50;
    }
    if (char.isMoveRight(target.x) && char.isMoveDown(target.y)) {
      char.spriteX = 26;
    }

    if (char.isMoveLeft(target.x)) {
      char.spriteX = 170;
    }

    if (char.isMoveUp(target.y)) {
      char.spriteX = 74;
    }

    if (char.isMoveRight(target.x)) {
      char.spriteX = 148;
    }

    if (char.isMoveDown(target.y)) {
      char.spriteX = 0;
    }

    char.spriteX = 74;
  };

  var charImg = new Image();
  charImg.src = 'http://v12.img-up.net/knightd25b8b7e.png';
  charImg.onload = () => {
    char.isReady = true;
    char.background = charImg;
  };

  return char;
}());