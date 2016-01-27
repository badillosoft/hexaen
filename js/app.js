var scene = null;

window.onload = function () {
  scene = new Scene('canvas');

  scene.fullScreen();

  var box = new Box(0, 100);

  scene.draw (function (ctx) {
    box.x += 10;
    box.draw(ctx);

    if (box.x > scene.width) {
      box.x = 0;
    }
  });

};
