var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();

  var box = new Box(0, 100);

  scene.update (function () {
    box.x = box.x > scene.width ? 0 : box.x + 10;
  });

  scene.draw (function (ctx) {
    box.draw(ctx);
  });

};
