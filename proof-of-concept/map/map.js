window.app = window.app || {};
window.app.map = (function () {

  var map = {
    x: 0,
    y: 0,
    isReady: false,
    background: {}
  };

  var backgroundImg = new Image();
  backgroundImg.src = './star-wars-galaxy.jpg';
  backgroundImg.onload = function () {
    map.isReady = true;

    canvasEl.width = backgroundImg.width;
    canvasEl.height = backgroundImg.height;
    map.background = backgroundImg;
  };

  return map;

}());